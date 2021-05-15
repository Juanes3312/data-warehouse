let toggler = document.getElementsByClassName("caret");


for (let i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".display-none").classList.toggle("display-block");
    this.classList.toggle("caret-down");
  });
}