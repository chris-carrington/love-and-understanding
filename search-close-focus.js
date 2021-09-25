(function bindSearchCloseFocus () {
  var input = document.getElementById('header-search-input'),
      close = document.getElementById('header-search-close'),
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

  if (input && close) {
    setCloseVisibility();
    bindInputListener();
    bindCloseListener();
  }
})();
