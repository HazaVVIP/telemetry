# Media assets — App Telemetry Pentest Portfolio

Curated free-to-use visuals for **professional penetration testing** portfolio.
Site aesthetic: **pure black, monochrome white** — avoid neon green "hacker" cliché.

## Downloaded locally (`public/assets/media/`)

### Images (Unsplash License — free commercial use)

| File | Use case | Source |
|------|----------|--------|
| `images/network-abstract.jpg` | Hero / Web App pentest | [Unsplash f2krpIYBrJc](https://unsplash.com/photos/f2krpIYBrJc) |
| `images/server-rack.jpg` | Network / infra engagement | [Unsplash 2JJ3wBHu4_0](https://unsplash.com/photos/2JJ3wBHu4_0) |
| `images/datacenter-dark.jpg` | Cloud / data center scope | [Unsplash OnI_TNcIv9U](https://unsplash.com/photos/OnI_TNcIv9U) |

### Videos (Mixkit License — free commercial use)

| File | Use case | Source |
|------|----------|--------|
| `videos/programming-hands.mp4` | Code review / app pentest | [Mixkit 46634](https://mixkit.co/free-stock-video/close-up-of-a-hands-programming-and-making-code-46634/) |
| `videos/soc-monitoring.mp4` | SOC / monitoring narrative | [Mixkit 23673](https://mixkit.co/free-stock-video/a-woman-monitoring-close-circuit-surveillance-23673/) |
| `videos/surveillance-team.mp4` | Red team / ops center | [Mixkit 23016](https://mixkit.co/free-stock-video/surveillance-team-looking-at-monitors-23016/) |

## Recommended search (not yet downloaded)

### Video — Pexels (free, no attribution required)

Best fit for **white-on-black** WebGL site:

1. [Futuristic geometric mesh white nodes](https://www.pexels.com/video/futuristic-geometric-mesh-with-white-nodes-31723758/) — abstract attack surface
2. [Abstract golden neural network on dark](https://www.pexels.com/video/abstract-golden-neural-network-animation-35003022/) — desaturate to B&W in CSS
3. [Cyber security search](https://www.pexels.com/search/videos/cyber%20security/) — filter: dark, abstract, avoid hoodies

### Video — Coverr / Pixabay

- [Coverr technology](https://coverr.co/stock-video-footings/technology)
- [Pixabay cybersecurity](https://pixabay.com/videos/search/cybersecurity/)

### Images — Unsplash collections

- [Server room](https://unsplash.com/s/photos/server-room) — pick dark, minimal color
- [Cyber security abstract](https://unsplash.com/s/photos/cyber-security)
- [Network dark](https://unsplash.com/s/photos/network-dark)

## Mapping → pentest services (replace placeholder projects)

| Slot | Service | Suggested visual |
|------|---------|------------------|
| 01 | Web Application Pentest | `programming-hands.mp4` or `network-abstract.jpg` |
| 02 | Network & Infrastructure | `server-rack.jpg` or mesh video (Pexels) |
| 03 | Red Team / Adversary Simulation | `surveillance-team.mp4` |
| 04 | Cloud & API Security | `datacenter-dark.jpg` or `soc-monitoring.mp4` |

## Visual rules (Active Theory standard, pentest context)

**Use:**
- Abstract networks, nodes, mesh, dark datacenter
- Hands on keyboard / terminal (no balaclava)
- Monochrome or desaturated (`filter: grayscale(1) contrast(1.1)`)

**Avoid:**
- Green matrix rain, skull icons, guy-in-hoodie stock photos
- Bright purple/neon (clashes with `#000` site)
- "Hacker" stock that looks like crime, not professional consulting

## Reference portfolios (tone, not copy)

- [sterven.io](https://www.sterven.io/) — red team, case-study focused
- [ashcyber.tech](https://ashcyber.tech/) — professional offensive security copy
- [infiltris.com](https://infiltris.com/) — enterprise pentest positioning

## License notes

| Source | License | Attribution |
|--------|---------|-------------|
| Unsplash | [Unsplash License](https://unsplash.com/license) | Not required |
| Mixkit | [Mixkit License](https://mixkit.co/license/) | Not required |
| Pexels | [Pexels License](https://www.pexels.com/license/) | Not required |
| Vecteezy / Pikwizard | Varies | Check per file |

## Next step in codebase

Wire `video` / `poster` fields in `src/js/projects.js` and case-study overlay player.
