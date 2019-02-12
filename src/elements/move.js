export default {
  init: function(className) {
    let move = document.createElement("div");
    move.classList.add(className);
    move.textContent = "Move to: ";

    return move;
  }
};