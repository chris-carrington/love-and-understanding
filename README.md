# Aloha!

## Welcome to Love and Understanding's Helper Functions
* Webflow is not required to use these helper functions
* The `window.$love` configuration object must be defined **before** helper functions are injected

### How to create the configuration object

```
window.$love = {

  searchCloseFocus: { // Available options for ./helpers/search-close-focus.js
    inputId: 'header-search-input', // Input element DOM ID
    closeId: 'header-search-close', // Close element DOM ID
  },

  navScrollToggle: { // // Available options for ./helpers/nav-scroll-toggle.js
    navId: 'navbar', // Nav DOM ID
    navHideClass: 'nav-hide', // Class to apply to nav to hide it
    doneScrollingAfter: 1000, // How many ms after scrolling we'll say scrolling is done
  },

};
```

### How to inject a helper function

```
<script src="https://ghcdn.rawgit.org/chris-carrington/love-and-understanding/:release/helpers/:helper-file-name.js"></script>
```