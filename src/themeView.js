export default {
  changeTheme: () => {
    document.querySelector("body").classList.toggle("dark");
    this.classList.toggle("theme--dark");

    if (body.classList.contains("dark")) {
      this.textContent = "brightness_5";
    } else {
      this.textContent = "brightness_3";
    }
  }
};