import {expect} from 'chai';

import {createGrid, nextTick, getNextPulse, sumAdjacentHealth} from './simulator';

// Ensuring each cell is random is not so easily done.
// It may be checking if Math.random() is called for
// as many cells as should be created is sufficient.

describe('Simulator', () => {

  it('should create a grid with default size', () => {
    const grid = createGrid();

    expect(grid).be.a('array');
    expect(grid.length).equal(4);
    expect(grid.reduce((p, n) => p + n.length, 0)).equal(16);
  });

  it('should follow the simulator ruleset', () => {
    const ALIVE = 1;
    const DEAD = 0;

    expect(getNextPulse(0, ALIVE)).equal(DEAD);
    expect(getNextPulse(2, ALIVE)).equal(ALIVE);
    expect(getNextPulse(4, ALIVE)).equal(DEAD);
    expect(getNextPulse(3, DEAD)).equal(ALIVE);
    expect(getNextPulse(7, DEAD)).equal(DEAD);
  });

  it('should sum neighbor pulse', () => {
    const grid = [[0, 0, 0], [1, 1, 1], [0, 0, 0]];
    const actual = sumAdjacentHealth(grid, {x:1, y:1});
    const expected = 2;

    expect(actual).equals(expected);
  });
  // Try
  // https://www.math.cornell.edu/~lipa/mec/lesson6.html
  it('should run a tick', () => {
    const grid = [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0]
    ];
    // Non-wrap around pattern
    const expected = [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0]
    ];
    const actual = nextTick(grid).grid;

    expect(actual).not.eql(grid);
    expect(actual).eql(expected);
  });

});
