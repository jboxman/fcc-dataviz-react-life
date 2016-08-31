/*
Do this.
*/

const offsets = [
  {x:-1, y:-1}, {x:0, y:-1},
  {x:1, y:-1}, {x:-1, y:0},
  {x:1, y:0}, {x:-1, y:1},
  {x:0, y:1}, {x:1, y:1}
];

export function createGrid(
  {width = width,
    height = height,
    empty = empty} = {width: 4, height: 4, empty: false}) {

  const grid = [];
  for(let h = 0; h < height; h++) {
    grid.push([]);
    for(let w = 0; w < width; w++) {
      grid[h][w] = empty ? 0 : Math.floor(Math.random() * 2);
    }
  }
  return grid;
}

export function sumAdjacentHealth(grid, {x, y} = {}) {
  const neighbors = offsets.map(function(offset) {
    return getNeighbor(grid, findNeighbor({x, y}, offset));
  });

  return neighbors.reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

function getNeighbor(grid, {x, y} = {}) {
  if(x < 0 || y < 0) {
    return 0;
  }

  if(typeof grid[y] != 'undefined') {
    return (typeof grid[y][x] != 'undefined') ? grid[y][x] : 0;
  }

  return 0;
}

function findNeighbor(pos = {}, offset = {x: 0, y: 0}) {
  // pos = {x, y}
  const {x, y} = pos;

  const newX = x + offset.x;
  const newY = y + offset.y;

  return {x: newX, y: newY};
}

export function nextTick(grid) {
  const nextGrid = grid.map(v => v.slice(0));
  let finished = false;

  for(let i=0; i < grid.length; i++) {
    for(let j=0; j < grid[i].length; j++) {
      let heartbeatCount = sumAdjacentHealth(grid, {y: i, x: j});

      // Execute ruleset
      nextGrid[i][j] = getNextPulse(heartbeatCount, grid[i][j]);
    }
  }

  // TODO - reduce to 0 and !! to check for finished state
  // TODO - return sum of living cells after each run
  // TODO - if grid deepEqual nextGrid, we're finished

  // If state sums to 0, we're done.
  // If this.pause is true, stop
  // If this.stop is true, stop
  // do until or use setTimeout?

  return {grid: nextGrid, finished};
}

/*
1) Any live cell with fewer than two live neighbours dies, as if caused by
  under-population.

2) Any live cell with two or three live neighbours lives on to the next
  generation.

3) Any live cell with more than three live neighbours dies, as if by
  over-population.

4) Any dead cell with exactly three live neighbours becomes a live cell, as if
  by reproduction.
*/

export function getNextPulse(heartbeatCount, pulse) {
  if(pulse == 1) {
    if(heartbeatCount < 2) { // 1)
      return 0;
    }
    else if([2, 3].indexOf(heartbeatCount) != -1) { // 2)
      return 1;
    }
    else {
      return 0; // 3)
    }
  } else {
    if(heartbeatCount == 3) // 4)
      return 1;
  }
  return 0;
}
