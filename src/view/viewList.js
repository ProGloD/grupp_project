export default function(element, note) {
  /*    list element     */
  let list = document.createElement("div");
  list.classList.add("list");

  /*    list header element     */
  let header = document.createElement("div");
  header.classList.add("list__header");

  /*    list title     */
  let title = document.createElement("h2");
  title.classList.add("list__header__title");
  title.textContent = "New list";
  // text content backup
  let backup = "";
  // on click make title editable
  title.onclick = function() {
    backup = title.textContent;
    title.contentEditable = true;
    // select all text in title
    let range = document.createRange();
    range.selectNodeContents(title);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };
  // remove editable when no longer on focus
  title.onblur = function() {
    if (!title.textContent) {
      title.textContent = backup;
    }
    title.contentEditable = false;
  };
  header.appendChild(title);
  /*    end list title     */

  /*    remove list     */
  // on click removes list
  let remove = document.createElement("button");
  remove.classList.add("material-icons");
  remove.classList.add("list__header__removeList");
  remove.setAttribute("title", "Remove list");
  remove.textContent = "clear";
  remove.onclick = function() {
    element.removeChild(list);
  }
  header.appendChild(remove);
  /*    end remove list     */

  list.appendChild(header);
  /*    end list header element     */

  /*    list main element     */
  let main = document.createElement("div");
  main.classList.add("list__main");
  list.appendChild(main);
  /*    end list main element*/

  /*    list add new note element     */
  let newNote = document.createElement("button");
  newNote.classList.add("material-icons");
  newNote.classList.add("list__addNote");
  newNote.setAttribute("title", "Add note");
  newNote.textContent = "add";
  newNote.onclick = function() {
    main.appendChild(note());
  }
  list.appendChild(newNote);
  /*     end list new note element     */

  element.appendChild(list);
  /*    end list element     */
};