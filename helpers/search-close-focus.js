(function () {
  var validationResponse,
      configNamespace = 'searchCloseFocus',
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
          } else if (!config.inputId || typeof config.inputId !== 'string') {
            isValid = false;
            errors.push(`Please define window.$love.${ configNamespace }.inputId as a string`);
          } else if (!config.closeId || typeof config.closeId !== 'string') {
            isValid = false;
            errors.push(`Please define window.$love.${ configNamespace }.closeId as a string`);
          }
        }

        return { errors: errors, isValid: isValid };
      },
      action = function () {
        var config = window.$love[configNamespace],
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
          throw `The id ${ config.inputId } was not found on any elements`;
        } else if (!close) {
          throw `The id ${ config.closeId } was not found on any elements`;
        } else {
          setCloseVisibility();
          bindInputListener();
          bindCloseListener();
        }
      };

  validationResponse = validateConfig();

  if (validationResponse.isValid) document.addEventListener('DOMContentLoaded', action);
  else throw validationResponse.errors.toString();
})();
