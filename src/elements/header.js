export default {
  init: function(className) {
    let header = document.createElement("div");
    header.classList.add(className);

    return header;
  }
};