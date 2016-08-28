import React from 'react';
import {render} from 'enzyme';
import {assert} from 'chai';

import Sandbox from './Sandbox.jsx';

describe('Sandbox', () => {

  it('should render a grid', () => {
    const grid = [
      [0, 0],
      [1, 1]
    ];
    // Need deeper rendering -- uses Cheerio
    const dom = render(
      <Sandbox grid={grid} />
    );

    assert.lengthOf(dom.children().find('div'), 4, 'items in grid');
    assert.lengthOf(dom.children().find('[data-col=0]'), 2);
    assert.lengthOf(dom.children().find('[data-row=0]'), 2);
  });
});
