const randomMessageButton = document.getElementById("message-button");
const messageOutput = document.getElementById("message-output");

randomMessageButton.addEventListener("click", function () {
   messageOutput.innerHTML = message_generator(firstPart, secondPart, thirdPart);
});
