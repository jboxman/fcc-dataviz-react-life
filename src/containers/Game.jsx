import React, {PropTypes} from 'react';
import classNames from 'classnames';

import Sandbox from '../components/Sandbox';
import Button from '../components/Button';
import {createGrid, nextTick} from '../simulator';

// TODO - somewhere x & y are flipped

const SPEED_SLOW = 1000;
const SPEED_NORMAL = 500;
const SPEED_FAST = 250;

const GRID_SIZE = {
  sm: {width: 14, height: 14},
  md: {width: 29, height: 29},
  lg: {width: 44, height: 44}
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.delay = 100;
    this.timerID = null;
    this.running = false;

    this.state = this.resetState({gridSize: props.gridSize});

    this.resetState = this.resetState.bind(this);
    this.run = this.run.bind(this);
    this.stop = this.stop.bind(this);

    this.startHandler = this.startHandler.bind(this);
    this.stopHandler = this.stopHandler.bind(this);
    this.clearHandler = this.clearHandler.bind(this);

  }

  resetState(options = {}) {
    const {empty} = options;

    // gridSize is initially a prop, but may be changed later
    // by user input.
    const gridSize = options['gridSize'] ? options.gridSize : this.state.gridSize;

    // Pass through argument for empty grid
    const gridOptions = Object.assign({},
      {empty}, GRID_SIZE[gridSize]);

    const grid = createGrid(gridOptions);

    return {
      grid: grid,
      gridSize: gridSize,
      count: 0
    }
  }

  run({coldstart} = {coldstart: false}) {
    //if(this.state.count > 10)
    //  return;

    if(!this.running && !coldstart)
      return;

    const {grid} = nextTick(this.state.grid);

    this.setState({
      grid,
      count: (this.state.count + 1)
    },
    function() {
      this.running = true;
      this.timerID = setTimeout(this.run, this.delay);
    });
  }

  stop() {
    window.clearTimeout(this.timerID);
    this.timerID = null;
    this.running = false;
  }

  // Run as soon as component is ready
  componentDidMount() {
    this.run({coldstart: true});
  }

  startHandler() {
    if(!this.running) {
      this.setState(
        this.resetState({empty: false}),
        function() {
          this.run({coldstart: true});
      });
      //console.log(`start count: ${this.state.count}`);
    }
  }

  stopHandler() {
    this.stop();
  }

  clearHandler() {
    this.stop();
    this.setState(this.resetState({empty: true}));
  }

  // Bound in render() which has performance implications.
  speedHandler(v) {
    this.delay = v;
  }

  // Resize and restart. Bound in render() has performance implications.
  sizeHandler(v) {
    this.stop();
    console.log(v);
    this.setState(
      this.resetState({gridSize: v}),
      function() {
        this.run({coldstart: true});
    });
  }

  render() {
    // The grid class depends upon the grid width and height
    const classes = classNames({
      'sm-grid': this.state.gridSize == 'sm',
      'md-grid': this.state.gridSize == 'md',
      'lg-grid': this.state.gridSize == 'lg'
    });

    return(
      <div>
        <div id="control-group">
          <div className="text-center">
            <span className="label label-default">Controls</span>
            <Button label={'Start'} clickAction={this.startHandler} />
            <Button label={'Stop'} clickAction={this.stopHandler} />
            <Button label={'Clear'} clickAction={this.clearHandler} />
          </div>
        </div>

        <div id="container" className={classes}>
          <Sandbox grid={this.state.grid} classes={classes} />
        </div>

        <div className="settings">
          <div>
            <span className="label label-default">Speed</span>
            <Button label={'Fast'} clickAction={this.speedHandler.bind(this, SPEED_FAST)} />
            <Button label={'Normal'} clickAction={this.speedHandler.bind(this, SPEED_NORMAL)} />
            <Button label={'Slow'} clickAction={this.speedHandler.bind(this, SPEED_SLOW)} />
            <span className="label label-default">Size</span>
            <Button label={'Small'} clickAction={this.sizeHandler.bind(this, 'sm')} />
            <Button label={'Medium'} clickAction={this.sizeHandler.bind(this, 'md')} />
            <Button label={'Large'} clickAction={this.sizeHandler.bind(this, 'lg')} />
          </div>
        </div>
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
