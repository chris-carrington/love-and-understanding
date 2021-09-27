(function () {
  var validationResponse,
      configNamespace = 'navScrollToggle',
      validateConfig = function () {
        var errors = [],
            isValid = true;

        if (!window.$love || typeof window.$love !== 'object') {
          isValid = false;
          errors.push('Please define window.$love as an object');
        } else if (!window.$love[configNamespace] || typeof window.$love[configNamespace] !== 'object') {
          isValid = false;
          errors.push(`Please define window.$love.${ configNamespace } as an object`);
        } else if (!window.$love[configNamespace].navId || typeof window.$love[configNamespace].navId !== 'string') {
          isValid = false;
          errors.push(`Please define window.$love.${ configNamespace }.navId as a string`);
        } else if (!window.$love[configNamespace].navHideClass || typeof window.$love[configNamespace].navHideClass !== 'string') {
          isValid = false;
          errors.push(`Please define window.$love.${ configNamespace }.navHideClass as a string`);
        } else if (!window.$love[configNamespace].doneScrollingAfter || typeof window.$love[configNamespace].doneScrollingAfter !== 'number') {
          isValid = false;
          errors.push(`Please define window.$love.${ configNamespace }.doneScrollingAfter as a number`);
        }

        return { errors: errors, isValid: isValid };
      },
      action = function () {
        var scrollTop = 0,
            timeout = null,
            lastScrollTop = 0,
            isScrolling = false,
            config = window.$love[configNamespace],
            nav = document.getElementById(config.navId);

        if (nav) {
          window.addEventListener('scroll', function () {
            if (timeout) window.clearTimeout(timeout);

            if (!isScrolling) {
              scrollTop = window.pageYOffset || document.documentElement.scrollTop;

              if (scrollTop > lastScrollTop) nav.classList.add(config.navHideClass); // downscroll
              else nav.classList.remove(config.navHideClass); // upscroll
      
              isScrolling = true;
              lastScrollTop = scrollTop < 0 ? 0 : scrollTop; // for touch screens w/ bounce / negative scrollTop feature
            }

            window.setTimeout(function () {
              isScrolling = false;
            }, config.doneScrollingAfter);
          }, false);
        } else {
          throw `The id ${ config.navId } was not found on any elements`;
        }
      };

  validationResponse = validateConfig();

  if (validationResponse.isValid) document.addEventListener('DOMContentLoaded', action);
  else throw validationResponse.errors.toString();
}());
