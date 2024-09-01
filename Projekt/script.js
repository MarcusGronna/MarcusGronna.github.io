/* Marcus Grönnå
   Webbläsarbaserat spel där användaren använder piltangenter för att undvika hinder vilka slumpmässigt trillar ner från toppen.
   Poäng ökar med tiden och användarens chanser att fortsätta minskar då ett hinder kolliderar med användaren */

// INSPO: https://www.youtube.com/watch?v=cuudnyDyWGE&list=PLYElE_rzEw_sowQGjRdvwh9eAEt62d_Eu&index=6

// Hanterar spelarens objekt. Endast en instans
class Player {
   constructor(game) {
      this.game = game; // Refererar till allokering av objektet game
      this.width = 90;
      this.height = 90;
      this.image = document.getElementById("playerImage"); // Hämtar referensen till spelarens bild

      // Centrerar spelarens position i sidled. Utgår från vänster övre hörn varför man vill använda halva bredden
      this.x = this.game.width * 0.5 - this.width * 0.5;
      // Centerar spelarens position i höjdled
      this.y = this.game.height - this.height;

      // Egenskap för att styra hastiget. Hämtas som förändring av position
      this.speed = 10;
      // Egenskap för att initiera antalet liv
      this.lives = 3;
   }
   // Ritar ut spelaren på skärmen.
   draw(context) {
      // Spelarens bild och position
      context.drawImage(this.image, this.x, this.y);
   }

   // Metod som uppdaterar spelarens position
   update() {
      // Kodblock körs om piltangent vänster är nedtryckt. indexOf kollar om arrayen innehåller elementet. Player flyttas till vänster.
      if (this.game.keys.indexOf("ArrowLeft") > -1) this.x -= this.speed;
      // Kodblock körs om piltangent upp är nedtryckt. indexOf kollar om arrayen innehåller elementet. Player flyttas upp.
      if (this.game.keys.indexOf("ArrowUp") > -1) this.y -= this.speed;
      // Kodblock körs om piltangent höger är nedtryckt. indexOf kollar om arrayen innehåller elementet. Player flyttas till höger.
      if (this.game.keys.indexOf("ArrowRight") > -1) this.x += this.speed;
      // Kodblock körs om piltangent ner är nedtryckt. indexOf kollar om arrayen innehåller elementet. Player flyttas ner.
      if (this.game.keys.indexOf("ArrowDown") > -1) this.y += this.speed;

      // Ramar in Player inom canvas.
      if (this.x < 0) this.x = 0; // Hindrar förlyttning utanför vänster.
      else if (this.x > this.game.width - this.width)
         this.x = this.game.width - this.width; // Hindrar förlyttning utanför höger.
      else if (this.y < 0) this.y = 0; // Hindrar förflyttning utanför toppen.
      else if (this.y > this.game.height - this.height) this.y = this.game.height - this.height; // Hindrar förflyttning utanför botten.
   }

   // Metod för att starta om. PLacerar spelaren på startposition och återställer liv.
   restart() {
      this.x = this.game.width * 0.5 - this.width * 0.5;
      this.y = this.game.height - this.height;
      this.lives = 3;
   }
}

// Ritar ut och animerar fiendefigurer samt kollisionskontroll
class Enemy {
   constructor(game) {
      this.game = game; // Referens till klassen Game
      this.width = this.game.enemySize; // Hämtar storlek från klassen Game
      this.height = this.game.enemySize; // Hämtar storlek från klassen Game
      this.image = document.getElementById("enemyImage"); // Hämtar fiendens bild
      this.x = Math.floor(Math.random() * this.game.width); // Slumpad startplats för enemy horisontellt
      this.y = -this.height; // Börjar utanför skärmens topp
      this.speedY = 5; // Hastighet på fiende
      this.markedForDeletion = false; // Används för att radera/filtrera fiende. Annars blir det oändligt många element i arrayen.
   }

   // Metod som ritar ut, uppdaterar position, sätter storlek och kontrollerar kollision
   render(context) {
      if (this.y < 0) this.y += 5; // Snabb entre av fiende
      context.drawImage(this.image, this.x, this.y, this.width, this.height); // Ritar ut bilden för fiender
      this.y += this.speedY; // Skapar förflyttning vertikalt

      // Kontrollerar kollision
      if (this.game.checkCollision(this, this.game.player)) {
         this.markedForDeletion = true;
         this.game.player.lives--; // Minskar antalet liv för spelaren
         if (this.game.player.lives < 1) this.game.gameOver = true; // Spelet över om inga liv kvar
      }

      // Markerar för borttagning vid kontakt med botten.
      if (this.y > this.game.height) this.markedForDeletion = true;
   }
}

/* Övergripande hantering av spelets rendering. 
Mycket går att justera härifrån vilket medgör att det inte behöver göras i respektive klass */
class Game {
   //Använder variabeln canvas (deklarerad i eventlyssnaren för window 'load') som parameter.
   constructor(canvas) {
      this.canvas = canvas; // Konverterar canvas till egenskaper (Properties)
      this.width = this.canvas.width; // Konverterar canvas.width till width
      this.height = this.canvas.height; // Konverterar canvas.height till height
      this.keys = []; // Array för att logga knapptryckningar
      this.player = new Player(this); // Skapar en instans av klassen Player. Skickar Game som argument

      this.enemySize = 0;
      this.enemy = []; // Array för att innehålla objekten enemy
      this.create(); // Kör metoden för att skapa fiender

      // Poäng och kontroll av spelet igång/slut
      this.score = 0;
      this.gameOver = false;

      // Sätter svårighet = gränsvärde för skapande
      this.difficulty = 0.001;

      // Ökar svårighet = sänker gränsvärde för skapande(skapas oftare)
      setInterval(() => {
         this.difficulty += 0.005;
      }, 3000);

      /* Eventlyssnare för att ta emot information om piltangenter. e för event. Arrow-funktion för att göra this. tillgänglig. */
      window.addEventListener("keydown", (e) => {
         if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key); // Lägger till tangent i array om den inte redan existerar. e är tangent.
         if (e.key.toLowerCase() === "r" && this.gameOver) this.restart(); // Startar om spelet. Villkorat att gameOver är true
      });

      // Eventlyssnare för att tömma arrayen keys
      window.addEventListener("keyup", (e) => {
         const index = this.keys.indexOf(e.key); // Ökar läsbarhet av koden. Kan lägga värdet direkt som villkor nedan.
         if (index > -1) this.keys.splice(index, 1); // Tar bort 1 element från array keys
      });
   }

   // Kör viktiga funktioner för spelet/programmet 60 gånger per sekund (eller annan skärmrendering, vanligast med 60hz)
   render(context) {
      this.drawStatusText(context);
      this.player.draw(context); // Kör metoden draw() från klassen player och skickar 2d-renderingen som argument
      this.player.update(); // Kör metoden update() från klassen player

      // Kör metoden render för klassen Enemy för varje skapad fiende. Tar bort element från arrayen enemy
      this.enemy.forEach((enemy) => {
         enemy.render(context);
         this.enemy = this.enemy.filter((object) => !object.markedForDeletion); // Filtrerar bort fienden som kolliderar med spelaren
      });

      // Slumpad körning av metoden create(). Proggresivt ökat körande.
      if (Math.random() < this.difficulty && !this.gameOver) this.create();

      // Ökar poängen för varje rendering så länge gameOver är falskt
      if (!this.gameOver) this.score += 0.01;
   }

   // Skapar nya fiender
   create() {
      // Slumpad storlek - stor/litet hinder
      if (Math.random() < 0.5) {
         this.enemySize = 40;
      } else {
         this.enemySize = 80;
      }
      this.enemy.push(new Enemy(this));
   }

   // Kollisionshanterare. Kontrollerar om två rektanglar kolliderar. https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
   checkCollision(a, b) {
      // Returnerar true om villkoren uppfylls
      return (
         a.x < b.x + b.width && // Kollara om a(vänster övre hörn) är vänster om b(höger övre hörn)
         a.x + a.width > b.x && // Kollar om a(höger övre hörn) är höger om b(vänster övre hörn)
         a.y < b.y + b.height && // Kollar om a(vänster övre hörn) är över b(vänster nedre hörn)
         a.y + a.height > b.y // Kollar om a(vänster nedre hörn) är under b(vänster övre hörn)
      );
   }

   // Metod för att skriva text på canvas
   drawStatusText(context) {
      context.save(); // Sparar canvas egenskaper

      // Adderar skugga till denna text. Ökar kontrast till bakgrund.
      context.shadowOffsetX = 4;
      context.shadowOffsetY = 4;
      context.shadowColor = "black";

      // Skriver ut poäng och liv på skärmen
      context.fillText("Poäng: " + Math.floor(this.score), 20, 40);
      context.fillText("Liv: ", 20, 80);

      // Presenterar liv som staplar
      for (let i = 0; i < this.player.lives; i++) {
         context.fillRect(65 + 15 * i, 55, 7, 25);
      }

      // Skriver ut och ändrar endast denna texts typsnittsinställningar, tack vare save() och restore()
      if (this.gameOver) {
         context.textAlign = "center";
         context.font = "100px Impact";
         context.fillText("GAME OVER!", this.width * 0.5, this.height * 0.5); // Skriver ut text och dess position
         context.font = "20px Impact"; // Ändrar fontstorlek och teckensnitt
         context.fillText(
            "Tryck på R för att starta om!",
            this.width * 0.5,
            this.height * 0.5 + 30
         );
      }

      context.restore(); // Återställer canvas egenskaper till vad de var vid save()
   }

   // Metod för att starta om spelet
   restart() {
      this.player.restart(); // Kör återställning av spelaren
      this.enemy = []; // Nollställer array
      this.score = 0; // Nollställer poäng
      this.gameOver = false;
      this.difficulty = 0.001; // Återställer svårighet
   }
}

// Låter alla resurser hämtas innan informationen presenteras för klient
window.addEventListener("load", function () {
   const canvas = document.getElementById("canvas1"); // Hämtar canvas-elementet från html-dokumentet
   const ctx = canvas.getContext("2d"); // Sätter upp miljö för 2d-rendering i canvas - https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
   canvas.width = 600; // Sätter bredd på canvas, element och rityta
   canvas.height = 800; // Sätter höjd på canvas, element och rityta
   ctx.fillStyle = "white"; // Sätter färg på 2d-element
   ctx.font = "30px Impact"; // Sätter stil av typsnitt

   const game = new Game(canvas); // Skapar en instans av Game och skickar canvas som argument

   // Funktion som loopar 2D-renderingen. Normalt 60hz
   function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Raderar gammal 'färg' för att bibehålla storleken på objekten/instanserna. Testa att kommentera bort för att måla på canvas.
      game.render(ctx); // Kör metoden render från klassen Game med 2d-context som argument
      requestAnimationFrame(animate); // Kör metoden requestAnimationFrame. Argumentet skapar en loop då den anropar sig själv. https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
   }
   animate(); // Triggar första loopen.
});
