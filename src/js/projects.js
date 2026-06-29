export const PROJECTS = {
    'neural-canvas': {
        slug: 'neural-canvas',
        index: '01',
        title: 'Neural Canvas',
        type: 'WebGL Experience',
        year: '2026',
        client: 'Internal R&D',
        description:
            'A generative painting environment where brushstrokes are driven by real-time neural inference. Visitors co-author evolving compositions through motion, sound, and touch.',
        services: ['Creative Development', 'WebGL', 'Shader Design', 'Art Direction'],
        preview: 'radial-gradient(circle at 30% 40%, #ffffff 0%, transparent 45%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.15) 0%, transparent 50%), #000',
        visual: 'field',
    },
    'quantum-grid': {
        slug: 'quantum-grid',
        index: '02',
        title: 'Quantum Grid',
        type: 'Interactive Visualization',
        year: '2025',
        client: 'Research Lab',
        description:
            'An interactive lattice that visualizes high-dimensional data as a living topology. Nodes breathe, re-route, and collapse under user intent — clarity from complexity.',
        services: ['Data Viz', 'Interaction Design', 'Real-time Graphics'],
        preview: 'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.25) 0%, transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #000 100%)',
        visual: 'grid',
    },
    'flux-engine': {
        slug: 'flux-engine',
        index: '03',
        title: 'Flux Engine',
        type: 'Real-time Analytics',
        year: '2025',
        client: 'Enterprise Platform',
        description:
            'A real-time telemetry surface that treats metrics as motion design. Streams pulse across a dark field — operators feel system health before they read it.',
        services: ['Front-end Architecture', 'WebSockets', 'Motion Systems'],
        preview: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 55%), #000',
        visual: 'wave',
    },
    'void-walker': {
        slug: 'void-walker',
        index: '04',
        title: 'Void Walker',
        type: 'Immersive 3D',
        year: '2024',
        client: 'Cultural Institution',
        description:
            'A spatial narrative experienced through scroll-driven camera choreography. Each chapter dissolves into the next — memory, architecture, and void as one continuous shot.',
        services: ['3D Direction', 'Scroll UX', 'Creative Technology'],
        preview: 'conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.12), transparent 60%), #000',
        visual: 'orbit',
    },
};

export function getProject(slug) {
    return PROJECTS[slug] ?? null;
}

export function getAllProjects() {
    return Object.values(PROJECTS);
}
