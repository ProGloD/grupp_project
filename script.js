const body = document.querySelector('body')

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
  // List
  let list = document.createElement("div");
  list.classList.add("list");
  body.appendChild(list);

  // Title
  let title = document.createElement("input");
  title.classList.add("list__title");
  title.value = "New list";
  list.appendChild(title);

  // Remove button
  let remove = document.createElement("i");
  remove.classList.add("material-icons");
  remove.classList.add("list__remove");
  remove.addEventListener("click", removeList);
  remove.textContent = "clear";
  list.appendChild(remove);

  // Note viewer
  let listView = document.createElement("div");
  listView.classList.add("list__view");
  list.appendChild(listView);

  // Add item button
  let add = document.createElement("button");
  add.classList.add("list__add-note");
  add.addEventListener("click", addNote);
  list.appendChild(add);

  let addIcon = document.createElement("i");
  addIcon.classList.add("material-icons");
  addIcon.textContent = "add";
  add.appendChild(addIcon);

  let span = document.createElement("span");
  span.classList.add("list__add-note__text");
  span.textContent = "Add note";
  add.appendChild(span);
};

// remove list
function removeList() {
  body.removeChild(this.parentNode);
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