(function () {
  'use strict';

  var viewHeader = {
    init: function(element) {
      let header = document.createElement("h1");
      header.textContent = "qNOTE";

      element.appendChild(header);
    }
  };

  var themeChanger = {
    init: function(element, onClick) {
      let container = document.createElement("div");
      container.classList.add("container-theme-changer");

      let btn = document.createElement("button");
      btn.classList.add("material-icons");
      btn.classList.add("theme");
      btn.textContent = "brightness_3";
      btn.addEventListener("click", onClick);

      container.appendChild(btn);
      element.appendChild(container);
    }
  };

  var addList = {
    init: function(element, onClick) {
      let container = document.createElement("div");
      container.classList.add("container-add-list");

      let btn = document.createElement("button");
      btn.classList.add("material-icons");
      btn.classList.add("add-list");
      btn.textContent = "playlist_add";
      btn.addEventListener("click", onClick);

      container.appendChild(btn);
      element.appendChild(container);
    }
  };

  function List(element, note) {
    /*    list element     */
    let list = document.createElement("div");
    list.classList.add("list");

    /*    list header element     */
    let header = document.createElement("div");
    header.classList.add("list__header");

    /*    list title     */
    let title = document.createElement("h2");
    title.classList.add("list__header__title");
    title.textContent = "New list";
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
    let newNote = document.createElement("button");
    newNote.classList.add("material-icons");
    newNote.classList.add("list__addNote");
    newNote.setAttribute("title", "Add note");
    newNote.textContent = "add";
    newNote.onclick = function() {
      main.appendChild(note());
    };
    list.appendChild(newNote);
    /*     end list new note element     */

    element.appendChild(list);
    /*    end list element     */
  }

  const body = document.body;
  const header = document.querySelector("header");
  const main = document.querySelector("main");

  // render header text
  viewHeader.init(header);

  // render theme changer button
  themeChanger.init(body, function() {
    // on click switch between dark and light mode
    body.classList.toggle("dark");
    this.classList.toggle("theme--dark");

    if (body.classList.contains("dark")) {
      this.textContent = "brightness_5";
    } else {
      this.textContent = "brightness_3";
    }
  });

  // render add list button
  addList.init(body, function() {
    // on click create list
    let list = new List(main, function() {
      return "new note";
    });
  });

}());
