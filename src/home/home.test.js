import React from 'react';
import {render} from 'enzyme';
import {expect} from 'chai';
import Home from './home';

describe('home', () => {
  it('works', () => {
    const home = render(<Home />);
    console.log(home);
  });
});
