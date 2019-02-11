import mainHeader from "./elements/mainHeader";
import header from "./elements/header";
import headerWithMenu from "./elements/headerWithMenu";
import main from "./elements/main";
import button from "./elements/button";
import title from "./elements/title";
import description from "./elements/description";
import date from "./elements/date";
import List from "./elements/list";
import Note from "./elements/note";
import model from "./model";
import view from "./view";

const body = document.body;
const mainEl = document.querySelector("main");

// render header text
view.render(document.querySelector("header"), mainHeader.init());

// render theme changer button
view.render(body, button.init("brightness_3", "theme", function() {
  // on click switch between dark and light mode
  body.classList.toggle("dark");
  this.classList.toggle("theme--dark");

  if (body.classList.contains("dark")) {
    this.textContent = "brightness_5";
  } else {
    this.textContent = "brightness_3";
  }
}));

// render add list button
view.render(body, button.init("playlist_add", "add-list", function() {
  let newList = model.createList();

  let listTitle = title.init(newList.title, "list__header__title");
  let removeList = button.init("clear", "list__header__removeList", function() {
    mainEl.removeChild(list);
  });

  let listHeader = header.init("list__header", listTitle, removeList);
  let listMain = main.init("list__main");
  let addNote = button.init("add", "list__addNote", createNote)

  let list = new List.init(newList.id, listHeader, listMain, addNote);

  // on click create list
  view.render(mainEl, list);

  function createNote() {
    let newNote = model.createNote();

    let noteTitle = title.init(newNote.title, "note__header__title");
    let noteMenuButton = button.init("more_vert", "note__header__menu", function() {

    });

    let noteHeader = header.init("note__header", noteTitle, noteMenuButton);
    let noteDesc = description.init("note__desc");
    let noteDate = date.init("note__date");

    let note = new Note.init(newNote.id, noteHeader, noteDesc, noteDate);

    view.render(listMain, note);
  }
}));