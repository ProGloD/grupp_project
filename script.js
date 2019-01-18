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
  let remove = document.createElement("button");
  remove.classList.add("list__remove");
  list.appendChild(remove);

  let removeIcon = document.createElement("i");
  removeIcon.classList.add("material-icons");
  removeIcon.addEventListener("click", removeList);
  removeIcon.textContent = "clear";
  remove.appendChild(removeIcon);

  // Note viewer
  let listView = document.createElement("div");
  listView.classList.add("list__view");
  list.appendChild(listView);

  // Add item button
  let add = document.createElement("button");
  add.classList.add("list__add");
  list.appendChild(add);

  let addIcon = document.createElement("i");
  addIcon.classList.add("material-icons");
  addIcon.addEventListener("click", addNote);
  addIcon.textContent = "add";
  add.appendChild(addIcon);

  let span = document.createElement("span");
  span.textContent = "Add note";
  add.appendChild(span);
};

// remove list
function removeList(e) {
  let button = e.target;
  let parent = button.parentNode.parentNode;
  parent.parentNode.removeChild(parent);
}


function addNote() {}

function noteMenu() {}

function removeNote() {}

function moveNote() {}

function colorPicker() {}