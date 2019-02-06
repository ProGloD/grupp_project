const body = document.querySelector("body");
const main = document.querySelector("main");
let listCounter = 0;
let noteCouner = 0;

let lists = [];

function List(defaultTitle) {
  this.id = defaultTitle.toLowerCase();
  this.defaultTitle = defaultTitle;
  this.title = "";
  this.create = function() {
    // List
    let list = document.createElement("div");
    list.classList.add("list");
    list.id = this.id;
    main.appendChild(list);

    // Lists top bar
    const topBar = document.createElement("div");
    topBar.classList.add("list__header");
    list.appendChild(topBar);

    // Title
    let title = document.createElement("input");
    title.classList.add("list__header__title");
    title.value = "New list";
    title.addEventListener("click", this.resetTitle);
    title.addEventListener("blur", this.changeTitle);
    topBar.appendChild(title);

    // Remove button
    let remove = document.createElement("button");
    remove.classList.add("material-icons");
    remove.classList.add("list__header__removeList");
    remove.setAttribute("title", "Remove list");
    remove.textContent = "clear";
    remove.addEventListener("click", this.removeList);
    topBar.appendChild(remove);

    // Note viewer
    let listView = document.createElement("div");
    listView.classList.add("list__main");
    listView.ondragover = function(e) {
      e.preventDefault();
    };
    listView.ondrop = function(e) {
      e.preventDefault();
      let data = e.dataTransfer.getData("text");
      e.target.appendChild(document.querySelector("#" + data));
    };
    list.appendChild(listView);

    // Add item button
    let add = document.createElement("button");
    add.classList.add("material-icons");
    add.classList.add("list__addNote");
    add.setAttribute("title", "Add note");
    add.textContent = "add";
    add.addEventListener("click", this.addNote);
    list.appendChild(add);
  };
  this.resetTitle = (e) => {
    let title = e.target;
    if (title.value === "New list") {
      title.value = "";
    }
  };
  this.changeTitle = (e) => {
    let title = e.target;
    if (!title.value) {
      title.value = this.defaultTitle;
    }
    this.title = title.value;
  };

  this.removeList = (e) => {
    main.removeChild(e.target.parentNode.parentNode);
    lists.splice(lists.indexOf(this), 1);
  };

  this.addNote = (e) => {
    let listView = document.querySelector("#" + this.id + " .list__main");
    let note = new Note("Note" + (noteCouner++));

    listView.appendChild(note.create());
  };
}

function Note(defaultTitle) {
  this.defaultTitle = defaultTitle;
  this.title = "New note";
  this.create = () => {
    let note = document.createElement("div");
    note.draggable = true;
    note.id = "note" + noteCouner;
    note.ondragstart = function(e) {
      e.dataTransfer.setData("text", e.target.id);
    }
    note.classList.add("note");

    let topBar = document.createElement("div");
    topBar.classList.add("note__header");
    note.appendChild(topBar);

    let title = document.createElement("input");
    title.classList.add("note__header__title");
    title.placeholder = "Note title";
    title.value = this.title;
    topBar.appendChild(title);

    let menu = document.createElement("button");
    menu.classList.add("material-icons");
    menu.classList.add("note__header__menu");
    menu.textContent = "more_vert";
    topBar.appendChild(menu);

    let dropDownmenu = document.createElement("div");
    dropDownmenu.classList.add("menu");
    dropDownmenu.addEventListener("mouseout", function(e) {
      let child = dropDownmenu.contains(e.toElement);
      if (!child) {
        this.classList.toggle("show");
      }
    });
    topBar.appendChild(dropDownmenu);

    menu.addEventListener("click", (e) => {
      if (!dropDownmenu.classList.contains("show")) {
        dropDownmenu.classList.add("show");
      }

      dropDownmenu.style.left = e.clientX + "px";
      dropDownmenu.style.top = e.clientY + "px";
    });

    let desc = document.createElement("textarea");
    desc.classList.add("note__desc");
    desc.placeholder = "Description...";
    note.appendChild(desc);

    /*    color picker     */
    let colorPicker = document.createElement("div");
    colorPicker.classList.add("menu__colorPicker");

    let colors = ["white", "lightgreen", "yellow", "orange", "lightblue", "lightpink"];

    for (let color of colors) {
      let colorContainer = document.createElement("label");
      colorContainer.classList.add("menu__colorPicker__container");

      let bgcolor = document.createElement("input");
      bgcolor.classList.add("container__color");
      bgcolor.type = "radio";
      bgcolor.name = "color" + note.id;
      bgcolor.value = color;
      if (color === "white") {
        bgcolor.checked = "checked";
      }
      bgcolor.addEventListener("click", function() {
        note.style.backgroundColor = this.value;
        title.style.backgroundColor = this.value;
        desc.style.backgroundColor = this.value;
      });

      colorContainer.appendChild(bgcolor);

      let checkmark = document.createElement("span");
      checkmark.classList.add("container__checkmark");
      checkmark.style.backgroundColor = color;
      colorContainer.appendChild(checkmark);

      colorPicker.appendChild(colorContainer);
    }

    dropDownmenu.appendChild(colorPicker);
    /*    end color picker     */


    let d = document.createElement("p");
    d.classList.add("note__date");
    d.textContent = this.date();
    note.appendChild(d);

    return note;
  };

  this.date = () => {
    let d = new Date();
    let time = "created " + d.toLocaleString();

    return time;
  };
}



// Change theme mode
document.querySelector(".theme").addEventListener("click", themeChanger);

function themeChanger() {
  body.classList.toggle("dark");
  this.classList.toggle("theme--dark");

  if (body.classList.contains("dark")) {
    this.textContent = "brightness_5";
  } else {
    this.textContent = "brightness_3";
  }
}

// Create new list
document.querySelector(".add-list").addEventListener("click", addList);

// Create new list
function addList() {
  listCounter++;

  let list = new List("List" + listCounter);
  list.create();

  lists.push(list);
};

// remove note
function removeNote() {}

// move note to another list
function moveNote() {}