## WireWorld  

###Background

Brian Silverman's 'wireworld' is a Turing-complete cellular automaton. It is able to simulate electronic logic elements.  It is played on an arbitrarily large 2D rectangular grid. Each cell of the grid has four possible states: empty, electron head, electron tail or conductor. Every "tick" a cell's state may change or stay the same depending on its neighboring cells according to the following rules:

1. An empty cell will remain empty.
2. An electron head becomes an electron tail.
3. An electron tail becomes a conductor.
4. A conductor either:
  4a. Becomes an electron head IF exactly 1 or 2 neighboring cells are electron heads.
  4b. Remains a conductor.


### Functionality & MVP  

With this WireWorld simulator, users will be able to:

- [ ] Start, pause and reset the grid as well as update the grid by one tick.
- [ ] Toggle the states of cells.
- [ ] See examples of diodes as well as AND, OR, XOR and NAND gates and modals which explain their functionality.

Bonus

- [ ] More complex logical functionality tbd

### Wireframe

![wireframes](https://github.com/douglastgordon/WireWorld/blob/master/WireWorld-Mockup.jpg)

### Architecture & Technologies

- The game's logic will be handled by JavaScript
- The visual aspect of the game will be handled by jQuery manipulation of an HTML table element
- Webpack to bundle and serve up the various scripts.


### Timeline

**Phase 1**:

Set up grid and backend logic for changing cell states + styling

**Phase 2**:

Set up user controls for starting, stopping, ticking and reseting the board. As well as inputing their own values.

**Phase 3**:

Make panels with examples of logic gates and clear instructions of how wireworld works using modals.
