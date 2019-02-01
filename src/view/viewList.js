export default {
  init: function(element, remove) {
    let list = document.createElement("div");
    list.classList.add("list");

    let header = document.createElement("div")
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