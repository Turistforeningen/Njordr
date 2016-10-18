import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import {Footer} from '../../src/components/Footer.jsx';

describe.skip('Footer', function() {
  it('renders two buttons which might be cancel and insert', function() {
    expect(shallow(<Footer />).find('button')).to.have.length(2);
  });
});
