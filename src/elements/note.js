export default {
  init: function(id) {
    let note = document.createElement("div");
    note.classList.add("note");
    note.id = id;

    return note;
  }
};