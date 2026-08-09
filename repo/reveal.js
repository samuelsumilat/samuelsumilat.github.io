function reveal() {
  var reveals = document.querySelectorAll(".top, .bottom, .right, .left, .fade-in"); 

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150; 

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("on");
    } else {
      reveals[i].classList.remove("on");
    }
  }
} 

window.addEventListener("scroll", reveal);
