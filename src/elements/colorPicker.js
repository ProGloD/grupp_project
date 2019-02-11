export default {
  init: function(className, id, colors, onClick) {
    let colorPicker = document.createElement("div");
    colorPicker.classList.add(className);

    for (let color of colors) {
      let colorContainer = document.createElement("label");
      colorContainer.classList.add(className + "__container");

      let bgcolor = document.createElement("input");
      bgcolor.classList.add("container__color");
      bgcolor.type = "radio";
      bgcolor.name = "color" + id;
      bgcolor.value = color;
      if (color === "#ffffff") {
        bgcolor.checked = "checked";
      }
      bgcolor.addEventListener("click", onClick);

      colorContainer.appendChild(bgcolor);

      let checkmark = document.createElement("span");
      checkmark.classList.add("container__checkmark");
      checkmark.style.backgroundColor = color;
      colorContainer.appendChild(checkmark);

      colorPicker.appendChild(colorContainer);
    }

    return colorPicker;
  }
};