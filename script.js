// JANNATUL FERDUSH ANY — Premium script.js

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     1. CUSTOM CURSOR
  ============================================================ */
  var dot  = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');

  if (dot && ring && window.matchMedia('(hover:hover)').matches) {
    var cx = 0, cy = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      cx = e.clientX; cy = e.clientY;
      dot.style.left = cx + 'px';
      dot.style.top  = cy + 'px';
    });

    (function animRing() {
      rx += (cx - rx) * 0.12;
      ry += (cy - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a,button,.hamburger,.gallery-item,.skill-card,.project-card,.social-card,.value-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('cursor-hover'); });
    });
  }

  /* ============================================================
     2. SCROLL PROGRESS BAR (auto-inject)
  ============================================================ */
  var bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;z-index:9999;height:3px;width:0;pointer-events:none;background:linear-gradient(to right,#B03055,#C09A5A);border-radius:0 2px 2px 0;transition:width .1s linear';
  document.body.appendChild(bar);

  window.addEventListener('scroll', function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }, { passive: true });

  /* ============================================================
     3. NAVBAR SCROLL
  ============================================================ */
  var nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  /* ============================================================
     4. HAMBURGER MENU — rock-solid implementation
  ============================================================ */
  var burger  = document.querySelector('.hamburger');
  var overlay = document.querySelector('.nav-overlay');
  var isOpen  = false;

  if (burger && overlay) {
    overlay.style.display = 'none';

    function openMenu() {
      isOpen = true;
      overlay.style.display = 'flex';
      document.body.classList.add('menu-open');
      burger.classList.add('open');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.classList.add('open');
        });
      });
    }

    function closeMenu() {
      isOpen = false;
      burger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.classList.remove('menu-open');
      setTimeout(function () {
        if (!isOpen) overlay.style.display = 'none';
      }, 460);
    }

    burger.addEventListener('click', function () {
      isOpen ? closeMenu() : openMenu();
    });

    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  /* ============================================================
     5. SCROLL REVEAL (staggered)
  ============================================================ */
  var reveals = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');

  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var siblings = Array.from(
          entry.target.parentElement.querySelectorAll('.reveal,.reveal-left,.reveal-right')
        );
        var delay = Math.min(siblings.indexOf(entry.target) * 90, 400);
        setTimeout(function () { entry.target.classList.add('visible'); }, delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ============================================================
     6. ANIMATED STAT COUNTERS
  ============================================================ */
  function animCounter(el) {
    var target   = parseFloat(el.getAttribute('data-target'));
    var suffix   = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var start    = performance.now();

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    (function step(now) {
      var prog    = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(easeOut(prog) * target) + suffix;
      if (prog < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    })(start);
  }

  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
      cio.observe(el);
    });
  }

  /* ============================================================
     7. TYPING EFFECT
  ============================================================ */
  var typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    var phrases   = typingEl.getAttribute('data-phrases').split('|');
    var pi = 0, ci = 0, del = false;

    function type() {
      var cur = phrases[pi];
      if (!del) {
        typingEl.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) { del = true; setTimeout(type, 1800); return; }
        setTimeout(type, 70);
      } else {
        typingEl.textContent = cur.slice(0, --ci);
        if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
        setTimeout(type, 40);
      }
    }
    setTimeout(type, 1200);
  }

  /* ============================================================
     8. HERO PARALLAX (mouse)
  ============================================================ */
  var hero = document.querySelector('.hero');
  if (hero) {
    var frame = document.querySelector('.hero-photo-frame');
    var badge = document.querySelector('.hero-badge');

    hero.addEventListener('mousemove', function (e) {
      var r  = hero.getBoundingClientRect();
      var mx = (e.clientX - r.left)  / r.width  - 0.5;
      var my = (e.clientY - r.top)   / r.height - 0.5;
      if (frame) frame.style.transform = 'translate(' + (mx*12)+'px,' + (my*8) + 'px)';
      if (badge) badge.style.transform = 'translate(' + (-mx*10)+'px,' + (-my*6) + 'px)';
    });
    hero.addEventListener('mouseleave', function () {
      if (frame) frame.style.transform = '';
      if (badge) badge.style.transform = '';
    });
  }

  /* ============================================================
     9. SKILL CARD — number watermark + tilt
  ============================================================ */
  document.querySelectorAll('.skill-card').forEach(function (card, i) {
    card.setAttribute('data-num', String(i + 1).padStart(2, '0'));

    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = 'translateY(-4px) rotateX(' + (-y*6) + 'deg) rotateY(' + (x*6) + 'deg)';
    });
    card.addEventListener('mouseleave', function () { card.style.transform = ''; });
  });

  /* ============================================================
     10. PROJECT CARD tilt
  ============================================================ */
  document.querySelectorAll('.project-card:not(.featured)').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = 'translateY(-4px) rotateX(' + (-y*3) + 'deg) rotateY(' + (x*3) + 'deg)';
    });
    card.addEventListener('mouseleave', function () { card.style.transform = ''; });
  });

  /* ============================================================
     11. GALLERY LIGHTBOX (with keyboard nav)
  ============================================================ */
  var lb     = document.querySelector('.lightbox');
  var lbImg  = lb ? lb.querySelector('img') : null;
  var lbX    = document.querySelector('.lb-close');
  var lbOn   = false;
  var items  = Array.from(document.querySelectorAll('.gallery-item'));
  var curIdx = 0;

  if (lb && lbImg) {
    lb.style.display = 'none';

    function openLb(idx) {
      curIdx = idx;
      lbImg.src = items[idx].querySelector('img').src;
      lb.style.display = 'flex';
      lbOn = true;
      document.body.classList.add('menu-open');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { lb.classList.add('open'); });
      });
    }

    function closeLb() {
      lbOn = false;
      lb.classList.remove('open');
      document.body.classList.remove('menu-open');
      setTimeout(function () { if (!lbOn) { lb.style.display = 'none'; lbImg.src = ''; } }, 420);
    }

    items.forEach(function (item, i) {
      item.addEventListener('click', function () { openLb(i); });
    });

    if (lbX) lbX.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });

    document.addEventListener('keydown', function (e) {
      if (!lbOn) return;
      if (e.key === 'Escape')    closeLb();
      if (e.key === 'ArrowRight' && items[curIdx + 1]) { curIdx++; lbImg.src = items[curIdx].querySelector('img').src; }
      if (e.key === 'ArrowLeft'  && items[curIdx - 1]) { curIdx--; lbImg.src = items[curIdx].querySelector('img').src; }
    });
  }

  /* ============================================================
     12. CONTACT FORM (Formspree)
  ============================================================ */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('.form-submit');
      var btnText   = submitBtn.querySelector('span') || submitBtn;
      var original  = btnText.textContent;

      btnText.textContent    = 'Sending…';
      submitBtn.disabled     = true;

      fetch(form.action, {
        method: 'POST', body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (r) {
        if (r.ok) {
          btnText.textContent       = 'Message Sent ✓';
          submitBtn.style.background = '#4CAF50';
          form.reset();
        } else {
          btnText.textContent       = 'Error — Try Again';
          submitBtn.style.background = '#e53935';
        }
      })
      .catch(function () {
        btnText.textContent       = 'Error — Try Again';
        submitBtn.style.background = '#e53935';
      })
      .finally(function () {
        setTimeout(function () {
          btnText.textContent       = original;
          submitBtn.style.background = '';
          submitBtn.disabled         = false;
        }, 4000);
      });
    });
  }

  /* ============================================================
     13. SMOOTH PAGE EXIT TRANSITIONS
  ============================================================ */
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto')
        && !href.startsWith('http') && !href.startsWith('tel')
        && href.endsWith('.html')) {

      a.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.style.cssText += ';opacity:0;transform:translateY(8px);transition:opacity .32s ease,transform .32s ease';
        setTimeout(function () { window.location.href = href; }, 340);
      });
    }
  });

  /* ============================================================
     14. ACTIVE NAV LINK
  ============================================================ */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === page) {
      a.style.color      = 'var(--rose-soft)';
      a.style.fontWeight = '500';
    }
  });

  /* ============================================================
     15. RIPPLE on buttons
  ============================================================ */
  var rippleCSS = document.createElement('style');
  rippleCSS.textContent = '@keyframes rippleAnim{from{transform:scale(0);opacity:1}to{transform:scale(3);opacity:0}}';
  document.head.appendChild(rippleCSS);

  document.querySelectorAll('.btn,.footer-social-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var r = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      r.style.cssText = [
        'position:absolute', 'border-radius:50%', 'pointer-events:none',
        'width:' + size + 'px', 'height:' + size + 'px',
        'left:' + (e.clientX - rect.left - size/2) + 'px',
        'top:' + (e.clientY - rect.top - size/2) + 'px',
        'background:rgba(255,255,255,0.2)',
        'animation:rippleAnim 0.55s ease forwards'
      ].join(';');
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(r);
      setTimeout(function () { r.remove(); }, 600);
    });
  });

}); // end DOMContentLoaded
