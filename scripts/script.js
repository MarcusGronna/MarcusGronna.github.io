const randomMessageButton = document.getElementById("message-button");
const messageOutput = document.getElementById("message-output");
const catAttackButton = document.getElementById("cat-attack-button");

randomMessageButton.addEventListener("click", function () {
   messageOutput.innerHTML = message_generator(firstPart, secondPart, thirdPart);
});

catAttackButton.addEventListener("click", function () {
   window.open("./Projekt/cat_attack.html", "Cat Attack", "width=device-width, resizable=yes");
});

$(".click-text-about").click(function () {
   if ($(".toggle-text-about").css("display") === "none") {
      $(".toggle-text-about").fadeIn(300).css("display", "block");
   } else {
      $(".toggle-text-about").fadeOut(300);
   }
});

$(".click-text-portfolio-1").click(function () {
   // Variable to compare screen size
   let isMobile = window.matchMedia("(max-width: 480px)").matches;

   // Check screen size to choose which paragraph to display
   if (isMobile) {
      if ($(".toggle-text-portfolio-1.small-screen").css("display") === "none") {
         $(".toggle-text-portfolio-1.small-screen").fadeIn(300).css("display", "block");
         $(".toggle-text-portfolio-2").hide();
      } else {
         $(".toggle-text-portfolio-1").fadeOut(300);
      }
   } else {
      if ($(".toggle-text-portfolio-1.normal-screen").css("display") === "none") {
         $(".toggle-text-portfolio-1.normal-screen").fadeIn(300).css("display", "block");
         $(".toggle-text-portfolio-2").hide();
      } else {
         $(".toggle-text-portfolio-1.normal-screen").fadeOut(300);
      }
   }
   // $(".toggle-text-portfolio-1").toggle();
});

$(".click-text-portfolio-2").click(function () {
   // $(".toggle-text-portfolio-2").toggle();
   // $(".toggle-text-portfolio-1").hide();
   if ($(".toggle-text-portfolio-2").css("display") === "none") {
      $(".toggle-text-portfolio-2").fadeIn(300).css("display", "block");
      $(".toggle-text-portfolio-1").hide();
   } else {
      $(".toggle-text-portfolio-2").fadeOut(300);
   }
});
