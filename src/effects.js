/* =============================================
   Addis Kitchen — Dynamic Effects
   ============================================= */

// ── 1. HERO SLIDESHOW ─────────────────────────
(function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dotsEl = document.getElementById('heroDots');
    if (!slides.length || !dotsEl) return;

    let current = 0;
    let timer;

    // Build dots
    slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'hero-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Slide ${i + 1}`);
        d.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(d);
    });

    function goTo(idx) {
        slides[current].classList.remove('active');
        dotsEl.children[current].classList.remove('active');
        current = (idx + slides.length) % slides.length;
        slides[current].classList.add('active');
        dotsEl.children[current].classList.add('active');
        resetTimer();
    }

    function next() { goTo(current + 1); }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(next, 5000);
    }

    resetTimer();
})();

// ── 2. HERO PARALLAX (on overlay, not slides) ─
const hero = document.getElementById('hero');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < hero.offsetHeight * 1.5) {
        // subtle parallax on the overlay opacity
        const fade = Math.min(y / hero.offsetHeight, 0.4);
        hero.querySelector('.hero-overlay').style.opacity = 1 + fade;
    }
}, { passive: true });

// ── 2. KITCHEN OPEN / CLOSED STATUS ───────────
function setKitchenStatus() {
    const badge = document.getElementById('kitchenStatus');
    if (!badge) return;
    const now = new Date();
    const day = now.getDay();   // 0=Sun 6=Sat
    const h   = now.getHours();
    const min = now.getMinutes();
    const time = h * 60 + min;
    const openTime  = day === 0 || day === 6 ? 9 * 60 : 10 * 60;
    const closeTime = day === 0 || day === 6 ? 23 * 60 : 22 * 60;
    const isOpen = time >= openTime && time < closeTime;

    badge.className = `hero-badge ${isOpen ? 'open' : 'closed'}`;
    badge.innerHTML = `
        <span class="badge-dot"></span>
        ${isOpen ? '🍽️ Kitchen Open Now' : '🔒 Currently Closed'}`;
}
setKitchenStatus();

// Also set footer status pill
function setFooterStatus() {
    const el = document.getElementById('footerStatus');
    if (!el) return;
    const now = new Date();
    const day = now.getDay();
    const time = now.getHours() * 60 + now.getMinutes();
    const openTime  = day === 0 || day === 6 ? 9 * 60 : 10 * 60;
    const closeTime = day === 0 || day === 6 ? 23 * 60 : 22 * 60;
    const isOpen = time >= openTime && time < closeTime;
    el.className = `footer-status ${isOpen ? 'open' : 'closed'}`;
    el.textContent = isOpen ? '● Open now' : '● Closed';
}
setFooterStatus();

// ── 3. CARD SCROLL-REVEAL (IntersectionObserver) ─
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

function observeCards() {
    document.querySelectorAll('.menu-item').forEach(card => {
        revealObserver.observe(card);
    });
}

// Re-observe whenever menu re-renders
const mutationObs = new MutationObserver(observeCards);
mutationObs.observe(menuContainer, { childList: true });
observeCards();

// ── 4. RIPPLE EFFECT ON ALL BUTTONS ───────────
document.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    if (!btn || btn.disabled) return;

    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 1.6;
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
});

// ── 5. CART FAB BUMP ANIMATION ────────────────
// Patch updateCartUI to trigger bump
const _updateCartUI = updateCartUI;
window.updateCartUI = function() {
    const before = cart.reduce((s, i) => s + i.quantity, 0);
    _updateCartUI.apply(this, arguments);
    const after = cart.reduce((s, i) => s + i.quantity, 0);
    if (after > before) bumpFab();
};

function bumpFab() {
    cartFab.classList.remove('bump');
    void cartFab.offsetWidth; // reflow to restart
    cartFab.classList.add('bump');
    cartFab.addEventListener('animationend', () => cartFab.classList.remove('bump'), { once: true });
}

// ── 6. CART TOTAL ANIMATE ─────────────────────
const totalObserver = new MutationObserver(() => {
    cartTotalEl.classList.remove('cart-total-animated');
    void cartTotalEl.offsetWidth;
    cartTotalEl.classList.add('cart-total-animated');
});
totalObserver.observe(cartTotalEl, { childList: true, characterData: true, subtree: true });

// ── 7. CONFETTI ON ORDER PLACED ───────────────
function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const COLORS = ['#d84315','#ffa726','#4caf50','#2196f3','#9c27b0','#ffeb3b','#fff'];
    const pieces = Array.from({ length: 120 }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * -canvas.height,
        w:  6 + Math.random() * 8,
        h:  10 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: Math.random() * 360,
        vx: (Math.random() - 0.5) * 3,
        vy: 2.5 + Math.random() * 3.5,
        vr: (Math.random() - 0.5) * 6,
        opacity: 1
    }));

    let frame;
    let start = null;
    const DURATION = 3000;

    function draw(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            p.x  += p.vx;
            p.y  += p.vy;
            p.rot += p.vr;
            if (elapsed > DURATION * 0.6) p.opacity -= 0.018;
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });

        if (elapsed < DURATION + 800) {
            frame = requestAnimationFrame(draw);
        } else {
            cancelAnimationFrame(frame);
            canvas.remove();
        }
    }
    frame = requestAnimationFrame(draw);
}

// Hook into place order
placeOrderBtn.addEventListener('click', () => {
    if (cart.length > 0) setTimeout(launchConfetti, 200);
}, true);

// ── 8. SMOOTH SEARCH DEBOUNCE HIGHLIGHT ───────
searchInput.addEventListener('input', () => {
    // Brief glow to give feedback
    searchInput.style.boxShadow = '0 0 0 3px rgba(216,67,21,0.2)';
    clearTimeout(searchInput._glow);
    searchInput._glow = setTimeout(() => {
        searchInput.style.boxShadow = '';
    }, 600);
});

// ── 9. STICKY NAV SHADOW ON SCROLL ────────────
const searchSection = document.querySelector('.search-section');
const categoryNav   = document.querySelector('.category-nav');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > hero.offsetHeight - 60;
    searchSection.style.boxShadow = scrolled
        ? '0 4px 20px rgba(0,0,0,0.12)'
        : '0 1px 0 var(--border), 0 4px 16px rgba(0,0,0,0.06)';
}, { passive: true });
