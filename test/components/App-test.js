import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import {App} from '../../src/components/App.jsx';

describe('App', function() {
  it('renders header', function() {
    expect(shallow(<App />).find('header')).to.have.length(1);
  });
});
