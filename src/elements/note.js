export default {
  init: function(id, onDragStart, onDrop) {
    let note = document.createElement("div");
    note.classList.add("note");
    note.id = id;
    note.draggable = true;
    note.addEventListener("dragstart", onDragStart);
    note.addEventListener("drop", onDrop);

    return note;
  }
};