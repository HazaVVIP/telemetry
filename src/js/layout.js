export function initLayout() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    const page = document.body.dataset.page;

    document.querySelectorAll('.nav-link[data-nav]').forEach((link) => {
        if (link.dataset.nav === page) link.classList.add('is-active');
    });

    toggle?.addEventListener('click', () => {
        links?.classList.toggle('is-open');
        toggle.classList.toggle('is-open');
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            links?.classList.remove('is-open');
            toggle?.classList.remove('is-open');
        });
    });
}

export function shellHead(title, description) {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.content = description;
}
