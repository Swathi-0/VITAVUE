window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const headers = document.querySelectorAll('.eyva-conmtent-header');

    headers.forEach(header => {
        const headerOffsetTop = header.offsetTop;
        const headerHeight = header.clientHeight;

        if (scrollPosition + window.innerHeight > headerOffsetTop && scrollPosition < headerOffsetTop + headerHeight) {
            const scrollPercent = (scrollPosition + window.innerHeight - headerOffsetTop) / (window.innerHeight + headerHeight);
            const opacity = Math.min(Math.max(scrollPercent, 0), 1);
            header.style.opacity = opacity;
        }
    });
});