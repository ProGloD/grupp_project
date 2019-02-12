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
    this.title = "New list";
    title.value = this.title;
    title.addEventListener("click", this.resetTitle);
    title.addEventListener("blur", this.changeTitle);
    topBar.appendChild(title);

    // Remove button
    let remove = document.createElement("button");
    remove.classList.add("material-icons");
    remove.classList.add("list__header__removeList");
    remove.setAttribute("title", "Remove list");
    remove.textContent = "clear";
    remove.addEventListener("click", function() {
      main.removeChild(list);
      lists.splice(lists.indexOf(list), 1);
    });
    topBar.appendChild(remove);

    // Note viewer
    let listView = document.createElement("div");
    listView.classList.add("list__main");
    listView.ondragover = function(e) {
      e.stopPropagation();
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

    let colors = ["#ffffff", "#C70039", "#F08080", "#008080", "#F9AA33", "#C0C0C0"];

    for (let color of colors) {
      let colorContainer = document.createElement("label");
      colorContainer.classList.add("menu__colorPicker__container");

      let bgcolor = document.createElement("input");
      bgcolor.classList.add("container__color");
      bgcolor.type = "radio";
      bgcolor.name = "color" + note.id;
      bgcolor.value = color;
      if (color === "#ffffff") {
        bgcolor.checked = "checked";
      }
      bgcolor.addEventListener("click", function() {
        note.style.backgroundColor = this.value;
        title.style.backgroundColor = this.value;
        desc.style.backgroundColor = "#ffffff80";
        console.log(desc.style.backgroundColor);
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

    /*    move note     */
    let move = document.createElement("div");
    move.classList.add("menu__move");

    let text = document.createElement("span");
    text.classList.add("menu__move__text");
    text.textContent = "Move to:"
    move.appendChild(text);

    let moveTo = document.createElement("select");
    moveTo.classList.add("menu__move__moveTo");

    menu.addEventListener("click", function() {
      moveTo.innerHTML = "";
      for (let list of lists) {
        let option = document.createElement("option");
        option.textContent = list.title;
        option.value = list.id;

        moveTo.appendChild(option);
      }
    });

    moveTo.addEventListener("change", function() {
      document.querySelector("#" + this.value + " .list__main").appendChild(note);
    });
    move.appendChild(moveTo);

    dropDownmenu.appendChild(move);
    /*    end move note     */

    /*    remove note     */
    let removeNote = document.createElement("button");
    removeNote.classList.add("material-icons");
    removeNote.classList.add("menu__removeNote");
    removeNote.title = "Remove note";
    removeNote.textContent = "delete";
    removeNote.addEventListener("click", function() {
      note.parentNode.removeChild(note);
    });;

    dropDownmenu.appendChild(removeNote);
    /*    end remove note     */


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
