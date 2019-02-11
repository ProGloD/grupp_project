export default {
  init: function(onClick) {
    let container = document.createElement("div");
    container.classList.add("container-add-list");

    let btn = document.createElement("button");
    btn.classList.add("material-icons");
    btn.classList.add("add-list");
    btn.textContent = "playlist_add";
    btn.onclick = onClick;

    container.appendChild(btn);

    return container;
  }
};