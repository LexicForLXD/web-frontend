import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('stores 10 latest out of 11 log messages, added one-by-one', () => {
  const wrapper = shallow(<App />);
  const messages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  messages.forEach(msg => {
    wrapper.instance().logPush(msg);
  });
  expect(wrapper.state().log).toEqual(messages.slice(-10));
});

it('stores 10 latest out of 11 log messages, added at once', () => {
  const wrapper = shallow(<App />);
  const messages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  wrapper.instance().logPush(messages);
  expect(wrapper.state().log).toEqual(messages.slice(-10));
});
