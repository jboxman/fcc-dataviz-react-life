import React, {PropTypes} from 'react';
import classNames from 'classnames';

import Cell from './Cell';

// Re-draw sandbox based on change in state
// Each i, j will be y, x respectively
// Cell can be on/off based on health

const Sandbox = (props) => {

  const draw = () => {
    return props.grid.map((row, y) => {
      return row.map((cell, x) => {
        let pulse = props.grid[y][x];
        return <Cell x={x} y={y} pulse={pulse} />
      })
    });
  };

  return (
    <div className={props.classes}>{draw()}</div>
  );
};

Sandbox.PropTypes = {
  grid: PropTypes.array.isRequired,
  classes: PropTypes.string.isRequired
};

export default Sandbox
