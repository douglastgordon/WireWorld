#WireWorld

Brian Silverman's 'wireworld' is a Turing-complete cellular automaton. It is able to simulate electronic logic elements.  It is played on an arbitrarily large 2D rectangular grid. Each cell of the grid has four possible states: empty, electron head, electron tail or conductor. Every "tick" a cell's state may change or stay the same depending on its neighboring cells according to the following rules:

1. An empty cell will remain empty.
2. An electron head becomes an electron tail.
3. An electron tail becomes a conductor.
4. A conductor either:
  a. Becomes an electron head IF exactly 1 or 2 neighboring cells are electron heads.
  b. Remains a conductor.

This version, written in vanilla JavaScript, features a full walk through of functionality using modals as well as a built-in binary adding machine.

###Screenshot:
![xor]

###Technical Details:

WireWorld uses vanilla JavaScript to accomplish advanced DOM-Manipulation and easily navigable modals. Below is a function which dictates the state (represented by class name) of every cell on the grid depending on its current class and neighboring cells.

```javascript
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
```

###Features
* modal instructions
* built-in components
* vanilla JS DOM Manipulation

[xor]: ./images/xorscreenshot.png
