/*
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).

L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:

con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
*/


/* Step:
  1. Generare i quadrati in base alla difficoltà selezionata dall'utente
  2. Creare le 16 bombe.
  3. Creare la logica di fine partita
*/


// 1. Generare i quadrati in base alla difficoltà selezionata dall'utente

const startButton = document.getElementById("play");
startButton.addEventListener("click", play);

const container = document.querySelector(".container")
const winCondition = 10; //numero di slot che servono per vincere


function play() {
  container.innerHTML = ""; //reset del contenitore
  generatedBombs.length = 0; //reset dell'array
  listaCelleCliccate.length = 0 //reset punteggio giocatore

  const difficult = document.getElementById("difficult").value;
  const levels = [100,81,49];
  const cellNumbers = levels[difficult]; //numero delle celle da generare
  
  console.log(winCondition);

  const square = creaQuadrati(cellNumbers);

  const bombs = creaBombe(cellNumbers);

}

function creaQuadrati(cellNumbers) {

  for (let x = 1; x <= cellNumbers; x++) { //generiamo le celle in funzione della modalità selezionata dall'utente
    const square = document.createElement("div");
    square.classList.add("square-"+cellNumbers)
    square.innerHTML = x;
    square.myNumber = x;
    
    square.addEventListener("click", cellaCliccata);
    container.append(square);

  }

}

let listaCelleCliccate = [];

// Funzione per colorare le celle
function cellaCliccata(){

  this.classList.add("clicked");
  console.log(this);
  console.log(this.myNumber);


  if (generatedBombs.includes(this.myNumber) ) {
    this.classList.remove("clicked");
    this.classList.add("bomb");
    
    console.log("è nell'array");

    stopGame(listaCelleCliccate);
  } else {
    console.log("non è nell'array");

    // listaCelleCliccate.push(this.myNumber);
    if (!listaCelleCliccate.includes(this.myNumber)) { //contatore punteggio player
      listaCelleCliccate.push(this.myNumber)
    }

    if (listaCelleCliccate.length === winCondition) { //condizione per fermare la partita e vincere il gioco
      container.innerHTML +=
      `
      <div class="result-container" text-center">
        <p>Hai azzeccato ${winCondition} slot e hai vinto. Gioca ancora!</p>
      </div>
      `;
    }

    console.log("questi sono i numeri che hai azzeccato:", listaCelleCliccate);
  }
}


// 2. Creare le 16 bombe.

let generatedBombs = [];

function creaBombe(cellNumbers) {

  while (generatedBombs.length < 16) {
    let bombs;
    bombs = generateUniqueRandomNumber(cellNumbers,1);

    if (!generatedBombs.includes(bombs)) {
      generatedBombs.push(bombs)
    }

    console.log(generatedBombs);

  }

  return generatedBombs;
}


function generateUniqueRandomNumber(max, min){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}



// 3. Funzione che ferma il gioco

function stopGame(listaCelleCliccate){
  console.log("stop Game");
  console.log(listaCelleCliccate.length);
  container.innerHTML +=
  `
  <div class="result-container" text-center">
    <p>Hai beccato una bomba e hai perso. Il tuo punteggio: ${listaCelleCliccate.length} slot su 10.</p>
  </div>
  `;

  // while (generatedBombs.length < 16) {
  //   generatedBombs[0].classList.add("bomb");
  // }

}