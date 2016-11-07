/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const elementBuilders = __webpack_require__(1);
	
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
	          elementBuilders.makeBinaryAdder(e.currentTarget);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var exports = module.exports = {};
	
	let width = 150;
	let height = 150;
	
	exports.makeTimer = (cell) => {
	  let coordinates = cell.id.split("-");
	  let row = parseInt(coordinates[0]);
	  let col = parseInt(coordinates[1]);
	  if (row <= 0 || row >= height - 1 || col >= width - 5){
	    //do something
	    return;
	  }
	  let ids = [
	    `${row-1}-${col+1}`,
	    `${row-1}-${col+2}`,
	    `${row-1}-${col+3}`,
	    `${row-1}-${col+4}`,
	    `${row}-${col+5}`,
	    `${row+1}-${col+2}`,
	    `${row+1}-${col+3}`,
	    `${row+1}-${col+4}`
	  ];
	  cell.className = "electron-head";
	  document.getElementById(`${row+1}-${col+1}`).className="electron-tail";
	  setState(ids, "conductor");
	};
	
	exports.makeNot = (cell) => {
	  let coordinates = cell.id.split("-");
	  let row = parseInt(coordinates[0]);
	  let col = parseInt(coordinates[1]);
	  if (row <= 0 || row >= height - 1 || col >= width - 5){
	    //do something
	    return;
	  }
	
	  let conductorIds = [
	    `${row}-${col}`,
	    `${row}-${col+1}`,
	
	    `${row-1}-${col+2}`,
	    `${row+3}-${col+2}`,
	
	    `${row-1}-${col+3}`,
	
	    `${row}-${col+4}`,
	    `${row+3}-${col+4}`,
	
	    `${row}-${col+6}`
	  ];
	
	  let headIds = [
	    `${row+1}-${col+3}`,
	    `${row+3}-${col+3}`,
	    `${row+1}-${col+4}`,
	    `${row+1}-${col+5}`,
	  ];
	
	  let tailIds = [
	      `${row+2}-${col+2}`,
	      `${row+2}-${col+4}`,
	      `${row+2}-${col+5}`,
	  ];
	
	  setState(conductorIds, "conductor");
	  setState(headIds, "electron-head");
	  setState(tailIds, "electron-tail");
	
	};
	
	exports.makeOr = (cell) => {
	  let coordinates = cell.id.split("-");
	  let row = parseInt(coordinates[0]);
	  let col = parseInt(coordinates[1]);
	  if (row >= height - 4 || col >= width - 2){
	    //do something
	    return;
	  }
	  let ids = [
	    `${row}-${col}`,
	    `${row+2}-${col}`,
	    `${row+4}-${col}`,
	    `${row+1}-${col+1}`,
	    `${row+2}-${col+1}`,
	    `${row+3}-${col+1}`,
	    `${row+2}-${col+2}`,
	  ];
	  setState(ids, "conductor");
	};
	
	exports.makeExOr = (cell) => {
	  let coordinates = cell.id.split("-");
	  let row = parseInt(coordinates[0]);
	  let col = parseInt(coordinates[1]);
	  if (row >= height - 7 || col >= width - 5){
	    //do something
	    return;
	  }
	  let ids = [
	    `${row}-${col}`,
	    `${row+2}-${col}`,
	    `${row+3}-${col}`,
	    `${row+4}-${col}`,
	    `${row+6}-${col}`,
	    `${row+1}-${col+1}`,
	    `${row+2}-${col+1}`,
	    `${row+4}-${col+1}`,
	    `${row+5}-${col+1}`,
	    `${row+2}-${col+2}`,
	    `${row+4}-${col+2}`,
	    `${row+2}-${col+3}`,
	    `${row+3}-${col+3}`,
	    `${row+4}-${col+3}`,
	    `${row+3}-${col+3}`,
	  ];
	  setState(ids, "conductor");
	};
	
	
	exports.makeAnd = (cell) => {
	  let coordinates = cell.id.split("-");
	  let row = parseInt(coordinates[0]);
	  let col = parseInt(coordinates[1]);
	  if (row <= 3 || row >= height - 6 || col >= width - 17){
	    //do something
	    return;
	  }
	  let ids = [
	    `${row}-${col}`,
	    `${row+2}-${col}`,
	
	    `${row}-${col+1}`,
	    `${row+2}-${col+1}`,
	
	    `${row}-${col+2}`,
	    `${row+2}-${col+2}`,
	
	    `${row-1}-${col+3}`,
	    `${row-2}-${col+3}`,
	    `${row+2}-${col+3}`,
	
	    `${row-3}-${col+4}`,
	    `${row+3}-${col+4}`,
	
	    `${row-2}-${col+5}`,
	    `${row-1}-${col+5}`,
	    `${row}-${col+5}`,
	    `${row+1}-${col+5}`,
	    `${row+4}-${col+5}`,
	
	    `${row+2}-${col+6}`,
	    `${row+5}-${col+6}`,
	
	    `${row+1}-${col+7}`,
	    `${row+2}-${col+7}`,
	    `${row+3}-${col+7}`,
	    `${row+5}-${col+7}`,
	
	    `${row+2}-${col+8}`,
	    `${row+5}-${col+8}`,
	
	    `${row+1}-${col+9}`,
	    `${row+3}-${col+9}`,
	    `${row+5}-${col+9}`,
	
	    `${row}-${col+10}`,
	    `${row+4}-${col+10}`,
	
	    `${row-1}-${col+11}`,
	    `${row}-${col+11}`,
	    `${row+1}-${col+11}`,
	    `${row+4}-${col+11}`,
	
	    `${row}-${col+12}`,
	    `${row+4}-${col+12}`,
	
	    `${row-1}-${col+13}`,
	    `${row+1}-${col+13}`,
	    `${row+2}-${col+13}`,
	    `${row+3}-${col+13}`,
	
	    `${row-1}-${col+14}`,
	    `${row}-${col+15}`,
	    `${row+1}-${col+16}`,
	    `${row+1}-${col+17}`,
	  ];
	  setState(ids, "conductor");
	};
	
	exports.makeFlipFlop = (cell) => {
	  let coordinates = cell.id.split("-");
	  let row = parseInt(coordinates[0]);
	  let col = parseInt(coordinates[1]);
	  if (row >= height - 8 || col >= width - 7){
	    //do something
	    return;
	  }
	  let ids = [
	    `${row}-${col}`,
	    `${row+8}-${col}`,
	
	    `${row}-${col+1}`,
	    `${row+8}-${col+1}`,
	
	    `${row}-${col+2}`,
	    `${row+6}-${col+2}`,
	    `${row+8}-${col+2}`,
	
	    `${row}-${col+3}`,
	    `${row+2}-${col+3}`,
	    `${row+4}-${col+3}`,
	    `${row+5}-${col+3}`,
	    `${row+6}-${col+3}`,
	    `${row+7}-${col+3}`,
	
	    `${row+1}-${col+4}`,
	    `${row+2}-${col+4}`,
	    `${row+3}-${col+4}`,
	    `${row+6}-${col+4}`,
	
	    `${row+2}-${col+5}`,
	    `${row+4}-${col+5}`,
	    `${row+5}-${col+5}`,
	
	    `${row+4}-${col+6}`,
	
	    `${row+4}-${col+7}`,
	
	
	  ];
	  setState(ids, "conductor");
	};
	
	
	exports.makeBinaryAdder = (cell) => {
	  let coordinates = cell.id.split("-");
	  let row = parseInt(coordinates[0]);
	  let col = parseInt(coordinates[1]);
	  if (row <= 2 || row >= height - 12 || col >= width - 20){
	    //do something
	    return;
	  }
	  let conductorIds = [
	    `${row}-${col}`,
	    `${row+2}-${col}`,
	    `${row+3}-${col}`,
	    `${row+4}-${col}`,
	    `${row+6}-${col}`,
	
	    `${row+1}-${col+1}`,
	    `${row+2}-${col+1}`,
	    `${row+4}-${col+1}`,
	    `${row+5}-${col+1}`,
	    `${row+6}-${col+1}`,
	
	    `${row+2}-${col+2}`,
	    `${row+4}-${col+2}`,
	    `${row+7}-${col+2}`,
	    `${row+8}-${col+2}`,
	    `${row+9}-${col+2}`,
	
	    `${row+2}-${col+3}`,
	    `${row+3}-${col+3}`,
	    `${row+4}-${col+3}`,
	    `${row+10}-${col+3}`,
	
	    `${row+3}-${col+4}`,
	    `${row+6}-${col+4}`,
	    `${row+8}-${col+4}`,
	    `${row+9}-${col+4}`,
	
	
	    `${row+1}-${col+5}`,
	    `${row+2}-${col+5}`,
	    `${row+4}-${col+5}`,
	    `${row+5}-${col+5}`,
	    `${row+6}-${col+5}`,
	    `${row+7}-${col+5}`,
	
	    `${row}-${col+6}`,
	    `${row+3}-${col+6}`,
	    `${row+6}-${col+6}`,
	    `${row+8}-${col+6}`,
	    `${row+9}-${col+6}`,
	    `${row+10}-${col+6}`,
	    `${row+11}-${col+6}`,
	
	    `${row}-${col+7}`,
	    `${row+3}-${col+7}`,
	    `${row+12}-${col+7}`,
	
	    `${row}-${col+8}`,
	    `${row+3}-${col+8}`,
	    `${row+12}-${col+8}`,
	
	    `${row}-${col+9}`,
	    `${row+2}-${col+9}`,
	    `${row+3}-${col+9}`,
	    `${row+4}-${col+9}`,
	    `${row+10}-${col+9}`,
	    `${row+12}-${col+9}`,
	
	    `${row-1}-${col+10}`,
	    `${row+3}-${col+10}`,
	    `${row+6}-${col+10}`, // tail
	    `${row+8}-${col+10}`,
	    `${row+9}-${col+10}`,
	    `${row+10}-${col+10}`,
	    `${row+11}-${col+10}`,
	
	    `${row-2}-${col+11}`,
	    `${row+1}-${col+11}`,
	    `${row+2}-${col+11}`,
	    `${row+4}-${col+11}`,
	    `${row+7}-${col+11}`,
	    `${row+10}-${col+11}`,
	
	    `${row-2}-${col+12}`,
	    `${row}-${col+12}`,
	    `${row+2}-${col+12}`,
	    `${row+8}-${col+12}`,
	    `${row+9}-${col+12}`,
	
	    `${row-2}-${col+13}`,
	    `${row}-${col+13}`,
	    `${row+4}-${col+13}`,
	    `${row+8}-${col+13}`,
	
	    `${row-2}-${col+14}`,
	    `${row+6}-${col+14}`,
	    `${row+7}-${col+14}`,
	
	    `${row-2}-${col+15}`,
	    `${row+5}-${col+15}`,
	
	    `${row-2}-${col+16}`,
	    `${row}-${col+16}`,
	    `${row+1}-${col+16}`,
	    `${row+2}-${col+16}`,
	    `${row+4}-${col+16}`,
	
	    `${row-1}-${col+17}`,
	    `${row}-${col+17}`,
	    `${row+2}-${col+17}`,
	    `${row+3}-${col+17}`,
	
	    `${row}-${col+18}`,
	    `${row+2}-${col+18}`,
	
	    `${row}-${col+19}`,
	    `${row+1}-${col+19}`,
	    `${row+2}-${col+19}`,
	
	    `${row+1}-${col+20}`
	  ];
	
	  const headIds = [
	    `${row+6}-${col+10}`,
	    `${row+6}-${col+11}`,
	    `${row+6}-${col+12}`,
	    `${row+2}-${col+13}`
	  ];
	
	  const tailIds = [
	    `${row+5}-${col+11}`,
	    `${row+1}-${col+14}`
	  ];
	  setState(conductorIds, "conductor");
	  setState(tailIds, "electron-tail");
	  setState(headIds, "electron-head");
	};
	
	
	exports.makeFullAdder = (cell) => {
	
	  let coordinates = cell.id.split("-");
	  let row = parseInt(coordinates[0]);
	  let col = parseInt(coordinates[1]);
	  // if (row >= 2 ||row >= height - 12 || col >= width - 20){
	  //   //do something
	  //   return;
	  // }
	  exports.makeBinaryAdder(cell);
	  let conductorIds = [];
	  let counterIds = [];
	  let upCounterIds = [];
	  for (let i = 0; i < 48; i++ ){
	    if ((i + 1) % 6 === 0){
	
	      upCounterIds.push(`${row}-${col-i}`);
	      let el = document.getElementById(`${row}-${col-i}`);
	      el.title = "up-counter";
	      exports.makeZero(el);
	
	      counterIds.push(`${row+6}-${col-i}`);
	      el = document.getElementById(`${row+6}-${col-i}`);
	      exports.makeZero(el);
	
	      counterIds.push(`${row+1}-${col+21+i}`);
	      el = document.getElementById(`${row+1}-${col+21+i}`);
	      exports.makeZero(el);
	
	
	      conductorIds.push(`${row-2}-${col-i}`);
	      conductorIds.push(`${row+8}-${col-i}`);
	      conductorIds.push(`${row-1}-${col+21+i}`);
	    } else {
	      conductorIds.push(`${row}-${col-i}`);
	      conductorIds.push(`${row+6}-${col-i}`);
	      conductorIds.push(`${row+1}-${col+21+i}`);
	    }
	  }
	  setState(conductorIds, "conductor");
	  setState(counterIds, "conductor", "counter");
	  setState(upCounterIds, "conductor", "up-counter");
	
	};
	
	const operators = {
	    '+': function(a, b) { return (a + b); },
	    '-': function(a, b) { return (a - b); }
	};
	
	
	
	exports.makeOne = (cell) => {
	  const coordinates = cell.id.split("-");
	  const row = parseInt(coordinates[0]);
	  const col = parseInt(coordinates[1]);
	  let op = '+';
	  if (cell.title === "up-counter"){
	    op = '-';
	  }
	
	  const conductorIds = [
	    `${operators[op](row,2)}-${col}`,
	    `${operators[op](row,3)}-${col}`,
	    `${operators[op](row,4)}-${col}`,
	    `${operators[op](row,5)}-${col}`,
	  ];
	
	  const emptyIds = [
	    `${operators[op](row,2)}-${col-1}`,
	    `${operators[op](row,5)}-${col-1}`,
	    `${operators[op](row,2)}-${col+1}`,
	    `${operators[op](row,3)}-${col+1}`,
	    `${operators[op](row,4)}-${col+1}`,
	    `${operators[op](row,5)}-${col+1}`
	  ];
	
	  if (cell.title === "up-counter"){
	    conductorIds.push(`${row-4}-${col-1}`);
	    emptyIds.push(`${row-3}-${col-1}`);
	  } else {
	    conductorIds.push(`${row+3}-${col-1}`);
	    emptyIds.push(`${row+4}-${col-1}`);
	  }
	
	  setState(conductorIds, "conductor");
	  setState(emptyIds, "empty");
	};
	
	exports.makeZero = (cell) => {
	  const coordinates = cell.id.split("-");
	  const row = parseInt(coordinates[0]);
	  const col = parseInt(coordinates[1]);
	
	  let op = '+';
	  console.log(cell.title);
	  if (cell.title === "up-counter"){
	    op = '-';
	  }
	
	  const conductorIds = [
	    `${operators[op](row,2)}-${col}`,
	    `${operators[op](row,5)}-${col}`,
	    `${operators[op](row,3)}-${col-1}`,
	    `${operators[op](row,4)}-${col-1}`,
	    `${operators[op](row,3)}-${col+1}`,
	    `${operators[op](row,4)}-${col+1}`,
	  ];
	
	  const emptyIds = [
	    `${operators[op](row,3)}-${col}`,
	    `${operators[op](row,4)}-${col}`,
	    `${operators[op](row,2)}-${col-1}`,
	    `${operators[op](row,5)}-${col-1}`,
	    `${operators[op](row,2)}-${col+1}`,
	    `${operators[op](row,5)}-${col+1}`,
	  ];
	
	  setState(conductorIds, "conductor");
	  setState(emptyIds, "empty");
	};
	
	exports.makeDiode = (cell) => {
	  const coordinates = cell.id.split("-");
	  const row = parseInt(coordinates[0]);
	  const col = parseInt(coordinates[1]);
	  const conductorIds = [
	    `${row}-${col}`,
	    `${row-1}-${col+1}`,
	    `${row}-${col+1}`,
	    `${row+1}-${col+1}`,
	    `${row-1}-${col+2}`,
	    `${row+1}-${col+2}`,
	    `${row}-${col+3}`
	  ];
	  setState(conductorIds, "conductor");
	};
	
	exports.modal1 = () => {
	
	  const conductorIds = [
	    "2-2",
	    "2-3",
	    "2-6",
	    "2-7",
	  ];
	
	  const headIds = [
	    "2-4"
	  ];
	
	  const tailIds = [
	    "2-5"
	  ];
	
	  setState(conductorIds, "conductor");
	  setState(headIds, "electron-head");
	  setState(tailIds, "electron-tail");
	};
	
	exports.modal2 = () => {
	
	  const conductorIds = [
	    "2-2",
	    "2-3",
	    "2-4",
	    "2-5",
	    "2-6",
	    "2-7",
	    "2-8",
	    "2-9",
	  ];
	  const headIds = [
	    "2-1"
	  ];
	  const tailIds = [
	    "2-0"
	  ];
	  setState(conductorIds, "conductor");
	  setState(headIds, "electron-head");
	  setState(tailIds, "electron-tail");
	};
	
	exports.modal3 = () => {
	
	  exports.makeTimer(document.getElementById("2-1"));
	  const conductorIds = [
	    "2-7",
	    "2-8",
	    "2-9",
	    "2-10",
	    "2-11"
	  ];
	
	  setState(conductorIds, "conductor");
	};
	
	exports.modal4 = () => {
	
	  exports.makeTimer(document.getElementById("2-1"));
	  exports.makeTimer(document.getElementById("6-11"));
	  exports.makeDiode(document.getElementById("2-7"));
	  exports.makeDiode(document.getElementById("6-7"));
	
	  const conductorIds = [
	    "2-11",
	    "2-12",
	    "2-13",
	    "2-14",
	    "2-15",
	    "2-16",
	    "2-17",
	    "6-0",
	    "6-1",
	    "6-2",
	    "6-3",
	    "6-4",
	    "6-5",
	    "6-6"
	  ];
	
	  setState(conductorIds, "conductor");
	};
	
	exports.modal5 = () => {
	  exports.makeNot(document.getElementById("2-7"));
	  exports.makeNot(document.getElementById("10-7"));
	
	  const conductorIds = [
	    "2-2",
	    "2-3",
	    "2-4",
	    "2-5",
	    "2-6",
	    "2-13",
	    "2-14",
	    "2-15",
	    "2-16",
	    "2-17",
	
	
	    "10-1",
	    "10-4",
	    "10-5",
	    "10-6",
	
	    "10-13",
	    "10-14",
	    "10-15",
	    "10-16",
	    "10-17",
	  ];
	
	  const tailIds = [
	    "9-3",
	    "11-2"
	  ];
	
	  const headIds = [
	    "9-2",
	    "11-3"
	  ];
	
	  setState(conductorIds, "conductor");
	  setState(headIds, "electron-head");
	  setState(tailIds, "electron-tail");
	};
	
	exports.modal6 = () => {
	  exports.makeAnd(document.getElementById("5-8"));
	  exports.makeAnd(document.getElementById("16-8"));
	  exports.makeTimer(document.getElementById("4-2"));
	  exports.makeTimer(document.getElementById("8-2"));
	  exports.makeTimer(document.getElementById("15-2"));
	
	  const conductorIds = [
	    "6-24",
	    "6-25",
	    "6-26",
	    "6-27",
	    "6-28",
	    "6-29",
	    "6-30",
	    "6-31",
	    "6-32",
	    "6-33",
	
	    "17-24",
	    "17-25",
	    "17-26",
	    "17-27",
	    "17-28",
	    "17-29",
	    "17-30",
	    "17-31",
	    "17-32",
	    "17-33"
	  ];
	
	  setState(conductorIds, "conductor");
	
	};
	
	exports.modal7 = () => {
	  exports.makeOr(document.getElementById("2-9"));
	  exports.makeTimer(document.getElementById("2-1"));
	  exports.makeTimer(document.getElementById("6-1"));
	
	  const conductorIds = [
	    "2-7",
	    "2-8",
	    "6-7",
	    "6-8",
	    "6-1",
	    "7-2",
	
	    "4-11",
	    "4-12",
	    "4-13",
	    "4-14",
	    "4-15",
	    "4-16",
	    "4-17",
	    "4-18",
	    "4-19"
	  ];
	
	  setState(conductorIds, "conductor");
	
	};
	
	exports.modal8 = () => {
	  exports.makeExOr(document.getElementById("2-9"));
	  exports.makeTimer(document.getElementById("2-1"));
	  exports.makeTimer(document.getElementById("8-1"));
	
	  const conductorIds = [
	    "2-7",
	    "2-8",
	    "8-7",
	    "8-8",
	    "5-11",
	    "5-12",
	    "5-13",
	    "5-14",
	    "5-15",
	    "5-16",
	    "5-17",
	    "5-18",
	    "5-19",
	    "5-20",
	    "5-21",
	    "5-22",
	    "5-23"
	  ];
	
	  setState(conductorIds, "conductor");
	
	};
	
	exports.modal9 = () => {
	  exports.makeFlipFlop(document.getElementById("2-9"));
	};
	
	exports.modal10 = () => {
	
	  exports.makeFullAdder(document.getElementById("6-49"));
	
	  const headIds = [
	    "6-8",
	    "6-38",
	    "6-44",
	    "12-32",
	    "12-38",
	    "12-44"
	  ];
	
	  exports.makeOne(document.getElementById('6-8'));
	  exports.makeOne(document.getElementById('6-38'));
	  exports.makeOne(document.getElementById('6-44'));
	  exports.makeOne(document.getElementById('12-32'));
	  exports.makeOne(document.getElementById('12-38'));
	  exports.makeOne(document.getElementById('12-44'));
	
	  const tailIds = [
	    "6-7",
	    "6-37",
	    "6-43",
	    "12-31",
	    "12-37",
	    "12-43"
	  ];
	
	  setState(headIds, "electron-head");
	  setState(tailIds, "electron-tail");
	};
	
	//helpers
	
	const setState = (ids, state, title) => {
	  ids.forEach((id)=>{
	    let currentCell = document.getElementById(id);
	    currentCell.className = state;
	    if (title) { currentCell.title = title; }
	  });
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map