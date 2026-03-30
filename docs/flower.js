/* ══════════════════════════════════════════
   🌸  BLOSSOMING FLOWERS  –  JS Controller
   ══════════════════════════════════════════ */

/**
 * Build and inject the flower HTML, start the animation,
 * then after `duration` ms fade out and call `onComplete`.
 */
function showFlowerScreen(onComplete, duration) {
    duration = duration || 7500;

    var el = document.getElementById('flowerScreen');
    if (!el) return onComplete && onComplete();

    /* ── build inner HTML ── */
    el.innerHTML = buildFlowerHTML();
    el.classList.remove('hidden');
    el.classList.add('not-loaded');

    /* start animations after a tiny pause (like the original) */
    setTimeout(function () {
        el.classList.remove('not-loaded');
    }, 400);

    /* after duration, fade out → then remove & callback */
    setTimeout(function () {
        el.classList.add('fade-out');
        setTimeout(function () {
            el.classList.add('hidden');
            el.innerHTML = '';
            if (onComplete) onComplete();
        }, 1300);
    }, duration);
}

/* ── Helper: repeat a template N times ── */
function _lights() {
    var s = '';
    for (var i = 1; i <= 8; i++) s += '<div class="flower__light flower__light--' + i + '"></div>';
    return s;
}
function _flLeafs(n) {
    var s = '';
    for (var i = 1; i <= 4; i++) s += '<div class="flower__leaf flower__leaf--' + i + '"></div>';
    s += '<div class="flower__white-circle"></div>';
    s += _lights();
    return s;
}
function _lineLeafs(n) {
    var s = '';
    for (var i = 1; i <= n; i++) s += '<div class="flower__line__leaf flower__line__leaf--' + i + '"></div>';
    return s;
}
function _grassLeafs() {
    var s = '';
    for (var i = 1; i <= 8; i++) s += '<div class="flower__grass__leaf flower__grass__leaf--' + i + '"></div>';
    s += '<div class="flower__grass__overlay"></div>';
    return s;
}
function _gFrontLeafs() {
    var s = '';
    for (var i = 1; i <= 8; i++) {
        s += '<div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--' + i + '">';
        s += '<div class="flower__g-front__leaf"></div></div>';
    }
    return s;
}
function _gFrLeafs() {
    var s = '';
    for (var i = 1; i <= 8; i++) s += '<div class="flower__g-fr__leaf flower__g-fr__leaf--' + i + '"></div>';
    return s;
}
function _longG(idx, delays) {
    var s = '<div class="long-g long-g--' + idx + '">';
    for (var i = 0; i < delays.length; i++) {
        s += '<div class="grow-ans" style="--d:' + delays[i] + '">';
        s += '<div class="leaf leaf--' + i + '"></div></div>';
    }
    s += '</div>';
    return s;
}

function buildFlowerHTML() {
    return '' +
        /* message overlay */
        '<div class="flower-message">' +
        '<h2>Happy Birthday</h2>' +

        '</div>' +

        /* night sky */
        '<div class="night"></div>' +

        /* flowers container */
        '<div class="flowers">' +

        /* flower 1 */
        '<div class="flower flower--1">' +
        '<div class="flower__leafs flower__leafs--1">' + _flLeafs() + '</div>' +
        '<div class="flower__line">' + _lineLeafs(6) + '</div>' +
        '</div>' +

        /* flower 2 */
        '<div class="flower flower--2">' +
        '<div class="flower__leafs flower__leafs--2">' + _flLeafs() + '</div>' +
        '<div class="flower__line">' + _lineLeafs(4) + '</div>' +
        '</div>' +

        /* flower 3 */
        '<div class="flower flower--3">' +
        '<div class="flower__leafs flower__leafs--3">' + _flLeafs() + '</div>' +
        '<div class="flower__line">' + _lineLeafs(4) + '</div>' +
        '</div>' +

        /* long stem */
        '<div class="grow-ans" style="--d:1.2s">' +
        '<div class="flower__g-long">' +
        '<div class="flower__g-long__top"></div>' +
        '<div class="flower__g-long__bottom"></div>' +
        '</div>' +
        '</div>' +

        /* grass 1 */
        '<div class="growing-grass">' +
        '<div class="flower__grass flower__grass--1">' +
        '<div class="flower__grass--top"></div>' +
        '<div class="flower__grass--bottom"></div>' +
        _grassLeafs() +
        '</div>' +
        '</div>' +

        /* grass 2 */
        '<div class="growing-grass">' +
        '<div class="flower__grass flower__grass--2">' +
        '<div class="flower__grass--top"></div>' +
        '<div class="flower__grass--bottom"></div>' +
        _grassLeafs() +
        '</div>' +
        '</div>' +

        /* right side leaves */
        '<div class="grow-ans" style="--d:2.4s">' +
        '<div class="flower__g-right flower__g-right--1"><div class="leaf"></div></div>' +
        '</div>' +
        '<div class="grow-ans" style="--d:2.8s">' +
        '<div class="flower__g-right flower__g-right--2"><div class="leaf"></div></div>' +
        '</div>' +

        /* front leaves */
        '<div class="grow-ans" style="--d:2.8s">' +
        '<div class="flower__g-front">' +
        _gFrontLeafs() +
        '<div class="flower__g-front__line"></div>' +
        '</div>' +
        '</div>' +

        /* front right plant */
        '<div class="grow-ans" style="--d:3.2s">' +
        '<div class="flower__g-fr">' +
        '<div class="leaf"></div>' +
        _gFrLeafs() +
        '</div>' +
        '</div>' +

        /* long grass groups */
        _longG(0, ['3s', '2.2s', '3.4s', '3.6s']) +
        _longG(1, ['3.6s', '3.8s', '4s', '4.2s']) +
        _longG(2, ['4s', '4.2s', '4.4s', '4.6s']) +
        _longG(3, ['4s', '4.2s', '3s', '3.6s']) +
        _longG(4, ['4s', '4.2s', '3s', '3.6s']) +
        _longG(5, ['4s', '4.2s', '3s', '3.6s']) +
        _longG(6, ['4.2s', '4.4s', '4.6s', '4.8s']) +
        _longG(7, ['3s', '3.2s', '3.5s', '3.6s']) +

        '</div>'; /* end .flowers */
}
