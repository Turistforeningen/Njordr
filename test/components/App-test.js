import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import App from '../../src/components/App.jsx';

describe('App', function() {
  it('renders h1', function() {
    expect(shallow(<App />).find('h1')).to.have.length(1);
  });
});
