# Kevin Loving's Personal Website

A retro, early 2000s-inspired personal website built with pure HTML and CSS. Features nostalgic design elements and over-the-top dramatic content.

## Features

- 🎨 Retro early 2000s aesthetic with bright neon colors
- 🔄 Rotating headshot in the top right corner (90° rotation every 3 seconds)
- ✨ Animated starfield background
- 📜 Classic marquee scrolling text
- 💫 Multiple CSS animations for that "Flash-like" feel
- 🎭 Over-dramatic, tongue-in-cheek content
- 📱 Responsive design for modern devices

## Adding Your Headshot

To add your personal headshot:

1. Add an image file named `headshot.jpg` (or `headshot.png`) to the repository root
2. Update the `.headshot` div in `index.html`:

Replace:
```html
<div class="headshot">
    [YOUR HEADSHOT HERE]
    <br>
    Upload headshot.jpg to repo
</div>
```

With:
```html
<div class="headshot">
    <img src="headshot.jpg" alt="Kevin Loving" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
</div>
```

## Customization

Edit `index.html` to customize:
- Contact links (email, LinkedIn, GitHub)
- Accomplishments and experience
- Personal information
- Any other content

## Viewing the Site

Once pushed to GitHub, your site will be live at:
`https://[your-username].github.io/`

Or open `index.html` locally in any web browser.

## Design Inspiration

This website pays homage to the wild west days of the early internet:
- Geocities aesthetics
- Marquee tags and scrolling text
- Excessive use of Comic Sans MS
- Neon color schemes
- "Under Construction" vibes
- Fake hit counters

Built with pure HTML/CSS—no frameworks, no Flash (but we pretend there is).