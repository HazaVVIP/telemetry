export class PreviewCanvas {
    constructor(canvas, mode = 'field') {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mode = mode;
        this.time = 0;
        this.running = false;
        this.dpr = Math.min(window.devicePixelRatio, 2);
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    setMode(mode) {
        this.mode = mode;
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.w = rect.width;
        this.h = rect.height;
        this.canvas.width = this.w * this.dpr;
        this.canvas.height = this.h * this.dpr;
        this.canvas.style.width = `${this.w}px`;
        this.canvas.style.height = `${this.h}px`;
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.tick();
    }

    stop() {
        this.running = false;
    }

    tick = () => {
        if (!this.running) return;
        this.time += 0.016;
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.w, this.h);

        if (this.mode === 'field') this.drawField();
        else if (this.mode === 'grid') this.drawGrid();
        else if (this.mode === 'wave') this.drawWave();
        else if (this.mode === 'orbit') this.drawOrbit();

        requestAnimationFrame(this.tick);
    };

    drawField() {
        for (let i = 0; i < 48; i++) {
            const t = this.time + i * 0.3;
            const x = (Math.sin(t * 0.7) * 0.35 + 0.5) * this.w;
            const y = (Math.cos(t * 0.5 + i) * 0.35 + 0.5) * this.h;
            const r = 20 + Math.sin(t * 2) * 12;
            const g = this.ctx.createRadialGradient(x, y, 0, x, y, r);
            g.addColorStop(0, 'rgba(255,255,255,0.35)');
            g.addColorStop(1, 'transparent');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(x - r, y - r, r * 2, r * 2);
        }
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        const step = 28;
        for (let x = 0; x < this.w; x += step) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x + Math.sin(this.time + x * 0.02) * 8, this.h);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.h; y += step) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.w, y + Math.cos(this.time + y * 0.02) * 8);
            this.ctx.stroke();
        }
        this.ctx.fillStyle = 'rgba(255,255,255,0.6)';
        for (let i = 0; i < 6; i++) {
            const px = (Math.sin(this.time * 0.8 + i) * 0.4 + 0.5) * this.w;
            const py = (Math.cos(this.time * 0.6 + i * 1.2) * 0.4 + 0.5) * this.h;
            this.ctx.beginPath();
            this.ctx.arc(px, py, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawWave() {
        for (let layer = 0; layer < 5; layer++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(255,255,255,${0.08 + layer * 0.04})`;
            for (let x = 0; x <= this.w; x += 4) {
                const y = this.h * 0.5
                    + Math.sin(x * 0.015 + this.time * (1 + layer * 0.2) + layer) * (18 + layer * 8)
                    + layer * 14;
                if (x === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            }
            this.ctx.stroke();
        }
    }

    drawOrbit() {
        const cx = this.w * 0.5;
        const cy = this.h * 0.5;
        for (let i = 0; i < 8; i++) {
            const angle = this.time * 0.4 + (i / 8) * Math.PI * 2;
            const radius = 40 + i * 14;
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(255,255,255,${0.06 + i * 0.02})`;
            this.ctx.ellipse(cx, cy, radius, radius * 0.45, angle * 0.2, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        this.ctx.fillStyle = 'rgba(255,255,255,0.8)';
        this.ctx.beginPath();
        this.ctx.arc(
            cx + Math.cos(this.time) * 60,
            cy + Math.sin(this.time * 1.3) * 30,
            4,
            0,
            Math.PI * 2,
        );
        this.ctx.fill();
    }
}
