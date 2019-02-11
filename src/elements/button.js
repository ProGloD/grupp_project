export default {
  init: function(text, className, onClick) {
    let button = document.createElement("button");
    button.classList.add("material-icons");
    button.classList.add(className);
    button.textContent = text;
    button.addEventListener("click", onClick);

    return button;
  }
};