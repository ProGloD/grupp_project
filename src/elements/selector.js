export default {
  init: function(className, onChange) {
    let selector = document.createElement("select");
    selector.classList.add(className);
    selector.addEventListener("change", onChange);

    return selector;
  }
};