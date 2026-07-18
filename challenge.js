/* Portal Purgatory homepage integration
   Adds: hero challenge button (replaces hero "Get a demo"),
   typewriter taunt line, and the challenge section after Platform in Action.
   Activated by one line in index.html:
   <script src="/challenge.js" defer></script>
*/
(function () {
  function init() {
    var css = document.createElement('style');
    css.textContent =
      '@keyframes ppglow{0%,100%{box-shadow:0 4px 16px rgba(192,32,176,.3);}50%{box-shadow:0 6px 32px rgba(192,32,176,.65);}}' +
      '@keyframes ppbob{0%,100%{transform:rotate(-9deg) translateY(0);}50%{transform:rotate(-5deg) translateY(-8px);}}' +
      '@keyframes ppblink{50%{opacity:0;}}' +
      '.pp-hero-btn{position:relative!important; overflow:visible!important; background:linear-gradient(135deg,#c020b0,#8b35c8)!important; color:#fff!important; border:none!important; text-decoration:none; animation:ppglow 2.2s ease-in-out infinite;}' +
      '.pp-hero-btn img{position:absolute; right:-34px; top:-56px; height:88px; width:auto; animation:ppbob 3s ease-in-out infinite; filter:drop-shadow(0 0 5px rgba(255,255,255,0.95)) drop-shadow(0 0 12px rgba(255,255,255,0.75)) drop-shadow(0 14px 14px rgba(60,20,90,0.35)); pointer-events:none;}' +
      '.pp-taunt{font-family:monospace; font-size:12.5px; color:#c020b0; margin:14px 0 0; letter-spacing:0.5px; min-height:18px;}' +
      '.ppg-panel{max-width:1040px; margin:0 auto; background:#f2eef9; border:1px solid rgba(139,53,200,0.13); border-radius:18px; padding:44px 40px; display:grid; grid-template-columns:1fr 230px; gap:36px; align-items:center; box-shadow:0 2px 16px rgba(100,40,160,0.08);}' +
      '.ppg-kicker{font-family:monospace; font-size:12px; letter-spacing:3px; color:#c020b0; margin:0 0 12px;}' +
      '.ppg-h2{font-family:Raleway,sans-serif; font-size:34px; font-weight:800; line-height:1.2; color:#1a1020; margin:0 0 12px;}' +
      '.ppg-h2 span{background:linear-gradient(90deg,#8b35c8,#c020b0); -webkit-background-clip:text; background-clip:text; color:transparent;}' +
      '.ppg-p{font-size:16px; color:#3d2d55; line-height:1.65; margin:0 0 18px; max-width:560px;}' +
      '.ppg-cta{display:inline-block; background:linear-gradient(135deg,#8b35c8,#c020b0); color:#fff; font-weight:600; font-size:16px; padding:13px 26px; border-radius:9px; text-decoration:none; box-shadow:0 2px 16px rgba(100,40,160,0.18);}' +
      '.ppg-stats{font-family:monospace; font-size:12px; color:#6b5585; margin-top:14px;}' +
      '.ppg-mugcard{background:#ffffff; border:1px solid rgba(139,53,200,0.13); border-radius:14px; padding:18px 14px 12px; text-align:center;}' +
      '.ppg-mugcard img{width:100%; max-width:170px; height:auto;}' +
      '.ppg-mugcap{font-size:12.5px; color:#6b5585; margin:8px 0 0;}' +
      '@media(max-width:760px){.ppg-panel{grid-template-columns:1fr; padding:32px 22px; text-align:center;} .ppg-p{margin-left:auto; margin-right:auto;} .ppg-mugcard{max-width:230px; margin:0 auto;} .pp-hero-btn img{right:-16px; top:-60px; height:76px;}}';
    document.head.appendChild(css);

    /* 1. Hero button: replace the hero "Get a demo" with the challenge link */
    var heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
      var old = Array.prototype.slice.call(heroActions.querySelectorAll('a,button')).filter(function (el) {
        return /get a demo/i.test(el.textContent);
      })[0];
      if (old) {
        var a = document.createElement('a');
        a.href = '/play/?src=hero';
        a.className = old.className + ' pp-hero-btn';
        a.innerHTML = '🏆 Beat the portal. Win a Stanley.<img src="/play/mug.png" alt="">';
        old.parentNode.replaceChild(a, old);
      }
      /* typewriter taunt under the buttons */
      var p = document.createElement('p');
      p.className = 'pp-taunt';
      heroActions.insertAdjacentElement('afterend', p);
      var msg = 'PORTAL PURGATORY: 2 minutes in supplier hell. 87% lose. Your suppliers play it daily.';
      var cur = document.createElement('span');
      cur.textContent = '▋';
      cur.style.animation = 'ppblink 1s step-end infinite';
      var txt = document.createTextNode('');
      p.appendChild(txt);
      p.appendChild(cur);
      var i = 0;
      var iv = setInterval(function () {
        txt.textContent = msg.slice(0, ++i);
        if (i >= msg.length) clearInterval(iv);
      }, 28);
    }

    /* 2. Challenge section after Platform in Action (#live) */
    var live = document.querySelector('#live');
    if (live) {
      var sec = document.createElement('section');
      sec.id = 'challenge';
      sec.style.cssText = 'padding:72px 20px; background:#f9f8fc;';
      sec.innerHTML =
        '<div class="ppg-panel">' +
        '<div>' +
        '<p class="ppg-kicker">THE CHALLENGE</p>' +
        '<h2 class="ppg-h2">Think spec data entry is easy?<br><span>Survive the portal. Win the mug.</span></h2>' +
        '<p class="ppg-p">Play Portal Purgatory: 2 minutes as a food supplier retyping one spec into a hostile customer portal. Beat it and win a Stanley Quencher travel mug. Lose, and you will understand exactly why we built Autospec.</p>' +
        '<a class="ppg-cta" href="/play/?src=homepage">Play Portal Purgatory →</a>' +
        '<p class="ppg-stats">87% of players lose to the portal · your suppliers play it daily</p>' +
        '</div>' +
        '<div class="ppg-mugcard">' +
        '<img src="/play/mug-graphic.png" alt="Stanley Quencher travel mug with Autospec.ai Portal Survivor imprint">' +
        '<p class="ppg-mugcap">The prize: a 30 oz Stanley Quencher</p>' +
        '</div>' +
        '</div>';
      live.insertAdjacentElement('afterend', sec);
    }
  }

  /* 3. Calm the hero ecosystem graphic after its intro story plays.
        Plays fully for ~20s (both label+stamp moments), then the chip swarm
        fades out and the scene freezes on the stamped-label frame.
        Hover resumes the animation. Adds a funnel link to the game below. */
  function calmHero() {
    var anchorEl = document.getElementById('label-artwork-2');
    var svg = anchorEl && anchorEl.ownerSVGElement;
    if (!svg || typeof svg.pauseAnimations !== 'function') return;

    var chips = [];
    var motions = svg.querySelectorAll('animateMotion');
    Array.prototype.forEach.call(motions, function (m) {
      var g = m.closest ? m.closest('g') : null;
      if (g && !/label-artwork/.test(g.id || '')) chips.push(g);
    });

    function hideChips() {
      chips.forEach(function (g) {
        g.style.transition = 'opacity 0.7s';
        g.style.opacity = '0';
      });
      setTimeout(function () {
        chips.forEach(function (g) { g.style.display = 'none'; });
      }, 750);
    }
    function freeze() { try { svg.pauseAnimations(); } catch (e) {} }

    var reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    if (reduce) {
      try { svg.setCurrentTime(20.6); } catch (e) {}
      hideChips();
      freeze();
    } else {
      setTimeout(hideChips, 19600);
      setTimeout(freeze, 20500);
    }

    svg.addEventListener('mouseenter', function () { try { svg.unpauseAnimations(); } catch (e) {} });
    svg.addEventListener('mouseleave', function () { try { svg.pauseAnimations(); } catch (e) {} });

    /* funnel link below the graphic */
    var a = document.createElement('a');
    a.href = '/play/?src=diagram';
    a.textContent = 'This is your supplier’s day. Try surviving it →';
    a.style.cssText = 'display:block; text-align:center; margin:10px auto 2px; max-width:340px; background:#180e2a; color:#fff; font-family:"Plus Jakarta Sans",sans-serif; font-size:12.5px; font-weight:600; padding:9px 16px; border-radius:999px; text-decoration:none; box-shadow:0 2px 12px rgba(24,14,42,0.25);';
    svg.insertAdjacentElement('afterend', a);
  }

  function boot() { init(); calmHero(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
