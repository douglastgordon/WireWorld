const elementBuilders = require('./element_builders.js');

let mainWidth;
let mainHeight;
let keydown = null;

let intervalTrigger = null;
let binaryIntervalTrigger = null;
let ticks = 0;
let mainBoard = document.getElementById('board');
let exampleBoard = document.getElementById('example-board');

let mouseDown = false;
document.body.onmousedown = function() {
    mouseDown = true;
};
document.body.onmouseup = function() {
    mouseDown = false;
};


const makeBoard = (board, height = mainHeight, width = mainWidth) => {
  mainHeight = height;
  mainWidth = width;
  board.innerHTML = '';
  for (let r = 0; r < height; r++){
    let row = document.createElement('tr');
    row.className = r;
    for (let c = 0; c < width; c++){
      let cell = document.createElement('td');
      cell.id = `${r}-${c}`;
      cell.className = "empty";
      cell.dataset.neighbors = 0;
      cell.addEventListener("mouseover", changeState);
      cell.addEventListener("click", changeState);
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  cycle();
};

const getCells = (height = mainHeight, width = mainWidth) => {
  let cells = [];
  for(let r = 0; r < height; r++){
    for(let c = 0; c < width; c++ ){
      let currentCell = document.getElementById(`${r}-${c}`);
      cells.push(currentCell);
    }
  }
  return cells;
};

const iterateOverCells = (cells, func) => {
  cells.forEach( (cell) => {
    func(cell);
  });
};



const handleKeyDown = (ev) => {
  keydown = ev.key;
};

const handleKeyUp = (ev) => {
  keydown = null;
};


const changeState = (e) => {

  if (mouseDown || e.type === "click") {
    let key = keydown;
    keydown = null;
    if (key) {
      switch (key) {
        case "t":
          elementBuilders.makeTimer(e.currentTarget);
          break;
        case "n":
          elementBuilders.makeNot(e.currentTarget);
          break;
        case "o":
          elementBuilders.makeOr(e.currentTarget);
          break;
        case "x":
          elementBuilders.makeExOr(e.currentTarget);
          break;
        case "a":
          elementBuilders.makeAnd(e.currentTarget);
          break;
        case "f":
          elementBuilders.makeFlipFlop(e.currentTarget);
          break;
        case "b":
          elementBuilders.makeFullAdder(e.currentTarget);
          break;
        case "q":
          elementBuilders.makeFullAdder(e.currentTarget);
          break;
        case "d":
          elementBuilders.makeDiode(e.currentTarget);
          break;
      }
    } else {
      switch (e.currentTarget.className) {
        case "empty":
          e.currentTarget.className = "conductor";
          break;
        case "conductor":
          e.currentTarget.className = "electron-head";
          break;
        case "electron-head":
          e.currentTarget.className = "electron-tail";
          break;
        case "electron-tail":
          e.currentTarget.className = "empty";
          break;
        default:
      }
    }
    addCounters(e.currentTarget);
}
};



const tick = (cell) => {
  switch (cell.className) {
    case "empty":
      break;
    case "electron-head":
      cell.className = "electron-tail";
      break;
    case "electron-tail":
      cell.className = "conductor";
      break;
    case "conductor":
      if (cell.dataset.neighbors == 2 || cell.dataset.neighbors == 1) {
        cell.className = "electron-head";
      }
      break;
    }
  };

const setNeighborNum = (cell, height = mainHeight, width = mainWidth) => {
  let coordinates = cell.id.split("-");
  let row = parseInt(coordinates[0]);
  let column = parseInt(coordinates[1]);
  let neighborCount = 0;
  for (let x = row - 1; x <= row + 1; x++){
    for (let y = column - 1; y <= column + 1; y++){
      if (x < 0 || y < 0 || x >= height || y >= width) { continue; }
      let neighbor = document.getElementById(`${x}-${y}`);
      if (neighbor.className === "electron-head") {
        neighborCount++;
      }
    }
  }
  cell.dataset.neighbors = neighborCount;
};

const cycle = () => {
  let cells = getCells();
  iterateOverCells(cells, setNeighborNum);
  iterateOverCells(cells, tick);
  iterateOverCells(cells, addCounters);
  ticks++;
  if (ticks === 75){
    ticks = 0;
    clearInterval(binaryIntervalTrigger);
  }
};

const addCounters = (cell) => {
  if (cell.title === "counter" || cell.title === "up-counter"){
    if (cell.className === "electron-head"){
      elementBuilders.makeOne(cell);
    } else {
      elementBuilders.makeZero(cell);
    }
  }
};

const runBinaryCounter = () => {
  binaryIntervalTrigger = setInterval(cycle, 100);
};


const play = () => {
  stop();
  intervalTrigger = setInterval(cycle, 200);
};

const stop = () => {
  clearInterval(intervalTrigger);
  clearInterval(binaryIntervalTrigger);
};

const reset = () => {
  clearInterval(intervalTrigger);
  clearInterval(binaryIntervalTrigger);
  let cells = getCells();
  cells.forEach((cell) => {
    cell.className = "empty";
    cell.title = "";
    cell.dataset.neighbors = 0;
  });
};


const openModal = () => {
  modal.style.display = "block";
  changeModalContent();
};

const closeModal = (e) => {
  if (e.target == modal || e.target.className === "close") {
    modal.style.display = "none";
    mainHeight = 40;
    mainWidth = 75;
    stop();
    exampleBoard.innerHTML = '';
    makeBoard(mainBoard, 40, 75);
  }
};

const nextModal = () => {
  if (modal.id == 11){
    return;
  } else {
    modal.id++;
  }
  changeModalContent();
};

const previousModal = () =>{

    modal.id--;

  changeModalContent();
};

const changeModalContent = () => {
  stop();
  nextButton.style.display = "inline-block";
  previousButton.style.display = "inline-block";
  modalText2.style.display = "none";
  modalText2.style.display = "none";
  ruleList.style.display = "none";
  buttons.style.display = "block";
  runBinaryButton.style.display = "none";
  modalContent.style.width = "400px";
  switch (modal.id) {
    case "0":
      buttons.style.display = "none";
      modalTitle.innerHTML = "Welcome";
      modalText.innerHTML = "Welcome to wireworld, a sandbox where a few simple rules and some ingenuity can be used to create infinitely complex machines. But first, let's start with the basics. Click next to continue.";
      previousButton.style.display = "none";
      makeBoard(exampleBoard, 0, 0);

      break;
    case "1":
      buttons.style.display = "none";
      modalTitle.innerHTML = "The Grid";
      modalText.innerHTML = "Wireworld is a grid of cells. Each cell can have one of four states: empty (black), wire (pale yellow), electron-head (red) and electron-tail (blue). Click on the cells below to cycle them through the different states.";
      makeBoard(exampleBoard, 5, 10);
      elementBuilders.modal1();
      break;
    case "2":
      modalTitle.innerHTML = "The Rules";
      modalText.innerHTML = "The rules of wireworld are simple. Every cycle, a cell can change it's state depending on it's own state and the states of its neighbors. There are four rules that decide a cell's state:";
      ruleList.style.display = "block";
      modalText2.style.display = "block";
      modalText2.innerHTML = "Play around with the controls below and watch the pulse (electron head and tail) flow across the screen.";
      makeBoard(exampleBoard, 5, 10);
      elementBuilders.modal2();
      break;
    case "3":
      modalTitle.innerHTML = "Timers";
      modalText.innerHTML = "Now that you have the basics down, let's start building cool stuff. Below is a timer. It sends a pulse down the wire every second.";
      buttons.style.display = "block";
      modalText2.style.display = "block";
      modalText2.innerHTML = "When you make a closed loop like this, a pulse will flow around it continuously. Try to understand this shape, because it's used in every example from now on!";
      makeBoard(exampleBoard, 5, 12);
      elementBuilders.modal3();
      play();
      break;
    case "4":
      modalTitle.innerHTML = "Diodes";
      modalText.innerHTML = "Diodes are components that only let electricity flow in one direction. See how the pulses can flow through the top diode when the timer is on the left, but can't flow through the same diode when the timer is on the right.";
      buttons.style.display = "block";
      makeBoard(exampleBoard, 9, 18);
      elementBuilders.modal4();
      play();
      break;
    case "5":
      modalTitle.innerHTML = "NOT Gate";
      modalText.innerHTML = "You can use wireworld to build logic gates. Let's start with the simplest one: the NOT gate. A NOT gate inverts its input signal. This means when it receives no input, it will continuously emit pulses. When a NOT gate receives a pulse as an input, however, it will invert the signal and not emit a pulse.";
      modalText2.style.display = "block";
      modalText2.innerHTML = "The top NOT gate below receives no input and continuously fires pulses at a rate of 1/600ms. The bottom NOT gate receives an input pulse at the at a rate that matches its own firing rate, so it never emits a pulse."
      makeBoard(exampleBoard, 15, 18);
      elementBuilders.modal5();
      play();
      break;
    case "6":
      modalTitle.innerHTML = "AND Gate";
      modalText.innerHTML = "AND gates have 2 inputs and 1 output. An AND gate will only emit a pulse from its output when a pulse enters its 2 inputs at the exact same time.";
      modalText2.style.display = "block";

      modalText2.innerHTML = "The top AND gate is receiving pulses at the exact same time and so emits pulses on the right. Bottom AND gate only receives pulses in one of its inputs and so doesn't emit any pulses. Stop the play, and cycle through it to better understand exactly how the AND gate works.";
      makeBoard(exampleBoard, 24, 34);
      resizeBoard(11);
      elementBuilders.modal6();
      play();
      break;
    case "7":
      modalTitle.innerHTML = "OR Gate";
      modalText.innerHTML = "Like AND gates, OR gates have 2 inputs and 1 output. An OR gate will emit a pulse if it receives a pulse from one input, the other, or both. The OR gate below is only receiving pulses in its top input but it still emits pulses. Remember that this wouldn't work for an AND gate.";
      makeBoard(exampleBoard, 9, 20);
      elementBuilders.modal7();
      play();
      break;
    case "8":
      modalTitle.innerHTML = "XOR Gate";
      modalText.innerHTML = "XOR gates only emit a pulse when the receive a pulse in one gate or the other, but not both. The XOR gate below won't ever emit a pulse, because two timers are feeding pulses into it's inputs in sync.";
      makeBoard(exampleBoard, 11, 24);
      resizeBoard(16);
      elementBuilders.modal8();
      play();
      break;
    case "9":
      modalTitle.innerHTML = "Flip Flop";
      modalText.innerHTML = "Flip-flops are used to store state. Make an electron head (red) and tail (blue) on the bottom input and press play to turn the flip-flop 'on'. When on, the flip-flop will keep emitting pulses until a precisely timed pulse comes into the top input (another head and tail). Try it out for yourself with the flip-flop below.";
      makeBoard(exampleBoard, 13, 24);
      resizeBoard(16);
      elementBuilders.modal9();
      break;
    case "10":
      ticks = 0;
      runBinaryButton.style.display = "inline-block";
      modalContent.style.width = "95%";
      modalTitle.innerHTML = "Binary Adder";
      modalText.innerHTML = "Now that you know the basic building blocks, it's time to show you what you can actually build with them. Below is a binary adder, press 'Run Binary Counter' it to see it add 0100011 (35) to 00000111 (7) to make 01001010 (42). Reset it and try it with your own numbers.";
      modalText2.innerHTML = "This might look pretty complicated but it's built using the basic components you already know.";
      makeBoard(exampleBoard, 20, 120);
      resizeBoard(13);
      elementBuilders.modal10();
      break;
    case "11":
    nextButton.style.display = "none";

    modalTitle.innerHTML = "The Sandbox";
    modalText.innerHTML = "As you've seen, from just a few simple rules wireworld can become very complicated. You could build a clock, a prime number generator, or even a version of wireworld - the possibilities are literally endless. For ideas or better understanding, check out Karl Scherer's site here and Mark Owen's here.";
    modalText2.innerHTML = "Now I'm going to push you out of the nest and let you build some stuff for yourself. I've included some hotkeys so you can easily make the components I've already shown you. Now go forth and create!";
    makeBoard(exampleBoard, 13, 24);
    resizeBoard(16);
  }

};

const resizeBoard = (size) => {
  let cells = getCells();
  cells.forEach((cell)=>{
    cell.style.width = `${size}px`;
    cell.style.height = `${size}px`;
  });
};





//controls
document.getElementsByClassName("tick")[0].addEventListener("click", cycle);
const playButton = document.getElementsByClassName("play")[0];
playButton.addEventListener("click", play);
document.getElementsByClassName("stop")[0].addEventListener("click", stop);
document.getElementsByClassName("reset")[1].addEventListener("click", reset);
const runBinaryButton = document.getElementsByClassName("binary")[0];
runBinaryButton.addEventListener("click", runBinaryCounter);

document.getElementsByClassName("tick")[1].addEventListener("click", cycle);
document.getElementsByClassName("play")[1].addEventListener("click", play);
document.getElementsByClassName("stop")[1].addEventListener("click", stop);
document.getElementsByClassName("reset")[0].addEventListener("click", changeModalContent);
document.getElementsByClassName("binary")[1].addEventListener("click", runBinaryCounter);
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');

//placing elements
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

//modals
const modal = document.getElementsByClassName('modal')[0];
const modalContent = document.getElementsByClassName('modal-content')[0];
const modalText = document.getElementsByClassName('modal-text')[0];
const modalText2 = document.getElementsByClassName('modal-text2')[0];
const modalTitle = document.getElementsByClassName('modal-title')[0];
const ruleList = document.getElementsByClassName('modal-list')[0];
const buttons = document.getElementsByClassName('buttons')[0];
document.getElementById("open-modal").addEventListener("click", openModal);
document.getElementsByClassName("close")[0].addEventListener("click", closeModal);
window.addEventListener("click", closeModal);
document.getElementById("next").addEventListener("click", nextModal);
document.getElementById("previous").addEventListener("click", previousModal);


makeBoard(mainBoard, 40, 75);
openModal();
