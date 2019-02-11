export default function(newNote) {
  let note = document.createElement("div");
  note.classList.add("note");
  note.id = newNote.id;

  return note;
};