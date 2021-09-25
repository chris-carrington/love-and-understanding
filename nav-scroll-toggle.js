(function bindNavScrollToggle () {
  var navbarId = 'navbar',
      id = '$navScrollToggle'; // window identifier

  window[id] = {
    timeout: null,
    scrollTop: null,
    isScrolling: null,
    lastScrollTop: null,
    doneScrollingAfter: 1000, // ms
    navHideClass: 'nav-hide',
    nav: document.getElementById(navbarId),
  };

  if (window[id].nav) {
    window.addEventListener('scroll', function () {
      if (window[id].timeout) window.clearTimeout(window[id].timeout);

      if (!window[id].isScrolling) {
        window[id].scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (window[id].scrollTop > window[id].lastScrollTop) { // downscroll
          window[id].nav.classList.add(window[id].navHideClass);
        } else { // upscroll
          window[id].nav.classList.remove(window[id].navHideClass);
        }

        window[id].isScrolling = true;
        window[id].lastScrollTop = window[id].scrollTop <= 0 ? 0 : window[id].scrollTop; // for mobile or negative scrolling
      }

      window.setTimeout(function () {
        window[id].isScrolling = false;
      }, window[id].doneScrollingAfter);
    }, false);
  }
}());
