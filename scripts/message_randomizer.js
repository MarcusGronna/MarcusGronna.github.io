// Message generator
const firstPart = ["When you feel",
    "Whenever you face",
    "If you ever find yourself",
    "In times of",
    "When you're dealing with",
    "If you encounter",
    "Whenever you experience",
    "In moments of",
    "When life presents",
    "If you're feeling"]
const secondPart = ["overwhelmed or stressed",
    "a challenging situation",
    "in need of support",
    "uncertainty or doubt",
    "a difficult period",
    "a tough obstacle",
    "a moment of weakness",
    "confused or frustrated",
    "unexpected difficulties",
    "anxious or afraid"]
const thirdPart = ["remember that you have the strength to overcome.",
    "know that brighter days are ahead.",
    "reach out and connect with those who care.",
    "trust in your ability to navigate through it.",
    "take it one step at a time.",
    "believe in your inner resilience.",
    "know that you are not alone.",
    "take a deep breath and find your calm.",
    "remember that you are capable of great things.",
    "hold on to hope and keep moving forward."]

//   function to randomize an index from array for array
  const randomizer = arr => Math.floor(Math.random() * arr.length)

  // function to concatenate a string from each array
const message_generator = (firstPart, secondPart, thirdPart) => {
let finalString = firstPart[randomizer(firstPart)] + ' '
finalString += secondPart[randomizer(secondPart)] + ', '
finalString += thirdPart[randomizer(thirdPart)]
    return finalString
}

console.log(message_generator(firstPart, secondPart, thirdPart))
console.log(message_generator(firstPart, secondPart, thirdPart))
console.log(message_generator(firstPart, secondPart, thirdPart))