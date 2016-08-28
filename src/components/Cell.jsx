import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Cell = (props) => {
  const classes = classNames('tile', {
    alive: !!props.pulse
  });

  return(
    <div className={classes} data-col={props.y} data-row={props.x}></div>
  );
}

Cell.propTypes = {
  //gridSize: PropTypes.oneOf(['sm', 'md', 'lg']).isRequired,
  pulse: PropTypes.oneOf([0, 1]).isRequired,
  y: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired
};

export default Cell
