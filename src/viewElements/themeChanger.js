export default {
  init: function(onClick) {
    let container = document.createElement("div");
    container.classList.add("container-theme-changer");

    let btn = document.createElement("button");
    btn.classList.add("material-icons");
    btn.classList.add("theme");
    btn.textContent = "brightness_3";
    btn.onclick = onClick;

    container.appendChild(btn);

    return container;
  }
};