import { Cursor } from './cursor.js';
import { MainExperience } from './experience.js';
import { initScrollProgress } from './ui.js';
import { initLayout } from './layout.js';
import { initAudio } from './audio.js';
import { initThemeMedia } from './media.js';
import { prefersReducedMotion } from './utils.js';

export function initCore({ audio = false } = {}) {
    initLayout();
    initThemeMedia();
    initScrollProgress(null);

    if (audio) {
        initAudio();
    }

    if (!prefersReducedMotion()) {
        new Cursor();
    } else {
        document.body.classList.add('is-loaded');
    }
}

export function markReady() {
    document.body.classList.add('is-ready', 'is-loaded');
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
}
