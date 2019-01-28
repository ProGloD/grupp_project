(function() {
  'use strict';

  var themeView = {
    changeTheme: () => {
      document.querySelector("body").classList.toggle("dark");
      this.classList.toggle("theme--dark");

      if (body.classList.contains("dark")) {
        this.textContent = "brightness_5";
      } else {
        this.textContent = "brightness_3";
      }
    }
  };

  // Theme controller
  document.querySelector(".theme").addEventListener("click", themeView.changeTheme());

}());