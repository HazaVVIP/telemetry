import '../css/main.css';
import { initCore } from './core.js';
import { initSmoothScroll, initScrollAnimations } from './scroll.js';
import { initProjectPreview, initScrollProgress } from './ui.js';
import { initCaseStudy } from './case-study.js';
import { MainExperience } from './experience.js';
import { prefersReducedMotion } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-ready', 'is-loaded');
    initCore({ audio: true });

    const experience = !prefersReducedMotion() ? new MainExperience() : null;

    const updateScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
        experience?.setScrollProgress(progress);
    };

    const lenis = initSmoothScroll(updateScroll);
    initScrollAnimations(experience, { subpage: true });
    const caseStudy = initCaseStudy(lenis);
    initProjectPreview((slug) => caseStudy?.open(slug));
    initScrollProgress(lenis);

    const hash = window.location.hash;
    if (hash.startsWith('#project/')) {
        const slug = hash.replace('#project/', '');
        requestAnimationFrame(() => caseStudy?.open(slug));
    }
});
