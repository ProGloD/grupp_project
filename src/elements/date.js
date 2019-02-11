export default {
  init: function(className) {
    let date = document.createElement("p");
    date.classList.add(className);
    date.textContent = "created " + new Date().toLocaleString()

    return date;
  }
};