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
