import colorPicker from "./elements/colorPicker";
import description from "./elements/description";
import mainHeader from "./elements/mainHeader";
import selector from "./elements/selector";
import header from "./elements/header";
import button from "./elements/button";
import title from "./elements/title";
import main from "./elements/main";
import move from "./elements/move";
import menu from "./elements/menu";
import date from "./elements/date";
import List from "./elements/list";
import Note from "./elements/note";

import model from "./model";
import view from "./view";

const body = document.body;
const mainEl = document.querySelector("main");

// render header text
view.render(document.querySelector("header"), [mainHeader.init()]);

// render themeChanger and addList buttons
view.render(body, [button.init("brightness_3", "theme", changeTheme), button.init("playlist_add", "add-list", addNewList)]);

function changeTheme() {
  body.classList.toggle("dark");
  this.classList.toggle("theme--dark");

  if (body.classList.contains("dark")) {
    this.textContent = "brightness_5";
  } else {
    this.textContent = "brightness_3";
  }
}

// render list
function addNewList() {
  let newList = model.createList();
  let list = List.init(newList.id);

  let listHeader = header.init("list__header");
  let listTitle = title.init(newList, "list__header__title");
  let removeList = button.init("clear", "list__header__removeList", onRemoveListClick);

  view.render(listHeader, [listTitle, removeList]);

  let listMain = main.init("list__main", onListMainDragOver, onListMainDrop);
  let addNote = button.init("add", "list__addNote", createNote)

  view.render(list, [listHeader, listMain, addNote]);
  view.render(mainEl, [list]);

  function onListMainDragOver(e) {
    e.preventDefault();
  }

  function onListMainDrop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    view.render(e.target, [document.querySelector("#" + data)]);
  }

  function onRemoveListClick() {
    mainEl.removeChild(list);
    model.removeList(newList);
  }

  // render note
  function createNote() {
    let newNote = model.createNote();
    let note = Note.init(newNote.id, onNoteDragStart, onNoteDrop);

    let noteHeader = header.init("note__header");
    let noteTitle = title.init(newNote, "note__header__title");
    let noteMenuButton = button.init("more_vert", "note__header__menu", onMenuButtonClick);

    let noteMenu = menu.init("menu", onMenuMouseout);
    let colors = ["#C0C0C0", "#A52A2A", "#F08080", "#008080", "#F9AA33", "#ffd8b1"];
    let bgcolors = colorPicker.init("menu__colorPicker", newNote.id, colors, onColorChoose);

    let moveNote = move.init("menu__move");
    let moveTo = selector.init("menu__move__moveTo", onMoveToChange);

    view.render(moveNote, [moveTo]);

    let removeNote = button.init("delete", "menu__removeNote", onRemoveNoteClick);

    view.render(noteMenu, [bgcolors, moveNote, removeNote]);
    view.render(noteHeader, [noteTitle, noteMenuButton, noteMenu]);

    let noteDesc = description.init("note__desc");
    let noteDate = date.init("note__date");


    view.render(note, [noteHeader, noteDesc, noteDate]);
    view.render(listMain, [note]);

    function onNoteDragStart(e) {
      e.dataTransfer.setData("text/plain", e.target.id);
    }

    function onNoteDrop(e) {
      e.stopPropagation();
      let data = e.dataTransfer.getData("text");
      let el = document.querySelector("#" + data);
      if (this.nextSibling) {
        this.parentNode.insertBefore(el, this.nextSibling);
      } else {
        view.render(this.parentNode, [el]);
      }
    }

    function onMenuButtonClick(e) {
      if (!noteMenu.classList.contains("show")) {
        noteMenu.classList.add("show");
      }

      noteMenu.style.left = e.clientX + "px";
      noteMenu.style.top = e.clientY + "px";

      moveTo.innerHTML = "";
      let defaultOp = document.createElement("option");
      defaultOp.classList.add("default");
      defaultOp.textContent = "--Select--";
      view.render(moveTo, [defaultOp]);

      for (let list of model.getAllLists()) {
        let option = document.createElement("option");
        option.textContent = list.title;
        option.value = list.id;

        view.render(moveTo, [option]);
      }
    }

    function onMenuMouseout(e) {
      let child = noteMenu.contains(e.toElement);
      if (!child) {
        this.classList.toggle("show");
      }
    }

    function onColorChoose() {
      note.style.backgroundColor = this.value;
      noteDesc.style.backgroundColor = "#ffffff80";
    }

    function onMoveToChange() {
      if (this.value) {
        view.render(document.querySelector("#" + this.value + " .list__main"), [note]);
      }
    }

    function onRemoveNoteClick() {
      note.parentNode.removeChild(note);
    }
  }
}