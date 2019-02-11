export default {
  init: function(text, className) {
    let title = document.createElement("span");
    title.classList.add(className);
    title.textContent = text;

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

      // if title is empty put revious back
      if (!title.textContent) {
        title.textContent = backup;
      }

      title.contentEditable = false;
    };

    return title;
  }
};