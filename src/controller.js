import viewHeader from "./viewElements/header";
import themeChanger from "./viewElements/themeChanger";
import addList from "./viewElements/addList";
import List from "./viewElements/list";
import Note from "./viewElements/note";
import model from "./model";
import view from "./view";

const body = document.body;
const header = document.querySelector("header");
const main = document.querySelector("main");

// render header text
view.render(header, viewHeader.init());

// render theme changer button
view.render(body, themeChanger.init(function() {
  // on click switch between dark and light mode
  body.classList.toggle("dark");
  this.classList.toggle("theme--dark");

  if (body.classList.contains("dark")) {
    this.textContent = "brightness_5";
  } else {
    this.textContent = "brightness_3";
  }
}));

// render add list button
view.render(body, addList.init(function() {
  // on click create list
  view.render(main, new List(main, model.createList(), new Note(model.createNote())));
}));