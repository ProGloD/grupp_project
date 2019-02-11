export default {
  init: function(className, title, button) {
    let header = document.createElement("div");
    header.classList.add(className);
    header.appendChild(title);
    header.appendChild(button);

    return header;
  }
};