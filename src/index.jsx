/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';

import Game from './containers/Game.jsx';

require('./favicon.ico'); // Tell webpack to load favicon.ico
import './vendor/bootstrap/css/bootstrap.css'
import './styles/styles.scss';

render(
  <Game />,
  document.getElementById('app')
);
