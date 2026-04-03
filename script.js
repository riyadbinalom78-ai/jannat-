// JANNATUL FERDUSH ANY — script.js

document.addEventListener('DOMContentLoaded', function () {

  /* ── Navbar scroll ── */
  var nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ── Hamburger ── */
  var burger  = document.querySelector('.hamburger');
  var overlay = document.querySelector('.nav-overlay');

  if (burger && overlay) {

    // Force overlay hidden at start
    overlay.style.display = 'none';
    var isOpen = false;

    function openMenu() {
      isOpen = true;
      overlay.style.display = 'flex';
      // Small delay so display:flex renders before opacity transition
      setTimeout(function () { overlay.classList.add('open'); }, 10);
      burger.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      isOpen = false;
      overlay.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
      // Hide after transition ends
      setTimeout(function () {
        if (!isOpen) overlay.style.display = 'none';
      }, 400);
    }

    burger.addEventListener('click', function () {
      if (isOpen) closeMenu(); else openMenu();
    });

    // Close on any link inside overlay
    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  /* ── Scroll reveal ── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, i * 80);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Lightbox (gallery page) ── */
  var lb    = document.querySelector('.lightbox');
  var lbImg = lb ? lb.querySelector('img') : null;
  var lbX   = document.querySelector('.lb-close');

  if (lb && lbImg) {
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        lbImg.src = item.querySelector('img').src;
        lb.style.display = 'flex';
        setTimeout(function () { lb.classList.add('open'); }, 10);
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLb() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(function () { lb.style.display = 'none'; }, 380);
    }

    if (lbX) lbX.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLb();
    });
    // Hide at start
    lb.style.display = 'none';
  }

  /* ── Contact form via Formspree ── */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn  = form.querySelector('.form-submit');
      var data = new FormData(form);

      btn.textContent = 'Sending...';
      btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        if (res.ok) {
          btn.textContent = 'Message Sent ✓';
          btn.style.background = '#4CAF50';
          form.reset();
        } else {
          btn.textContent = 'Error — Try Again';
          btn.style.background = '#e53935';
        }
        btn.disabled = false;
        setTimeout(function () {
          btn.textContent = 'Send Message';
          btn.style.background = '';
        }, 4000);
      })
      .catch(function () {
        btn.textContent = 'Error — Try Again';
        btn.style.background = '#e53935';
        btn.disabled = false;
        setTimeout(function () {
          btn.textContent = 'Send Message';
          btn.style.background = '';
        }, 4000);
      });
    });
  }

});
