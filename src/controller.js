import model from "./model";
import view from "./view";

import mainHeader from "./elements/mainHeader";
import colorPicker from "./elements/colorPicker";
import header from "./elements/header";
import main from "./elements/main";
import move from "./elements/move";
import button from "./elements/button";
import title from "./elements/title";
import menu from "./elements/menu";
import description from "./elements/description";
import date from "./elements/date";
import List from "./elements/list";
import Note from "./elements/note";

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

  let listHeader = header.init("list__header", [listTitle, removeList]);
  let listMain = main.init("list__main");
  let addNote = button.init("add", "list__addNote", createNote)

  let list = List.init(newList.id, listHeader, listMain, addNote);

  // on click create list
  view.render(mainEl, list);

  function createNote() {
    let newNote = model.createNote();

    let noteTitle = title.init(newNote.title, "note__header__title");
    let noteMenuButton = button.init("more_vert", "note__header__menu", (e) => {
      if (!noteMenu.classList.contains("show")) {
        noteMenu.classList.add("show");
      }

      noteMenu.style.left = e.clientX + "px";
      noteMenu.style.top = e.clientY + "px";
    });


    let colors = ["#ffffff", "#008744", "#0057e7", "#d62d20", "#ffa700", "#7B1FA2"];
    let bgcolors = colorPicker.init("menu__colorPicker", newNote.id, colors, onColorChoose);
    let moveNote = move.init("menu__move");
    let removeNote = button.init("delete", "menu__removeNote", function() {
      listMain.removeChild(note);
    });

    let noteMenu = menu.init("menu", [bgcolors, moveNote, removeNote], function(e) {
      let child = noteMenu.contains(e.toElement);
      if (!child) {
        this.classList.toggle("show");
      }
    });

    let noteHeader = header.init("note__header", [noteTitle, noteMenuButton, noteMenu]);
    let noteDesc = description.init("note__desc");
    let noteDate = date.init("note__date");

    let note = Note.init(newNote.id, noteHeader, noteDesc, noteDate);

    view.render(listMain, note);

    function onMenuClick() {

    }

    function onColorChoose() {
      note.style.backgroundColor = this.value;
      noteDesc.style.backgroundColor = "#ffffff80";
    }
  }
}));