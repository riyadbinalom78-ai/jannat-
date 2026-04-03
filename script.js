// JANNATUL FERDUSH ANY — script.js

document.addEventListener('DOMContentLoaded', function () {

  // Navbar scroll effect
  var nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Hamburger menu
  var burger  = document.querySelector('.hamburger');
  var overlay = document.querySelector('.nav-overlay');

  if (burger && overlay) {

    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        burger.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Scroll reveal
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
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // Lightbox — only on gallery page
  var lb    = document.querySelector('.lightbox');
  var lbImg = lb ? lb.querySelector('img') : null;
  var lbX   = document.querySelector('.lb-close');

  if (lb && lbImg) {
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        lbImg.src = item.querySelector('img').src;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    if (lbX) lbX.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  }

  // Contact form
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.form-submit');
      btn.textContent = 'Sent ✓';
      btn.style.background = '#4CAF50';
      setTimeout(function () { btn.textContent = 'Send Message'; btn.style.background = ''; }, 3000);
      form.reset();
    });
  }

});
