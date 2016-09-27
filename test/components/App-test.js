import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import {App} from '../../src/components/App.jsx';

describe('App', function() {
  it('renders div', function() {
    expect(shallow(<App />).find('div')).to.have.length(1);
  });
});
