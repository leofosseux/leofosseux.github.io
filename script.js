// ===================== Smooth scroll vers les sections =====================
document.querySelectorAll('.nav-link, .hero-actions .btn').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && href.startsWith("#")) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===================== Burger menu (mobile) =====================
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// ===================== Apparition (reveal) au scroll =====================
const revealEls = document.querySelectorAll('.reveal');

const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        }
    });
}, {threshold: 0.15});

revealEls.forEach(el => io.observe(el));

// ===================== Fond animé sur l'accueil (canvas) =====================
(function () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, pxRatio;
    let particles = [];

    function resize() {
        pxRatio = window.devicePixelRatio || 1;
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = width * pxRatio;
        canvas.height = height * pxRatio;
        ctx.setTransform(pxRatio, 0, 0, pxRatio, 0, 0);
    }

    function initParticles() {
        particles = [];
        const count = 70;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: 0.5 + Math.random() * 1.5,
                a: Math.random() * Math.PI * 2,
                s: 0.3 + Math.random() * 0.8
            });
        }
    }

    function step() {
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = "lighter";

        particles.forEach(p => {
            p.a += 0.01 * p.s;
            p.x += Math.cos(p.a) * 0.25 * p.s;
            p.y += Math.sin(p.a) * 0.25 * p.s;

            // wrap edges
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 10);
            g.addColorStop(0, "rgba(126,161,255,.8)");
            g.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 10, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(step);
    }

    function start() {
        resize();
        initParticles();
        step();
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    start();
})();

// ===================== Onglets projets =====================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});
