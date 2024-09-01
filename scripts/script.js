const randomMessageButton = document.getElementById("message-button");
const messageOutput = document.getElementById("message-output");
const catAttackButton = document.getElementById("cat-attack-button");

randomMessageButton.addEventListener("click", function () {
   messageOutput.innerHTML = message_generator(firstPart, secondPart, thirdPart);
});

catAttackButton.addEventListener("click", function () {
   window.open("./Projekt/cat_attack.html", "Cat Attack", "width=device-width, resizable=yes");
});
