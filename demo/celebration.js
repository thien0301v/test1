/* ══════════════════════════════════════════
   🎆  CONFETTI  &  FIREWORKS  CELEBRATION
   ══════════════════════════════════════════ */

function launchCelebration() {
    const canvas = document.createElement('canvas');
    canvas.id = 'celebrationCanvas';
    canvas.style.cssText =
        'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;pointer-events:none;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let W, H;
    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    /* ── colour palette ── */
    const palette = [
        '#f2c4ce', '#f9dde3', '#ff6b9d', '#c084fc', '#f472b6',
        '#fbbf24', '#34d399', '#60a5fa', '#f87171', '#a78bfa',
        '#fb923c', '#e879f9', '#38bdf8', '#4ade80', '#facc15'
    ];
    const pick = () => palette[Math.floor(Math.random() * palette.length)];

    /* ══════  CONFETTI  ══════ */
    const confetti = [];
    for (let i = 0; i < 200; i++) {
        confetti.push({
            x: Math.random() * W,
            y: Math.random() * -H,
            w: 4 + Math.random() * 7,
            h: 6 + Math.random() * 10,
            color: pick(),
            vx: (Math.random() - 0.5) * 4,
            vy: 2 + Math.random() * 4,
            rot: Math.random() * 360,
            rotV: (Math.random() - 0.5) * 12,
            shape: Math.floor(Math.random() * 3)   // 0 rect · 1 circle · 2 star
        });
    }

    /* ══════  FIREWORKS  ══════ */
    const sparks = [];

    function spawnFirework() {
        const cx = W * 0.15 + Math.random() * W * 0.7;
        const cy = H * 0.08 + Math.random() * H * 0.4;
        const color = pick();
        const n = 30 + Math.floor(Math.random() * 30);
        for (let i = 0; i < n; i++) {
            const a = (Math.PI * 2 / n) * i + Math.random() * 0.3;
            const spd = 2 + Math.random() * 5;
            sparks.push({
                x: cx, y: cy,
                vx: Math.cos(a) * spd,
                vy: Math.sin(a) * spd,
                color: color,
                life: 1,
                decay: 0.012 + Math.random() * 0.018,
                size: 2 + Math.random() * 3,
                trail: []
            });
        }
    }

    /* spawn schedule */
    const fwTimer = setInterval(spawnFirework, 400);
    spawnFirework();                       // immediate burst
    setTimeout(spawnFirework, 150);        // quick follow‑up

    /* ── timing ── */
    const t0 = Date.now();
    const DURATION = 6000;
    let raf;

    /* ── helpers ── */
    function drawStar(cx, cy, r, col, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = col;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const a1 = (Math.PI * 2 / 5) * i - Math.PI / 2;
            const a2 = a1 + Math.PI / 5;
            ctx.lineTo(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r);
            ctx.lineTo(cx + Math.cos(a2) * r * 0.4, cy + Math.sin(a2) * r * 0.4);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    /* ══════  RENDER LOOP  ══════ */
    function frame() {
        const elapsed = Date.now() - t0;
        const progress = Math.min(elapsed / DURATION, 1);
        /* fade out in the last 30 % of duration */
        const gAlpha = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;

        ctx.clearRect(0, 0, W, H);

        /* ── draw confetti ── */
        confetti.forEach(c => {
            c.x += c.vx;
            c.y += c.vy;
            c.rot += c.rotV;
            c.vx *= 0.99;
            c.vy = Math.min(c.vy + 0.03, 6);
            c.vx += (Math.random() - 0.5) * 0.2;    // flutter
            if (c.y > H + 20) { c.y = -20; c.x = Math.random() * W; }

            ctx.save();
            ctx.globalAlpha = gAlpha * 0.9;
            ctx.translate(c.x, c.y);
            ctx.rotate(c.rot * Math.PI / 180);
            ctx.fillStyle = c.color;

            if (c.shape === 0) {
                ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
            } else if (c.shape === 1) {
                ctx.beginPath();
                ctx.arc(0, 0, c.w / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                drawStar(0, 0, c.w / 2, c.color, gAlpha * 0.9);
            }
            ctx.restore();
        });

        /* ── draw firework sparks ── */
        for (let i = sparks.length - 1; i >= 0; i--) {
            const s = sparks[i];
            s.trail.push({ x: s.x, y: s.y });
            if (s.trail.length > 5) s.trail.shift();
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.06;       // gravity
            s.vx *= 0.98;
            s.life -= s.decay;
            if (s.life <= 0) { sparks.splice(i, 1); continue; }

            /* outer glow */
            ctx.save();
            ctx.globalAlpha = s.life * gAlpha * 0.3;
            ctx.fillStyle = s.color;
            ctx.shadowColor = s.color;
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            /* bright core */
            ctx.save();
            ctx.globalAlpha = s.life * gAlpha;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            /* trail dots */
            s.trail.forEach((t, ti) => {
                ctx.save();
                ctx.globalAlpha = (ti / s.trail.length) * s.life * gAlpha * 0.4;
                ctx.fillStyle = s.color;
                ctx.beginPath();
                ctx.arc(t.x, t.y, s.size * 0.4, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }

        if (progress < 1) {
            raf = requestAnimationFrame(frame);
        } else {
            /* clean up */
            canvas.remove();
            clearInterval(fwTimer);
        }
    }

    /* stop spawning new fireworks after 4 s */
    setTimeout(() => clearInterval(fwTimer), 4000);

    raf = requestAnimationFrame(frame);
}
