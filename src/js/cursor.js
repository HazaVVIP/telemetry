import { isMobile } from './utils.js';

export class Cursor {
    constructor() {
        if (isMobile()) return;

        document.body.classList.add('is-loaded');
        this.cursor = document.querySelector('.cursor');
        this.cursorDot = document.querySelector('.cursor-dot');
        this.pos = { x: 0, y: 0 };
        this.targetPos = { x: 0, y: 0 };
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.targetPos.x = e.clientX;
            this.targetPos.y = e.clientY;
        });

        document.querySelectorAll('[data-hover]').forEach((el) => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                if (el.classList.contains('work-item')) this.cursor.classList.add('view');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover', 'view');
            });
        });

        this.animate();
    }

    animate() {
        this.pos.x += (this.targetPos.x - this.pos.x) * 0.18;
        this.pos.y += (this.targetPos.y - this.pos.y) * 0.18;

        this.cursor.style.left = `${this.pos.x - 6}px`;
        this.cursor.style.top = `${this.pos.y - 6}px`;
        this.cursorDot.style.left = `${this.targetPos.x - 1.5}px`;
        this.cursorDot.style.top = `${this.targetPos.y - 1.5}px`;

        requestAnimationFrame(() => this.animate());
    }
}
