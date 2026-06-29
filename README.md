# App Telemetry

Immersive creative portfolio built with WebGL, GSAP, and Lenis — design language inspired by [Active Theory](https://activetheory.net/) as a quality benchmark, with its own identity.

**Live:** [app-telemetry.net](https://app-telemetry.net/)

## Features

- Pure black canvas with atmospheric Three.js particle field
- Cinematic pinned hero scroll (ScrollTrigger)
- Work list with animated canvas preview on hover
- Fullscreen case study overlay with deep links (`#project/slug`)
- Lenis smooth scroll + GSAP motion
- Optional ambient sound (Web Audio, opt-in)
- Mobile-optimized (reduced particles, no custom cursor)

## Quick start

```bash
git clone https://github.com/HazaVVIP/telemetry.git
cd telemetry
npm install
npm run dev          # http://localhost:5173
```

## Deploy

Copy deploy credentials (never commit `.env.deploy`):

```bash
cp .env.deploy.example .env.deploy
# edit SSH_USER, SSH_HOST, SSH_PASS
npm run deploy
```

## Project structure

```
src/
├── index.html
├── css/main.css
└── js/
    ├── main.js
    ├── loading.js
    ├── experience.js      # Three.js WebGL
    ├── case-study.js      # fullscreen project view
    ├── preview-canvas.js  # hover / case study visuals
    ├── projects.js        # project data
    ├── scroll.js          # Lenis + ScrollTrigger
    ├── cursor.js
    ├── audio.js
    └── utils.js
deploy.sh
vite.config.js
```

## Stack

| Layer | Tech |
|-------|------|
| Build | Vite 5 |
| 3D | Three.js |
| Motion | GSAP + ScrollTrigger |
| Scroll | Lenis |
| Font | Space Grotesk |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build + rsync to VPS |

## License

Private / All rights reserved — App Telemetry © 2026
