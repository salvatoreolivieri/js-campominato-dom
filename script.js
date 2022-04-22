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

function play() {
  container.innerHTML = ""; //reset del contenitore

  const difficult = document.getElementById("difficult").value;
  const levels = [100,81,49];
  const cellNumbers = levels[difficult]; //numero delle celle da generare

  creaQuadrati(cellNumbers);
  
}

function creaQuadrati(cellNumbers) {

  for (let x = 1; x <= cellNumbers; x++) {
    const square = document.createElement("div");
    square.classList.add("square-"+cellNumbers)
    square.innerHTML = x;
    container.append(square);

  }

}