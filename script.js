document.addEventListener("DOMContentLoaded", () => {
    // 1. Load Header and initialize menu
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

    // 2. Load Footer
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

// Mobile Menu Logic
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

// Scroll Logic with Safety Checks
window.onscroll = function () {
    const timeline = document.querySelector('.timeline-container');
    const progressBar = document.getElementById('progress-bar');
    
    // ONLY run the logic if BOTH elements exist on the current page
    if (timeline && progressBar) {
        updateTimeline(timeline, progressBar);
    }
};

function updateTimeline(timeline, progressBar) {
    const items = document.querySelectorAll('.timeline-item');
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Logic runs if the timeline section has entered the view
    if (rect.top < windowHeight) {
        let height = (windowHeight - rect.top) / rect.height * 100;
        
        // Fine-tune the start/end of the line growth
        height = Math.min(Math.max(height - 25, 0), 100); 
        progressBar.style.height = height + "%";

        // Activate timeline items
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