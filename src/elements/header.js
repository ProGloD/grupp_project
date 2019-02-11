export default {
  init: function(className, arr) {
    let header = document.createElement("div");
    header.classList.add(className);
    for (let el of arr) {
      header.appendChild(el);
    }

    return header;
  }
};