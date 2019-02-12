(function () {
  'use strict';

  var model = {
    listCount: 0,
    noteCount: 0,
    allLists: [],
    createList: function() {
      this.listCount++;
      let list = {
        id: "list" + this.listCount,
        title: "New list"
      };

      this.allLists.push(list);
      return list;
    },
    createNote: function() {
      this.noteCount++;
      let note = {
        id: "note" + this.noteCount,
        title: "New note"
      };

      return note;
    },
    getAllLists: function() {
      return this.allLists;
    },
    removeList: function(list) {
      this.allLists.splice(this.allLists.indexOf(list), 1);
    }
  };

  var view = {
    render: function(to, arr) {
      for (let el of arr) {
        to.appendChild(el);
      }
    }
  };

  var mainHeader = {
    init: function() {
      let header = document.createElement("h1");
      header.textContent = "qNOTE";

      return header;
    }
  };

  var colorPicker = {
    init: function(className, id, colors, onClick) {
      let colorPicker = document.createElement("div");
      colorPicker.classList.add(className);

      for (let color of colors) {
        let colorContainer = document.createElement("label");
        colorContainer.classList.add(className + "__container");

        let bgcolor = document.createElement("input");
        bgcolor.classList.add("container__color");
        bgcolor.type = "radio";
        bgcolor.name = "color" + id;
        bgcolor.value = color;
        if (color === "#ffffff") {
          bgcolor.checked = "checked";
        }
        bgcolor.addEventListener("click", onClick);

        colorContainer.appendChild(bgcolor);

        let checkmark = document.createElement("span");
        checkmark.classList.add("container__checkmark");
        checkmark.style.backgroundColor = color;
        colorContainer.appendChild(checkmark);

        colorPicker.appendChild(colorContainer);
      }

      return colorPicker;
    }
  };

  var header = {
    init: function(className) {
      let header = document.createElement("div");
      header.classList.add(className);

      return header;
    }
  };

  var main = {
    init: function(className, onDragOver, onDrop) {
      let main = document.createElement("div");
      main.classList.add(className);
      main.addEventListener("dragover", onDragOver);
      main.addEventListener("drop", onDrop);

      return main;
    }
  };

  var move = {
    init: function(className) {
      let move = document.createElement("div");
      move.classList.add(className);
      move.textContent = "Move to: ";

      return move;
    }
  };

  var selector = {
    init: function(className, onChange) {
      let selector = document.createElement("select");
      selector.classList.add(className);
      selector.addEventListener("change", onChange);

      return selector;
    }
  };

  var button = {
    init: function(text, className, onClick) {
      let button = document.createElement("button");
      button.classList.add("material-icons");
      button.classList.add(className);
      button.textContent = text;
      button.addEventListener("click", onClick);

      return button;
    }
  };

  var title = {
    init: function(el, className) {
      let title = document.createElement("span");
      title.classList.add(className);
      title.textContent = el.title;

      // text content backup
      let backup = "";

      // on click make title editable
      title.onclick = function() {
        backup = title.textContent;
        title.contentEditable = true;

        // select all text in title
        let range = document.createRange();
        range.selectNodeContents(title);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      };

      // remove editable when no longer on focus
      title.onblur = function() {

        // if title is empty put revious back
        if (!title.textContent) {
          title.textContent = backup;
        }

        el.title = title.textContent;
        title.contentEditable = false;
      };

      return title;
    }
  };

  var menu = {
    init: function(className, onMouseout) {
      let menu = document.createElement("div");
      menu.classList.add(className);
      menu.addEventListener("mouseout", onMouseout);

      return menu;
    }
  };

  var description = {
    init: function(className) {
      let desc = document.createElement("textarea");
      desc.classList.add(className);
      desc.placeholder = "Description...";

      return desc;
    }
  };

  var date = {
    init: function(className) {
      let date = document.createElement("p");
      date.classList.add(className);
      date.textContent = "created " + new Date().toLocaleString();

      return date;
    }
  };

  var List = {
    init: function(id) {
      let list = document.createElement("div");
      list.classList.add("list");
      list.id = id;

      return list;
    }
  };

  var Note = {
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

  function addNewList() {
    let newList = model.createList();
    let list = List.init(newList.id);

    let listHeader = header.init("list__header");

    let listTitle = title.init(newList, "list__header__title");
    let removeList = button.init("clear", "list__header__removeList", onRemoveListClick);

    view.render(listHeader, [listTitle, removeList]);

    let listMain = main.init("list__main", onListMainDragOver, onListMainDrop);
    let addNote = button.init("add", "list__addNote", createNote);

    // render in list elements
    view.render(list, [listHeader, listMain, addNote]);

    // render list
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

    function createNote() {
      let newNote = model.createNote();
      let note = Note.init(newNote.id, onNoteDragStart, onNoteDrop);

      let noteHeader = header.init("note__header");

      let noteTitle = title.init(newNote, "note__header__title");
      let noteMenuButton = button.init("more_vert", "note__header__menu", onMenuButtonClick);
      let noteMenu = menu.init("menu", onMenuMouseout);

      let colors = ["#ffffff", "#C70039", "#F08080", "#008080", "#F9AA33", "#C0C0C0"];
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

}());
