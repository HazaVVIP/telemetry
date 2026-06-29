export const PROJECTS = {
    'web-application-pentest': {
        slug: 'web-application-pentest',
        index: '01',
        title: 'Web Application Pentest',
        type: 'VAPT · OWASP',
        year: '2026',
        client: 'Enterprise SaaS (NDA)',
        description:
            'Full-scope web application assessment — authentication flows, business logic, API endpoints, and session handling. Manual testing with Burp Suite backed by structured OWASP methodology. Deliverables: prioritized findings, PoC evidence, and remediation guidance your dev team can ship.',
        services: ['OWASP Top 10', 'Burp Suite', 'Auth & Session', 'Business Logic', 'Reporting'],
        poster: '/assets/media/images/network-abstract.jpg',
        video: '/assets/media/videos/programming-hands.mp4',
        visual: 'field',
    },
    'network-infrastructure': {
        slug: 'network-infrastructure',
        index: '02',
        title: 'Network & Infrastructure',
        type: 'Internal · External',
        year: '2025',
        client: 'Regional ISP (NDA)',
        description:
            'External and internal network penetration test across perimeter assets, VPN entry points, and segmented VLANs. Mapped attack paths from foothold to critical assets — misconfigs, legacy services, and lateral movement chains documented with clear risk ratings.',
        services: ['Nmap / Nuclei', 'Active Directory', 'Lateral Movement', 'Segmentation Review', 'Executive Summary'],
        poster: '/assets/media/images/server-rack.jpg',
        image: '/assets/media/images/server-rack.jpg',
        visual: 'grid',
    },
    'red-team-simulation': {
        slug: 'red-team-simulation',
        index: '03',
        title: 'Red Team Simulation',
        type: 'Adversary Emulation',
        year: '2025',
        client: 'Financial Services (NDA)',
        description:
            'Objective-based red team engagement simulating real adversary TTPs — initial access through phishing-resistant vectors, persistence, and goal execution against crown-jewel assets. Purple-team debrief aligned detection gaps with actionable SIEM and EDR tuning.',
        services: ['MITRE ATT&CK', 'C2 Operations', 'Phishing Simulation', 'Detection Gap Analysis', 'Purple Team'],
        poster: '/assets/media/images/network-abstract.jpg',
        video: '/assets/media/videos/surveillance-team.mp4',
        visual: 'wave',
    },
    'cloud-api-security': {
        slug: 'cloud-api-security',
        index: '04',
        title: 'Cloud & API Security',
        type: 'Cloud · API',
        year: '2024',
        client: 'Tech Startup (NDA)',
        description:
            'Cloud posture review and API security assessment — exposed storage, IAM misconfigurations, SSRF chains, and broken object-level authorization. Combined automated scanning with manual validation to eliminate false positives before they reach your board deck.',
        services: ['AWS / GCP', 'REST & GraphQL', 'IAM Review', 'SSRF / IDOR', 'Compliance-ready Reports'],
        poster: '/assets/media/images/datacenter-dark.jpg',
        video: '/assets/media/videos/soc-monitoring.mp4',
        visual: 'orbit',
    },
};

export function getProject(slug) {
    return PROJECTS[slug] ?? null;
}

export function getAllProjects() {
    return Object.values(PROJECTS);
}
