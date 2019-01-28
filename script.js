const body = document.querySelector("body");
const main = document.querySelector("main");
let listCounter = 0;

let lists = [];

function List(defaultTitle) {
  this.id = defaultTitle.toLowerCase();
  this.defaultTitle = defaultTitle;
  this.title = "";
  this.notesCount = 0;
  this.create = function() {
    // List
    let list = document.createElement("div");
    list.classList.add("list");
    list.id = this.id;
    main.appendChild(list);

    // Lists top bar
    const topBar = document.createElement("div");
    topBar.classList.add("list__top-bar");
    list.appendChild(topBar);

    // Title
    let title = document.createElement("input");
    title.classList.add("list__top-bar__title");
    title.value = "New list";
    title.addEventListener("click", this.resetTitle);
    title.addEventListener("blur", this.changeTitle);
    topBar.appendChild(title);

    // Remove button
    let remove = document.createElement("button");
    remove.classList.add("material-icons");
    remove.classList.add("list__top-bar__remove");
    remove.setAttribute("title", "Remove list");
    remove.textContent = "clear";
    remove.addEventListener("click", this.removeList);
    topBar.appendChild(remove);

    // Note viewer
    let listView = document.createElement("div");
    listView.classList.add("list__view");
    list.appendChild(listView);

    // Add item button
    let add = document.createElement("button");
    add.classList.add("material-icons");
    add.classList.add("list__add-note");
    add.setAttribute("title", "Add note");
    add.textContent = "add";
    add.setAttribute("title", "Add note");
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
    let listView = document.querySelector("#" + this.id + " .list__view");
    let note = new Note("Note" + (this.notesCount++));

    listView.appendChild(note.create());
  };
}

function Note(defaultTitle) {
  this.defaultTitle = defaultTitle;
  this.title = "New note";
  this.create = () => {
    let note = document.createElement("div");
    note.classList.add("note");

    let topBar = document.createElement("div");
    topBar.classList.add("note__top-bar");
    note.appendChild(topBar);

    let title = document.createElement("input");
    title.classList.add("note__top-bar__title");
    title.placeholder = "Note title"
    title.value = this.title;
    topBar.appendChild(title);

    let menu = document.createElement("button");
    menu.classList.add("material-icons");
    menu.classList.add("note__top-bar__menu");
    menu.textContent = "more_vert";
    topBar.appendChild(menu);

    let desc = document.createElement("textarea");
    desc.classList.add("note__desc");
    desc.placeholder = "Description...";
    note.appendChild(desc);

    let d = document.createElement("p");
    d.classList.add("note__date");
    d.textContent = this.date();
    note.appendChild(d);

    return note;
  };

  this.date = () => {
    let d = new Date();
    let time = "created " + d.getHours() + ":" + d.getMinutes() + " " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

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

// create note menu
function noteMenu() {}

// remove note
function removeNote() {}

// move note to another list
function moveNote() {}

// color picker for note background
function colorPicker() {}