import { prefersReducedMotion } from './utils.js';

export class AmbientAudio {
    constructor() {
        this.enabled = false;
        this.ctx = null;
        this.gain = null;
        this.osc = null;
        this.btn = document.getElementById('sound-toggle');
        if (!this.btn || prefersReducedMotion()) {
            this.btn?.remove();
            return;
        }
        this.btn.addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.enabled ? this.stop() : this.start();
    }

    start() {
        if (this.enabled) return;
        this.ctx = new AudioContext();
        this.gain = this.ctx.createGain();
        this.gain.gain.value = 0;
        this.osc = this.ctx.createOscillator();
        this.osc.type = 'sine';
        this.osc.frequency.value = 58;
        const lfo = this.ctx.createOscillator();
        lfo.frequency.value = 0.08;
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 12;
        lfo.connect(lfoGain);
        lfoGain.connect(this.osc.frequency);
        this.osc.connect(this.gain);
        this.gain.connect(this.ctx.destination);
        this.osc.start();
        lfo.start();
        this.gain.gain.linearRampToValueAtTime(0.028, this.ctx.currentTime + 2);
        this.enabled = true;
        this.btn.classList.add('is-on');
        this.btn.querySelector('.sound-label').textContent = 'Suara aktif';
    }

    stop() {
        if (!this.enabled || !this.ctx) return;
        this.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.6);
        setTimeout(() => {
            this.osc?.stop();
            this.ctx?.close();
            this.enabled = false;
            this.ctx = null;
        }, 700);
        this.btn.classList.remove('is-on');
        this.btn.querySelector('.sound-label').textContent = 'Suara';
    }
}

export function initAudio() {
    return new AmbientAudio();
}
