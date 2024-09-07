const randomMessageButton = document.getElementById("message-button");
const messageOutput = document.getElementById("message-output");
const catAttackButton = document.getElementById("cat-attack-button");

randomMessageButton.addEventListener("click", function () {
   messageOutput.innerHTML = message_generator(firstPart, secondPart, thirdPart);
});

catAttackButton.addEventListener("click", function () {
   window.open("./Projekt/cat_attack.html", "Cat Attack", "width=device-width, resizable=yes");
});

let colorTheme = "first";
$("#invert-colors").click(function () {
   if (colorTheme === "first") {
      $(":root").css({
         "--primary-color": "#F8EDE3",
         "--secondary-color": "#798777",
         "--primary-contrast-color": "#798777",
         "--secondary-contrast-color": "#F8EDE3",
         "--font-color": "#F8EDE3",
         "--link-color": "#F8EDE3",
         "--button-color": "#F8EDE3",
         "--accent-color": "#596358",
      });
      colorTheme = "second";
   } else {
      $(":root").css({
         "--primary-color": "#798777",
         "--secondary-color": "#F8EDE3",
         "--primary-contrast-color": "#F8EDE3",
         "--secondary-contrast-color": "#798777",
         "--accent-color": "#BDD2B6",
         "--button-color": "#596358",
         "--font-color": "#596358",
         "--link-color": "#596358",
      });
      colorTheme = "first";
   }
});

$(".click-text-about").click(function () {
   if ($(".toggle-text-about").css("display") === "none") {
      $(".toggle-text-about").fadeIn(300).css("display", "block");
   } else {
      $(".toggle-text-about").fadeOut(300);
   }
});

$(".click-text-portfolio-1").click(function () {
   let isMobile = window.matchMedia("(max-width: 480px)").matches; //Next to do!

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
   $(".toggle-text-portfolio-2").toggle();
   $(".toggle-text-portfolio-1").hide();
});
