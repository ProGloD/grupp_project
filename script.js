document.querySelector(".add-list").addEventListener("click", addList);

let allLists = [];

// Create new list
function addList() {
  // List
  let list = document.createElement("div");
  list.classList.add("list");
  document.querySelector("body").appendChild(list);

  // Title
  let title = document.createElement("input");
  title.classList.add("list__title");
  title.value = "Create list";
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
  addIcon.addEventListener("click", addItem);
  addIcon.textContent = "note_add";
  add.appendChild(addIcon);

  let span = document.createElement("span");
  span.classList.add("add_note_text")
  span.textContent = "Add note";
  add.appendChild(span);

};

// remove list
function removeList(e) {
  let button = e.target;
  let parent = button.parentNode.parentNode;
  parent.parentNode.removeChild(parent);
}

function addItem() {
  let button = e.target;
  console.log("working");

}
