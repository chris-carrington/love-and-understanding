(function () {
  var response,
      namespace = 'searchCloseFocus',
      validate = function () {
        var errors = [],
            isValid = true;

        if (!window.$love || typeof window.$love !== 'object') {
          isValid = false;
          errors.push('Please define window.$love as an object');
        } else if (!window.$love[namespace] || typeof window.$love[namespace] !== 'object') {
          isValid = false;
          errors.push(`Please define window.$love.${ namespace } as an object`);
        } else if (!window.$love[namespace].inputId || typeof window.$love[namespace].inputId !== 'string') {
          isValid = false;
          errors.push(`Please define window.$love.${ namespace }.inputId as a string`);
        } else if (!window.$love[namespace].closeId || typeof window.$love[namespace].closeId !== 'string') {
          isValid = false;
          errors.push(`Please define window.$love.${ namespace }.closeId as a string`);
        }

        return { errors: errors, isValid: isValid };
      },
      action = function () {
        var config = $window.$love[namespace],
            input = document.getElementById(config.inputId),
            close = document.getElementById(config.closeId),
            setCloseVisibility = function (value) {
              close.style.display = (value || input.value).length ? 'block' : 'none';
            },
            bindInputListener = function () {
              input.addEventListener('input', function () {
                setCloseVisibility(this.value);
              });
            },
            bindCloseListener = function () {
              close.addEventListener('click', function () {
                input.value = '';
                setCloseVisibility();
                input.focus();
              });
            };

        if (!input) {
          throw `The id ${ config.inputId } was not found on any elements on this page`;
        } else if (!close) {
          throw `The id ${ config.closeId } was not found on any elements on this page`;
        } else {
          setCloseVisibility();
          bindInputListener();
          bindCloseListener();
        }
      };

  response = validate();

  if (response.isValid) action();
  else throw response.errors.toString();
})();
