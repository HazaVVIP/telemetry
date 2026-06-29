import gsap from 'gsap';
import { Cursor } from './cursor.js';
import { MainExperience } from './experience.js';
import { initScrollAnimations, initSmoothScroll } from './scroll.js';
import { initScrollProgress } from './ui.js';
import { initLayout } from './layout.js';
import { initAudio } from './audio.js';
import { initThemeMedia } from './media.js';

export class LoadingExperience {
    constructor() {
        this.progress = 0;
        this.experience = null;
        this.caseStudy = null;
        this.run();
    }

    run() {
        initThemeMedia();
        const progressEl = document.getElementById('progress');
        const loaderEl = document.getElementById('loader');
        Promise.all([document.fonts.ready]).finally(() => this.tick(progressEl, loaderEl));
    }

    tick(progressEl, loaderEl) {
        const interval = setInterval(() => {
            this.progress += Math.random() * 6 + 3;
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
                progressEl.textContent = '100';
                setTimeout(() => this.hideLoader(loaderEl), 350);
            }
            progressEl.textContent = Math.floor(this.progress);
        }, 50);
    }

    hideLoader(loaderEl) {
        initLayout();
        gsap.to(loaderEl, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                loaderEl.style.display = 'none';
                this.initExperience();
            },
        });
    }

    initExperience() {
        gsap.to('.word', {
            y: 0,
            duration: 1.6,
            stagger: 0.12,
            ease: 'power4.out',
        });

        gsap.to('.hero-eyebrow', {
            opacity: 1,
            duration: 1,
            delay: 0.35,
            ease: 'power2.out',
        });

        gsap.to('.hero-lede', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.65,
            ease: 'power3.out',
        });

        gsap.to('.hero-actions', {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.9,
            ease: 'power3.out',
        });

        this.experience = new MainExperience();

        const updateScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
            this.experience?.setScrollProgress(progress);
        };

        const lenis = initSmoothScroll(updateScroll);
        initScrollAnimations(this.experience);
        initScrollProgress(lenis);
        initAudio();
        new Cursor();
    }
}
