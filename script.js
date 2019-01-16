document.querySelector("#add-list").addEventListener("click", addList);

let allLists = [];

function addList() {
  let list = document.createElement("div");
  list.classList.add("list");
  document.querySelector("body").appendChild(list);

let title = document.createElement("input");
title.classList.add("list__title");
list.appendChild(title);

let remove = document.createElement("button");
remove.classList.add("list__remove");
list.appendChild(remove);

let removeIcon = document.createElement("i");
removeIcon.classList.add("material-icons");
removeIcon.addEventListener("click", removeList);
removeIcon.textContent = "clear";
remove.appendChild(removeIcon);

let listView = document.createElement("div");
listView.classList.add("list__view");
list.appendChild(listView);

let add = document.createElement("button");
add.classList.add("list__add");
list.appendChild(add);

let addIcon = document.createElement("i");
addIcon.classList.add("material-icons");
addIcon.addEventListener("click", addItem);
addIcon.textContent = "add";
add.appendChild(addIcon);

let span = document.createElement("span");
span.textContent = "Add note";
add.appendChild(span);

};

function removeList(){}

function addItem(){}
