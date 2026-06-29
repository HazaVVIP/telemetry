export function initThemeMedia() {
    document.querySelectorAll('[data-theme-media]').forEach((container) => {
        const project = {
            title: container.dataset.themeMediaTitle || '',
            video: container.dataset.themeMediaVideo || null,
            image: container.dataset.themeMediaImage || null,
            poster: container.dataset.themeMediaPoster || null,
        };

        if (!project.video && !project.image && !project.poster) return;

        const autoplay = container.dataset.themeMediaAutoplay !== 'false';
        renderProjectMedia(container, project, { autoplay, loop: true });
    });
}

export function renderProjectMedia(container, project, { autoplay = false, loop = true } = {}) {
    if (!container || !project) return null;

    container.innerHTML = '';

    if (project.video) {
        const video = document.createElement('video');
        video.src = project.video;
        if (project.poster) video.poster = project.poster;
        video.muted = true;
        video.playsInline = true;
        video.loop = loop;
        video.autoplay = autoplay;
        video.className = 'project-media-video';
        container.appendChild(video);
        if (autoplay) video.play().catch(() => {});
        return { type: 'video', el: video };
    }

    const imageSrc = project.image || project.poster;
    if (imageSrc) {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = project.title;
        img.className = 'project-media-image';
        img.loading = 'lazy';
        container.appendChild(img);
        return { type: 'image', el: img };
    }

    return null;
}

export function clearProjectMedia(container) {
    if (!container) return;
    const video = container.querySelector('video');
    if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
    }
    container.innerHTML = '';
}
