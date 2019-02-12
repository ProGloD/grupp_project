export default {
  init: function(className, onMouseout) {
    let menu = document.createElement("div");
    menu.classList.add(className);
    menu.addEventListener("mouseout", onMouseout);

    return menu;
  }
};