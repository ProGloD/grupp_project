export default {
  init: function(id) {
    let list = document.createElement("div");
    list.classList.add("list");
    list.id = id;

    return list;
  }
};