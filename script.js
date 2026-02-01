document.addEventListener("DOMContentLoaded", () => {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});


window.onscroll = function () {
    updateTimeline();
};

function updateTimeline() {
    const timeline = document.querySelector('.timeline-container');
    const progressBar = document.getElementById('progress-bar');
    const items = document.querySelectorAll('.timeline-item');

    // Calculate scroll percentage within the timeline section
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight) {
        let height = (windowHeight - rect.top) / rect.height * 100;
        // Cap height between 0 and 100
        height = Math.min(Math.max(height - 20, 0), 100);
        progressBar.style.height = height + "%";

        // Activate individual items as they come into view
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