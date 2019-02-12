export default {
  init: function(className, onDragOver, onDrop) {
    let main = document.createElement("div");
    main.classList.add(className);
    main.addEventListener("dragover", onDragOver);
    main.addEventListener("drop", onDrop);

    return main;
  }
};