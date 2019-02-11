(function () {
  'use strict';

  var viewHeader = {
    init: function() {
      let header = document.createElement("h1");
      header.textContent = "qNOTE";

      return header;
    }
  };

  var themeChanger = {
    init: function(onClick) {
      let container = document.createElement("div");
      container.classList.add("container-theme-changer");

      let btn = document.createElement("button");
      btn.classList.add("material-icons");
      btn.classList.add("theme");
      btn.textContent = "brightness_3";
      btn.onclick = onClick;

      container.appendChild(btn);

      return container;
    }
  };

  var addList = {
    init: function(onClick) {
      let container = document.createElement("div");
      container.classList.add("container-add-list");

      let btn = document.createElement("button");
      btn.classList.add("material-icons");
      btn.classList.add("add-list");
      btn.textContent = "playlist_add";
      btn.onclick = onClick;

      container.appendChild(btn);

      return container;
    }
  };

  function List(element, newList, newNote) {
    /*    list element     */
    let list = document.createElement("div");
    list.classList.add("list");
    list.id = newList.id;

    /*    list header element     */
    let header = document.createElement("div");
    header.classList.add("list__header");

    /*    list titel     */
    let title = document.createElement("h2");
    title.classList.add("list__header__title");
    title.textContent = newList.titel;
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
      if (!title.textContent) {
        title.textContent = backup;
      }
      title.contentEditable = false;
    };
    header.appendChild(title);
    /*    end list title     */

    /*    remove list     */
    // on click removes list
    let remove = document.createElement("button");
    remove.classList.add("material-icons");
    remove.classList.add("list__header__removeList");
    remove.setAttribute("title", "Remove list");
    remove.textContent = "clear";
    remove.onclick = function() {
      element.removeChild(list);
    };
    header.appendChild(remove);
    /*    end remove list     */

    list.appendChild(header);
    /*    end list header element     */

    /*    list main element     */
    let main = document.createElement("div");
    main.classList.add("list__main");
    list.appendChild(main);
    /*    end list main element*/

    /*    list add new note element     */
    let addNote = document.createElement("button");
    addNote.classList.add("material-icons");
    addNote.classList.add("list__addNote");
    addNote.setAttribute("title", "Add note");
    addNote.textContent = "add";
    addNote.onclick = function() {

    };
    list.appendChild(addNote);
    /*     end list new note element     */

    return list;
    /*    end list element     */
  }

  var model = {
    listCount: 0,
    allLists: [],
    createList: function() {
      this.listCount++;
      let list = {
        id: "list" + this.listCount,
        titel: "New list"
      };

      this.allLists.push(list);
      return list;
    },
    createNote: function() {

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
  const header = document.querySelector("header");
  const main = document.querySelector("main");

  // render header text
  view.render(header, viewHeader.init());

  // render theme changer button
  view.render(body, themeChanger.init(function() {
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
  view.render(body, addList.init(function() {
    // on click create list
    view.render(main, new List(main, model.createList(), model.createNote()));
  }));

}());
