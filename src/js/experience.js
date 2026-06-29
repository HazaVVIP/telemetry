import * as THREE from 'three';
import { isMobile, prefersReducedMotion } from './utils.js';

export class MainExperience {
    constructor() {
        this.container = document.getElementById('canvas-container');
        if (!this.container || prefersReducedMotion()) return;

        this.mouse = new THREE.Vector2();
        this.targetMouse = new THREE.Vector2();
        this.clock = new THREE.Clock();
        this.scrollProgress = 0;
        this.panelProgress = 0;
        this.particleCount = isMobile() ? 3000 : 8000;

        this.init();
        this.createScene();
        this.createParticles();
        this.createOrb();
        this.createBackground();
        this.setupEvents();
        this.animate();
    }

    init() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: !isMobile(),
            alpha: true,
            powerPreference: 'high-performance',
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
        this.renderer.setClearColor(0x000000, 1);
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 120);
        this.camera.position.set(0, 0, 14);
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000000, 0.045);
    }

    createScene() {
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.08));
        const key = new THREE.PointLight(0xffffff, 1.2, 80);
        key.position.set(6, 8, 10);
        this.scene.add(key);
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const sizes = [];

        for (let i = 0; i < this.particleCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20 - 5,
            );
            sizes.push(Math.random() * 2 + 0.5);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uScroll: { value: 0 },
            },
            vertexShader: `
                attribute float size;
                uniform float uTime;
                uniform vec2 uMouse;
                uniform float uScroll;
                void main() {
                    vec3 pos = position;
                    pos.x += sin(uTime * 0.15 + pos.y * 0.08) * 0.35;
                    pos.y += cos(uTime * 0.12 + pos.x * 0.06) * 0.25;
                    pos.z += uScroll * 4.0;
                    float m = smoothstep(4.0, 0.0, distance(uMouse * 8.0, pos.xy));
                    pos.z += m * 0.8;
                    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * (220.0 / -mv.z);
                    gl_Position = projectionMatrix * mv;
                }
            `,
            fragmentShader: `
                uniform float uTime;
                void main() {
                    vec2 c = gl_PointCoord - 0.5;
                    float d = length(c);
                    float a = smoothstep(0.5, 0.0, d);
                    float tw = 0.55 + 0.45 * sin(uTime + gl_FragCoord.x * 0.02);
                    gl_FragColor = vec4(vec3(1.0), a * tw * 0.45);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createOrb() {
        const geometry = new THREE.IcosahedronGeometry(2.2, 4);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
            },
            vertexShader: `
                uniform float uTime;
                uniform vec2 uMouse;
                varying vec3 vNormal;
                void main() {
                    vNormal = normal;
                    vec3 pos = position;
                    pos += normal * sin(uTime * 0.4 + position.y * 2.0) * 0.06;
                    float m = smoothstep(3.0, 0.0, distance(uMouse * 4.0, pos.xy));
                    pos += normal * m * 0.12;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                uniform float uTime;
                void main() {
                    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0, 0, 1))), 2.5);
                    float pulse = 0.5 + 0.5 * sin(uTime * 0.6);
                    gl_FragColor = vec4(vec3(1.0), fresnel * pulse * 0.18);
                }
            `,
            transparent: true,
            wireframe: true,
        });

        this.orb = new THREE.Mesh(geometry, material);
        this.orb.position.set(5, 1, -6);
        this.scene.add(this.orb);
    }

    createBackground() {
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform float uTime;
                uniform vec2 uMouse;
                void main() {
                    vec2 uv = vUv;
                    vec2 m = uMouse * 0.5 + 0.5;
                    float glow = exp(-distance(uv, m) * 2.5) * 0.06;
                    float band = smoothstep(0.0, 0.35, uv.y) * 0.04;
                    gl_FragColor = vec4(vec3(glow + band), 1.0);
                }
            `,
            depthWrite: false,
        });

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        mesh.frustumCulled = false;
        mesh.renderOrder = -1;
        this.bg = mesh;
        this.scene.add(mesh);
    }

    setScrollProgress(progress) {
        this.scrollProgress = progress;
    }

    setPanelProgress(progress) {
        this.panelProgress = progress;
    }

    setupEvents() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = this.clock.getElapsedTime();
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.06;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.06;

        if (this.particles) {
            this.particles.material.uniforms.uTime.value = time;
            this.particles.material.uniforms.uMouse.value.copy(this.mouse);
            this.particles.material.uniforms.uScroll.value = this.scrollProgress;
            this.particles.rotation.y = time * 0.015;
        }

        if (this.orb) {
            this.orb.material.uniforms.uTime.value = time;
            this.orb.material.uniforms.uMouse.value.copy(this.mouse);
            this.orb.rotation.x = time * 0.08;
            this.orb.rotation.y = time * 0.12;
            this.orb.position.y = 1 + Math.sin(time * 0.3) * 0.4;
        }

        if (this.bg) {
            this.bg.material.uniforms.uTime.value = time;
            this.bg.material.uniforms.uMouse.value.copy(this.mouse);
        }

        const scrollZ = this.scrollProgress * 6;
        const panelTilt = this.panelProgress * 0.3;
        this.camera.position.x += (this.mouse.x * 1.2 - this.camera.position.x) * 0.025;
        this.camera.position.y += (this.mouse.y * 0.8 - this.camera.position.y) * 0.025;
        this.camera.position.z = 14 - scrollZ;
        this.camera.lookAt(0, panelTilt, 0);

        this.renderer.render(this.scene, this.camera);
    }
}
