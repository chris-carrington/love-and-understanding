(function () {
  var response,
      namespace = 'navScrollToggle',
      validate = function () {
        var errors = [],
            isValid = true;

        if (!window.$love || typeof window.$love !== 'object') {
          isValid = false;
          errors.push('Please define window.$love as an object');
        } else if (!window.$love[namespace] || typeof window.$love[namespace] !== 'object') {
          isValid = false;
          errors.push(`Please define window.$love.${ namespace } as an object`);
        } else if (!window.$love[namespace].navId || typeof window.$love[namespace].navId !== 'string') {
          isValid = false;
          errors.push(`Please define window.$love.${ namespace }.navId as a string`);
        } else if (!window.$love[namespace].navHideClass || typeof window.$love[namespace].navHideClass !== 'string') {
          isValid = false;
          errors.push(`Please define window.$love.${ namespace }.navHideClass as a string`);
        } else if (!window.$love[namespace].doneScrollingAfter || typeof window.$love[namespace].doneScrollingAfter !== 'number') {
          isValid = false;
          errors.push(`Please define window.$love.${ namespace }.doneScrollingAfter as a number`);
        }

        return { errors: errors, isValid: isValid };
      },
      action = function () {
        var scrollTop = 0,
            timeout = null,
            lastScrollTop = 0,
            isScrolling = false,
            config = window.$love[namespace],
            nav = document.getElementById(config.navId);
      
        if (nav) {
          window.addEventListener('scroll', function () {
            if (timeout) window.clearTimeout(timeout);
      
            if (!isScrolling) {
              scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
              if (scrollTop > lastScrollTop) { // downscroll
                nav.classList.add(config.navHideClass);
              } else { // upscroll
                nav.classList.remove(config.navHideClass);
              }
      
              isScrolling = true;
              lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // for mobile or negative scrolling
            }
      
            window.setTimeout(function () {
              isScrolling = false;
            }, config.doneScrollingAfter);
          }, false);
        } else {
          throw `The id ${ config.navId } was not found on any elements`;
        }
      };

  response = validate();

  if (response.isValid) document.addEventListener('DOMContentLoaded', action);
  else throw response.errors.toString();
}());
