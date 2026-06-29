import gsap from 'gsap';
import { getProject } from './projects.js';
import { PreviewCanvas } from './preview-canvas.js';

export class CaseStudy {
    constructor(lenis) {
        this.lenis = lenis;
        this.root = document.getElementById('case-study');
        this.curtain = this.root?.querySelector('.case-study-curtain');
        this.closeBtn = this.root?.querySelector('.case-study-close');
        this.canvasEl = this.root?.querySelector('canvas');
        this.preview = null;
        this.isOpen = false;

        if (!this.root) return;

        this.closeBtn?.addEventListener('click', () => this.close());
        this.curtain?.addEventListener('click', () => this.close());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });

        window.addEventListener('popstate', () => {
            const slug = location.hash.replace('#project/', '');
            if (slug && getProject(slug)) this.open(slug, false);
            else if (this.isOpen) this.close(false);
        });

        const initial = location.hash.replace('#project/', '');
        if (initial && getProject(initial)) {
            setTimeout(() => this.open(initial, false), 1200);
        }
    }

    open(slug, pushState = true) {
        const project = getProject(slug);
        if (!project || this.isOpen) return;

        this.isOpen = true;
        this.root.setAttribute('aria-hidden', 'false');
        document.body.classList.add('case-open');
        this.lenis?.stop();

        this.root.querySelector('.case-study-index').textContent = project.index;
        this.root.querySelector('.case-study-title').textContent = project.title;
        this.root.querySelector('.case-study-type').textContent = `${project.type} · ${project.year}`;
        this.root.querySelector('.case-study-client').textContent = project.client;
        this.root.querySelector('.case-study-desc').textContent = project.description;

        const tags = this.root.querySelector('.case-study-tags');
        tags.innerHTML = project.services.map((s) => `<li>${s}</li>`).join('');

        if (this.preview) this.preview.stop();
        this.preview = new PreviewCanvas(this.canvasEl, project.visual);
        this.preview.start();

        if (pushState) {
            history.pushState({ case: slug }, '', `#project/${slug}`);
        }

        gsap.fromTo(
            this.curtain,
            { scaleY: 0, transformOrigin: 'bottom' },
            { scaleY: 1, duration: 0.9, ease: 'power4.inOut' },
        );

        gsap.fromTo(
            this.root.querySelector('.case-study-inner'),
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.35, ease: 'power3.out' },
        );
    }

    close(pushState = true) {
        if (!this.isOpen) return;

        gsap.to(this.root.querySelector('.case-study-inner'), {
            y: -30,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
        });

        gsap.to(this.curtain, {
            scaleY: 0,
            transformOrigin: 'top',
            duration: 0.8,
            delay: 0.1,
            ease: 'power4.inOut',
            onComplete: () => {
                this.isOpen = false;
                this.root.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('case-open');
                this.lenis?.start();
                this.preview?.stop();
            },
        });

        if (pushState && location.hash.startsWith('#project/')) {
            history.pushState({}, '', location.pathname + location.search);
        }
    }
}

export function initCaseStudy(lenis) {
    return new CaseStudy(lenis);
}
