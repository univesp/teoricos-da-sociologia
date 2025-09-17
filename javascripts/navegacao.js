let Bt1 = document.querySelector("#bt1");
// let Bt2 = document.querySelector("#bt2");

// let cor = document.querySelector("body");

let tela1 = document.querySelector("#tela-1");
let tela2 = document.querySelector("#tela-2");
let tela3 = document.querySelector("#tela-3");

let iniciarButton = document.getElementById('iniciar-button-2');
let continuarButton = document.getElementById('continuar-button');


iniciarButton.addEventListener("click", function () {
   tela1.style.display = "none";
   tela2.style.display = "block";
   continuarButton.style.display = "block";
   iniciarButton.style.display="none"
   $(window).scrollTop(0);
});

continuarButton.addEventListener("click", function () {
  tela2.style.display = "none";
  tela3.style.display = "flex";
  continuarButton.style.display = "none";
});








function alternativa() {
  let bt2 = document.getElementById("bt2");
  bt2.style.display = "flex";
}


