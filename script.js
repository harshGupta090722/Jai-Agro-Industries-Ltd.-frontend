document.addEventListener("DOMContentLoaded", () => {
    const headerElem = document.getElementById('header');
    if (headerElem) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                headerElem.innerHTML = data;
                initMobileMenu();
            })
            .catch(err => console.error("Header load failed:", err));
    }

    const footerElem = document.getElementById('footer');
    if (footerElem) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerElem.innerHTML = data;
            })
            .catch(err => console.error("Footer load failed:", err));
    }
});

function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            menuBtn.innerHTML = isActive ? '✕' : '☰';
            menuBtn.style.transform = isActive ? 'rotate(90deg)' : 'rotate(0deg)';
        });

        const navLinks = document.querySelectorAll('.nav-links-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuBtn.innerHTML = '☰';
                menuBtn.style.transform = 'rotate(0deg)';
            });
        });
    }
}

window.onscroll = function () {
    const timeline = document.querySelector('.timeline-container');
    const progressBar = document.getElementById('progress-bar');

    if (timeline && progressBar) {
        updateTimeline(timeline, progressBar);
    }
};

function updateTimeline(timeline, progressBar) {
    const items = document.querySelectorAll('.timeline-item');
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight) {
        let height = (windowHeight - rect.top) / rect.height * 100;

        height = Math.min(Math.max(height - 25, 0), 100);
        progressBar.style.height = height + "%";

        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < windowHeight * 0.8) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}