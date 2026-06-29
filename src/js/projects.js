export const PROJECTS = {
    'web-application-pentest': {
        slug: 'web-application-pentest',
        index: '01',
        title: 'Pengujian Aplikasi Web',
        type: 'VAPT · OWASP',
        year: '2026',
        client: 'Enterprise SaaS (NDA)',
        description:
            'Assessment aplikasi web full-scope — alur autentikasi, business logic, endpoint API, dan session handling. Pengujian manual dengan Burp Suite mengikuti metodologi OWASP terstruktur. Deliverable: temuan terprioritas, bukti PoC, dan panduan remediasi yang bisa langsung dikerjakan tim dev.',
        services: ['OWASP Top 10', 'Burp Suite', 'Auth & Session', 'Business Logic', 'Pelaporan'],
        poster: '/assets/media/images/network-abstract.jpg',
        video: '/assets/media/videos/programming-hands.mp4',
        visual: 'field',
    },
    'network-infrastructure': {
        slug: 'network-infrastructure',
        index: '02',
        title: 'Jaringan & Infrastruktur',
        type: 'Internal · External',
        year: '2025',
        client: 'ISP Regional (NDA)',
        description:
            'Penetration test jaringan eksternal dan internal — aset perimeter, titik masuk VPN, dan VLAN tersegmentasi. Pemetaan attack path dari foothold hingga aset kritis: misconfig, layanan legacy, dan rantai lateral movement didokumentasikan dengan rating risiko yang jelas.',
        services: ['Nmap / Nuclei', 'Active Directory', 'Lateral Movement', 'Review Segmentasi', 'Executive Summary'],
        poster: '/assets/media/images/server-rack.jpg',
        image: '/assets/media/images/server-rack.jpg',
        visual: 'grid',
    },
    'red-team-simulation': {
        slug: 'red-team-simulation',
        index: '03',
        title: 'Simulasi Red Team',
        type: 'Adversary Emulation',
        year: '2025',
        client: 'Layanan Keuangan (NDA)',
        description:
            'Engagement red team berbasis objektif — simulasi TTP adversary nyata: initial access, persistence, dan eksekusi goal terhadap crown-jewel assets. Debrief purple team selaras dengan gap deteksi dan tuning SIEM/EDR yang actionable.',
        services: ['MITRE ATT&CK', 'Operasi C2', 'Simulasi Phishing', 'Analisis Gap Deteksi', 'Purple Team'],
        poster: '/assets/media/images/network-abstract.jpg',
        video: '/assets/media/videos/surveillance-team.mp4',
        visual: 'wave',
    },
    'cloud-api-security': {
        slug: 'cloud-api-security',
        index: '04',
        title: 'Keamanan Cloud & API',
        type: 'Cloud · API',
        year: '2024',
        client: 'Startup Teknologi (NDA)',
        description:
            'Review postur cloud dan assessment keamanan API — storage terpapar, misconfig IAM, rantai SSRF, dan broken object-level authorization. Kombinasi scanning otomatis dengan validasi manual untuk eliminasi false positive sebelum sampai ke laporan eksekutif.',
        services: ['AWS / GCP', 'REST & GraphQL', 'Review IAM', 'SSRF / IDOR', 'Laporan Compliance'],
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
