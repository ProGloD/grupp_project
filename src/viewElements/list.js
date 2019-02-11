export default function(element, newList, newNote) {
  /*    list element     */
  let list = document.createElement("div");
  list.classList.add("list");
  list.id = newList.id;

  /*    list header element     */
  let header = document.createElement("div");
  header.classList.add("list__header");

  /*    list titel     */
  let title = document.createElement("h2");
  title.classList.add("list__header__title");
  title.textContent = newList.titel;
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
  let addNote = document.createElement("button");
  addNote.classList.add("material-icons");
  addNote.classList.add("list__addNote");
  addNote.setAttribute("title", "Add note");
  addNote.textContent = "add";
  addNote.onclick = function() {
    main.appendChild(newNote);
  }
  list.appendChild(addNote);
  /*     end list new note element     */

  return list;
  /*    end list element     */
};