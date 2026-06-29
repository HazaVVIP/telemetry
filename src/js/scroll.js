import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobile, prefersReducedMotion } from './utils.js';

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll(onScroll) {
    if (prefersReducedMotion()) {
        window.addEventListener('scroll', onScroll, { passive: true });
        return null;
    }

    const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
    });

    document.documentElement.classList.add('lenis');
    lenis.on('scroll', onScroll);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (!id || id === '#' || id.startsWith('#project/')) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            lenis.scrollTo(target, { offset: isMobile() ? -72 : -96, duration: 1.6 });
        });
    });

    return lenis;
}

export function initScrollAnimations(experience, { subpage = false } = {}) {
    if (prefersReducedMotion()) return;

    const hasSiteHeader = document.querySelector('.site-header');

    if (!hasSiteHeader) {
        gsap.to('.nav', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.3,
            ease: 'power3.out',
        });
    }

    gsap.to('.scroll-hint', {
        opacity: 1,
        duration: 1,
        delay: 1.4,
        ease: 'power2.out',
    });

    const heroEl = document.querySelector('.hero-rich') || document.querySelector('.hero');
    if (heroEl && !isMobile() && !subpage) {
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: heroEl,
                start: 'top top',
                end: '+=90%',
                pin: true,
                scrub: 0.8,
            },
        });

        heroTl.to('.hero-inner, .hero-rich__content', {
            y: -80,
            opacity: 0.15,
            scale: 0.94,
            ease: 'none',
        }, 0);

        heroTl.to('.scroll-hint', {
            opacity: 0,
            y: 20,
            ease: 'none',
        }, 0);
    }

    if (subpage) {
        gsap.from('.page-hero', {
            y: 40,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
        });
    }

    document.querySelectorAll('[data-panel]').forEach((panel) => {
        ScrollTrigger.create({
            trigger: panel,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => experience?.setPanelProgress(getPanelIndex(panel)),
            onEnterBack: () => experience?.setPanelProgress(getPanelIndex(panel)),
        });
    });

    gsap.utils.toArray('.work-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 88%',
            },
            x: isMobile() ? 0 : -24,
            y: isMobile() ? 32 : 0,
            opacity: 0,
            duration: 1,
            delay: i * 0.06,
            ease: 'power3.out',
        });
    });

    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            },
            y: 36,
            opacity: 0,
            duration: 0.9,
            delay: (i % 2) * 0.08,
            ease: 'power3.out',
        });
    });

    gsap.utils.toArray('.metric').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 92%',
            },
            y: 24,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.06,
            ease: 'power3.out',
        });
    });

    gsap.from('.studio-manifesto', {
        scrollTrigger: {
            trigger: '.studio',
            start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
    });

    gsap.from('.studio-stats li', {
        scrollTrigger: {
            trigger: '.studio-stats',
            start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
    });

    gsap.from('.showcase-split__content', {
        scrollTrigger: {
            trigger: '.showcase-split',
            start: 'top 75%',
        },
        x: isMobile() ? 0 : 40,
        y: isMobile() ? 40 : 0,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
    });

    gsap.from('.principle-block__inner', {
        scrollTrigger: {
            trigger: '.principle-block',
            start: 'top 80%',
        },
        y: 48,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
    });

    gsap.from('.contact-link', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 78%',
        },
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
    });
}

function getPanelIndex(panel) {
    const id = panel.dataset.panel || panel.id || 'home';
    const panels = ['home', 'metrics', 'approach', 'services', 'principle', 'trust', 'cta'];
    const idx = panels.indexOf(id);
    return idx >= 0 ? idx * 0.2 : 0;
}
