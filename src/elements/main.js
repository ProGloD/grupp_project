export default {
  init: function(className) {
    let main = document.createElement("div");
    main.classList.add(className);

    return main;
  }
};