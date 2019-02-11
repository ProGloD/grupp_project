export default {
  init: function(id, header, description, date) {
    let note = document.createElement("div");
    note.classList.add("note");
    note.id = id;

    note.appendChild(header);
    note.appendChild(description);
    note.appendChild(date);

    return note;
  }
};