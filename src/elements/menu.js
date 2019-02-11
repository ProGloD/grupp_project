export default {
  init: function(className, arr, onMouseout) {
    let menu = document.createElement("div");
    menu.classList.add(className);
    menu.addEventListener("mouseout", onMouseout);

    for (let el of arr) {
      menu.appendChild(el);
    }

    return menu;
  }
};