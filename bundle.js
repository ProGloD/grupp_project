(function () {
  'use strict';

  var mainHeader = {
    init: function() {
      let header = document.createElement("h1");
      header.textContent = "qNOTE";

      return header;
    }
  };

  var header = {
    init: function(className, title, button) {
      let header = document.createElement("div");
      header.classList.add(className);
      header.appendChild(title);
      header.appendChild(button);

      return header;
    }
  };

  var main = {
    init: function(className) {
      let main = document.createElement("div");
      main.classList.add(className);

      return main;
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
    init: function(text, className) {
      let title = document.createElement("span");
      title.classList.add(className);
      title.textContent = text;

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

        title.contentEditable = false;
      };

      return title;
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
    init: function(id, header, main, addNote) {
      let list = document.createElement("div");
      list.classList.add("list");
      list.id = id;

      list.appendChild(header);
      list.appendChild(main);
      list.appendChild(addNote);

      return list;
    }
  };

  var Note = {
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
    }
  };

  var view = {
    render: function(to, el) {
      to.appendChild(el);
    }
  };

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
    let addNote = button.init("add", "list__addNote", createNote);

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

}());
