export default {
  init: function(id, header, main, addNote) {
    let list = document.createElement("div");
    list.classList.add("list");
    list.id = id;

    list.appendChild(header);
    list.appendChild(main);
    list.appendChild(addNote);

    return list;
  }
};