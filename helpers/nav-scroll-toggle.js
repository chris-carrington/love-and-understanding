(function () {
  var validationResponse,
      configNamespace = 'navScrollToggle',
      validateConfig = function () {
        var config,
            errors = [],
            isValid = true;

        if (!window.$love || typeof window.$love !== 'object') {
          isValid = false;
          errors.push('Please define window.$love as an object');
        } else {
          config = window.$love[configNamespace];

          if (!config || typeof config !== 'object') {
            isValid = false;
            errors.push(`Please define window.$love.${ configNamespace } as an object`);
          } else if (!config.navId || typeof config.navId !== 'string') {
            isValid = false;
            errors.push(`Please define window.$love.${ configNamespace }.navId as a string`);
          } else if (!config.navHideClass || typeof config.navHideClass !== 'string') {
            isValid = false;
            errors.push(`Please define window.$love.${ configNamespace }.navHideClass as a string`);
          } else if (!config.doneScrollingAfter || typeof config.doneScrollingAfter !== 'number') {
            isValid = false;
            errors.push(`Please define window.$love.${ configNamespace }.doneScrollingAfter as a number`);
          }
        }

        return { errors: errors, isValid: isValid };
      },
      action = function () {
        var scrollTop = 0,
            timeout = null,
            lastScrollTop = 0,
            isTouchDown = false,
            isScrolling = false,
            config = window.$love[configNamespace],
            nav = document.getElementById(config.navId);

        if (nav) {
          window.addEventListener('touchstart', function () {
            isTouchDown = true;
          }, false);

          window.addEventListener('touchend', function () {
            isTouchDown = false;
          }, false);

          window.addEventListener('scroll', function () {
            if (timeout) window.clearTimeout(timeout);

            if (!isScrolling) {
              scrollTop = window.pageYOffset || document.documentElement.scrollTop;

              if (scrollTop > lastScrollTop) nav.classList.add(config.navHideClass); // scrolling down
              else if (!isTouchDown) nav.classList.remove(config.navHideClass); // scrolling up and not touching down 
      
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
  else throw String(validationResponse.errors);
}());
