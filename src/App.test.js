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

it('stores the 10 newest log messages', () => {
  const wrapper = shallow(<App />);
  // 1 message
  wrapper.instance().logPush('foo');
  expect(wrapper.state().log).toContain('foo');
  // 10 messages, one by one
  let messages = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  messages.forEach(msg => {
    wrapper.instance().logPush(msg);
  });
  expect(wrapper.state().log).toEqual(messages);
  // 10 messages at once
  messages.reverse();
  wrapper.instance().logPush(messages);
  expect(wrapper.state().log).toEqual(messages);
  // 11 messages at once
  const tooManyMessages = ['bar', ...messages];
  wrapper.instance().logPush(tooManyMessages);
  expect(wrapper.state().log).toEqual(messages);
})
