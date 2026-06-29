import '../css/main.css';
import { initCore, markReady } from './core.js';
import { initSmoothScroll, initScrollAnimations } from './scroll.js';
import { initScrollProgress } from './ui.js';
import { MainExperience } from './experience.js';
import { prefersReducedMotion } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    markReady();
    initCore();

    const experience = !prefersReducedMotion() ? new MainExperience() : null;

    const updateScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
        experience?.setScrollProgress(progress);
    };

    const lenis = initSmoothScroll(updateScroll);
    initScrollAnimations(experience, { subpage: true });
    initScrollProgress(lenis);
});
