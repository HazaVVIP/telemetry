import { PreviewCanvas } from './preview-canvas.js';
import { getProject } from './projects.js';
import { isMobile } from './utils.js';

export function initProjectPreview(onProjectClick) {
    const preview = document.getElementById('project-preview');
    const media = document.getElementById('preview-media');
    const indexEl = document.getElementById('preview-index');
    const typeEl = document.getElementById('preview-type');
    if (!preview || !media) return;

    let canvas = null;
    let active = false;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;

    const move = () => {
        x += (tx - x) * 0.12;
        y += (ty - y) * 0.12;
        preview.style.left = `${x}px`;
        preview.style.top = `${y}px`;
        if (active) requestAnimationFrame(move);
    };

    document.querySelectorAll('.work-item').forEach((item) => {
        const slug = item.dataset.slug;
        const project = slug ? getProject(slug) : null;

        item.addEventListener('mouseenter', () => {
            if (isMobile() || !project) return;

            indexEl.textContent = project.index;
            typeEl.textContent = project.type;

            media.innerHTML = '<canvas class="preview-canvas"></canvas>';
            const canvasEl = media.querySelector('canvas');
            canvas = new PreviewCanvas(canvasEl, project.visual);
            canvas.start();

            preview.classList.add('is-visible');
            active = true;
            requestAnimationFrame(move);
        });

        item.addEventListener('mousemove', (e) => {
            if (isMobile()) return;
            const rect = preview.getBoundingClientRect();
            tx = e.clientX + 24;
            ty = e.clientY - rect.height * 0.35;
            const maxX = window.innerWidth - rect.width - 16;
            const maxY = window.innerHeight - rect.height - 16;
            tx = Math.min(Math.max(16, tx), maxX);
            ty = Math.min(Math.max(16, ty), maxY);
        });

        item.addEventListener('mouseleave', () => {
            preview.classList.remove('is-visible');
            active = false;
            canvas?.stop();
            canvas = null;
        });

        item.addEventListener('click', () => {
            if (slug) onProjectClick?.(slug);
        });

        item.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && slug) {
                e.preventDefault();
                onProjectClick?.(slug);
            }
        });
    });
}

export function initScrollProgress(lenis) {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const update = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? window.scrollY / h : 0;
        bar.style.width = `${p * 100}%`;
    };

    if (lenis) lenis.on('scroll', update);
    window.addEventListener('scroll', update, { passive: true });
    update();
}
