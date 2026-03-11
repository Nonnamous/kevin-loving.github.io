function resolveSiteBasePath() {
    const sidebarMount = document.getElementById('site-sidebar');
    return sidebarMount?.dataset.basePath || '.';
}

function resolveAssetUrl(path) {
    if (/^(https?:\/\/|mailto:|#)/.test(path)) {
        return path;
    }

    const basePath = resolveSiteBasePath().replace(/\/$/, '');
    return `${basePath}/${path}`.replace(/\/\.\//g, '/');
}

function getButtonLogoMeta(item) {
    const key = `${item.label} ${item.url}`.toLowerCase();

    if (key.includes('mailto:') || key.includes('@')) {
        return {
            badge: 'MAIL',
            wordmark: 'E-MAIL',
            sublabel: 'direct line'
        };
    }

    if (key.includes('resume')) {
        return {
            badge: 'CV',
            wordmark: 'DOSSIER',
            sublabel: 'scan file'
        };
    }

    if (key.includes('github')) {
        return {
            badge: 'GH',
            wordmark: 'CODEBASE',
            sublabel: 'repo arcade'
        };
    }

    if (key.includes('linkedin')) {
        return {
            badge: 'IN',
            wordmark: 'NETWORK',
            sublabel: 'career modem'
        };
    }

    if (key.includes('bluesky') || key.includes('bsky')) {
        return {
            badge: 'SKY',
            wordmark: 'BLUE SKY',
            sublabel: 'signal feed'
        };
    }

    if (key.includes('project')) {
        return {
            badge: 'PRJ',
            wordmark: 'PROJECTS',
            sublabel: 'build log'
        };
    }

    if (key.includes('writing')) {
        return {
            badge: 'TXT',
            wordmark: 'WRITINGS',
            sublabel: 'text archive'
        };
    }

    return {
        badge: item.label.slice(0, 3).toUpperCase(),
        wordmark: item.label.toUpperCase(),
        sublabel: 'launch'
    };
}

function createSidebarButton(item) {
    const anchor = document.createElement('a');
    anchor.className = 'button sidebar-button';
    anchor.href = resolveAssetUrl(item.url);

    const logo = getButtonLogoMeta(item);
    anchor.innerHTML = `
        <span class="sidebar-button-logo" aria-hidden="true">
            <span class="sidebar-button-badge">${logo.badge}</span>
            <span class="sidebar-button-branding">
                <span class="sidebar-button-wordmark">${logo.wordmark}</span>
                <span class="sidebar-button-sublabel">${logo.sublabel}</span>
            </span>
        </span>
        <span class="sidebar-button-accessible">${item.label}</span>
    `;
    anchor.setAttribute('aria-label', item.label);

    if (/^https?:\/\//.test(item.url)) {
        anchor.target = '_blank';
        anchor.rel = 'noreferrer';
    }

    return anchor;
}

function createSidebarSection(title, content) {
    const section = document.createElement('section');
    section.className = 'sidebar-panel';

    const heading = document.createElement('h2');
    heading.className = 'sidebar-title';
    heading.textContent = title;
    section.appendChild(heading);

    section.appendChild(content);
    return section;
}

function createButtonGroup(items) {
    const group = document.createElement('div');
    group.className = 'sidebar-button-list';
    items.forEach((item) => group.appendChild(createSidebarButton(item)));
    return group;
}

function renderSidebar(data) {
    const mount = document.getElementById('site-sidebar');
    if (!mount) {
        return;
    }

    mount.className = 'sidebar-menu';

    const intro = document.createElement('section');
    intro.className = 'sidebar-panel sidebar-profile';
    intro.innerHTML = `
        <p class="sidebar-kicker">CONTACT + LINKS</p>
        <h2 class="sidebar-name">${data.profile.name}</h2>
        <p>${data.profile.title}</p>
        <p>${data.profile.location}</p>
    `;
    mount.appendChild(intro);

    const contactBody = document.createElement('div');
    const contactMessage = document.createElement('p');
    contactMessage.textContent = data.contact.message;
    contactBody.appendChild(contactMessage);
    contactBody.appendChild(createButtonGroup([
        { label: data.contact.email, url: `mailto:${data.contact.email}` }
    ]));
    mount.appendChild(createSidebarSection(data.contact.title, contactBody));

    mount.appendChild(createSidebarSection(data.links.title, createButtonGroup(data.links.items)));
    mount.appendChild(createSidebarSection(data.pages.title, createButtonGroup(data.pages.items)));
}

async function loadSidebarData() {
    const basePath = resolveSiteBasePath().replace(/\/$/, '');
    const response = await fetch(`${basePath}/about.json`);
    if (!response.ok) {
        throw new Error('Failed to load about.json');
    }

    return response.json();
}

loadSidebarData()
    .then((data) => {
        renderSidebar(data);
    })
    .catch((error) => {
        console.error('Failed to load sidebar data', error);
    });
