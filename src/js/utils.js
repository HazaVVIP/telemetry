export function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
}

export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
