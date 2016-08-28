import React, {PropTypes} from 'react';
import classNames from 'classnames';

import Sandbox from '../components/Sandbox';
import {createGrid, nextTick} from '../simulator';

// TODO - somewhere x & y are flipped

const SPEED_SLOW = 1000;
const SPEED_NORMAL = 500;
const SPEED_FAST = 250;

const GRID_SIZE = {
  sm: {width: 49, height: 49},
  md: {width: 74, height: 74},
  lg: {width: 99, height: 99}
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.delay = 100;
    this.timerID = null;

    this.state = {
      grid: createGrid(GRID_SIZE[props.gridSize]),
      gridSize: props.gridSize,
      count: 0,
      running: false
    };

    this.run = this.run.bind(this);
    this.stop = this.stop.bind(this);
  }

  run() {
    if(this.state.count > 10)
      return;

    if(!this.state.running)
      return;

    const {grid} = nextTick(this.state.grid);
    this.setState({
      grid,
      running: true,
      count: (this.state.count + 1)
    });
    this.timerID = setTimeout(this.run, this.delay);
  }

  stop() {
    window.clearTimeout(this.timerID);
    this.timerID = null;
    this.setState({
      running: false,
      count: 0
    });
  }

  componentDidMount() {
    this.run();
  }

  startHandler() {
    this.run();
  }

  stopHandler() {
    this.stop();
  }

  clearHandler() {

  }

  render() {
    const classes = classNames({
      'sm-grid': this.state.gridSize == 'sm',
      'md-grid': this.state.gridSize == 'md',
      'lg-grid': this.state.gridSize == 'lg'
    });

    return(
      <div id="container" className={classes}>
        <Sandbox grid={this.state.grid} classes={classes} />
      </div>
    );
  }
}

Game.defaultProps = {
  gridSize: 'md'
};

Game.PropTypes = {
  gridSize: PropTypes.oneOf(['sm', 'md', 'lg']).isRequired
}

export default Game
