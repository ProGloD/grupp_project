export default {
  init: function(className) {
    let move = document.createElement("div");
    move.classList.add(className);

    return move;
  }
};