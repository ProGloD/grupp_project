export default {
  init: function(className) {
    let desc = document.createElement("textarea");
    desc.classList.add(className);
    desc.placeholder = "Description...";

    return desc;
  }
};