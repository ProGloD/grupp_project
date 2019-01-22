const body = document.querySelector("body");
const main = document.querySelector("main");
let listCounter = 0;

// Change theme mode
const theme = document.querySelector(".theme");
theme.addEventListener("click", themeChanger);

function themeChanger() {
  const themeIcon = document.querySelector(".theme__icon");

  body.classList.toggle("dark");
  theme.classList.toggle("theme--dark");

  if (body.classList.contains("dark")) {
    themeIcon.textContent = "brightness_5";
  } else {
    themeIcon.textContent = "brightness_3";
  }
}

// Create new list
document.querySelector(".add-list").addEventListener("click", addList);

// Create new list
function addList() {
  listCounter++;

  // List
  let list = document.createElement("div");
  list.classList.add("list");
  main.appendChild(list);

  // Title
  let title = document.createElement("input");
  title.classList.add("list__title");
  title.value = "New list";
  title.addEventListener("click", changeListTitle);
  title.addEventListener("blur", checkIfEmpty);
  list.appendChild(title);

  // Remove button
  let remove = document.createElement("button");
  remove.classList.add("list__remove");
  remove.textContent = "X";
  remove.setAttribute("title", "Remove list");
  remove.addEventListener("click", removeList);
  list.appendChild(remove);

  // Note viewer
  let listView = document.createElement("div");
  listView.classList.add("list__view");
  list.appendChild(listView);

  // Add item button
  let add = document.createElement("button");
  add.classList.add("list__add-note");
  add.textContent = "+";
  add.setAttribute("title", "Add note");
  add.addEventListener("click", addNote);
  add.onmouseenter = function() {
    this.textContent = "Add note";
  };
  add.onmouseout = function() {
    this.textContent = "+";
  };
  list.appendChild(add);
};

// remove list
function removeList() {
  main.removeChild(this.parentNode);
}

// change list title

function changeListTitle(e) {
  let title = e.target;
  if (title.value === "New list") {
    title.value = "";
  }
}

function checkIfEmpty(e) {
  let title = e.target;
  if (!title.value) {
    title.value = "List" + listCounter;
  }
}

// create new note
function addNote(e) {}

// create note menu
function noteMenu() {}

// remove note
function removeNote() {}

// move note to another list
function moveNote() {}

// color picker for note background
function colorPicker() {}