export default {
  init: function(className, title, button, menu) {
    let header = document.createElement("div");
    header.classList.add(className);

    header.appendChild(title);
    header.appendChild(button);
    header.appendChild(menu);

    return header;
  }
};