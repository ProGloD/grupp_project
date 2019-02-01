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

  var viewList = {
    init: function(element, remove) {
      let list = document.createElement("div");
      list.classList.add("list");

      let header = document.createElement("div");
      header.classList.add("list__header");

      let title = document.createElement("input");
      title.classList.add("list__header__title");
      title.placeholder = "List title...";
      title.value = "New list";
      header.appendChild(title);

      let removeList = document.createElement("button");
      removeList.classList.add("material-icons");
      removeList.classList.add("list__header__removeList");
      removeList.setAttribute("title", "Remove list");
      removeList.textContent = "clear";
      removeList.addEventListener("click", remove);
      header.appendChild(removeList);

      list.appendChild(header);

      let main = document.createElement("div");
      main.classList.add("list__main");

      list.appendChild(main);

      let addNote = document.createElement("button");
      addNote.classList.add("material-icons");
      addNote.classList.add("list__addNote");
      addNote.setAttribute("title", "Add note");
      addNote.textContent = "add";

      list.appendChild(addNote);

      this.list = list;

      element.appendChild(list);
    },

    removeList: function(element, list) {
      element.removeChild(list);
    }
  };

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
    viewList.init(main, function(e) {
      let list = e.target.parentNode.parentNode;
      viewList.removeList(main, list);
    });
  });

}());
