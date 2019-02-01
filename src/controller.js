import viewHeader from "./view/viewHeader";
import themeChanger from "./view/viewThemeChanger";
import addList from "./view/viewAddList";
import viewList from "./view/viewList";

const body = document.body;
const header = document.querySelector("header");
const main = document.querySelector("main");

// render header text
viewHeader.init(header);

// render theme changer button
themeChanger.init(body, function() {
  // on click switch between dark and light mode
  body.classList.toggle("dark");
  this.classList.toggle("theme--dark");

  if (body.classList.contains("dark")) {
    this.textContent = "brightness_5";
  } else {
    this.textContent = "brightness_3";
  }
});

// render add list button
addList.init(body, function() {
  // on click create list
  viewList.init(main, function(e) {
    let list = e.target.parentNode.parentNode;
    viewList.removeList(main, list);
  });
});