#  Welcome

## Love and Understanding's Open Source Services

### How to create configuration object

```
(function () {
  window.$love = {

    searchCloseFocus: { // ./services/search-close-focus.js
      inputId: 'header-search-input', // Input element DOM ID
      closeId: 'header-search-close', // Close element DOM ID
    },

    navScrollToggle: { // ./services/nav-scroll-toggle.js
      navBarId: 'navbar', // Nav bar DOM ID
      navHideClass: 'nav-hide', // Class to apply to nav bar to hide it
      doneScrollingAfter: 1000, // How many ms after scrolling we'll say scrolling is done
    },

  };
})();
```

### How to inject a service

```
<script src="https://ghcdn.rawgit.org/chris-carrington/love-and-understanding/:release/services/:service"></script>

```

# Important
* Configuration object must be defined before the service is injected
