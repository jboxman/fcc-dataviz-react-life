import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';

import Cell from './Cell.jsx';

describe('Cell', () => {

  it('should have props', () => {
    const props = {
      x: 0,
      y: 0,
      pulse: 0
    };
    const wrapper = shallow(<Cell {...props} />);
    const actual = wrapper.instance().props;

    assert.deepEqual(actual, props);
  });

  it('should have a tile classname', () => {
    const props = {
      x: 0,
      y: 0,
      pulse: 0
    };
    const wrapper = shallow(<Cell {...props} />);
    const actual = wrapper.hasClass('tile');

    assert.equal(actual, true);
  });

  it('should apply a class for truthy props.pulse', () => {
    const props = {
      x: 0,
      y: 0
    };
    const wrapper = shallow(<Cell {...props} pulse={1} />);
    const actual = wrapper.hasClass('alive');

    assert.equal(actual, true);
  });

  it('should not apply a calss for falsy props.pulse', () => {
    const props = {
      x: 0,
      y: 0
    };
    const wrapper = shallow(<Cell {...props} pulse={0} />);
    const actual = wrapper.hasClass('alive');

    assert.equal(actual, false);
  });

});
