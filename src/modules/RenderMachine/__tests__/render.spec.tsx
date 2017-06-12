import * as React from 'react';
import 'jest';
import * as renderer from 'react-test-renderer';

import render from '../render';
import { ResumeStore } from '../typings';
import lynx from '../../../lib/lynx';

const globalStore: ResumeStore = {
  staticComponents: [{
    codebase: {
      html: '',
      css: '',
    },
    theme: [{
      description: '',
      name: 'primary',
      value: '',
      type: 'string',
      default: '#333',
    }],
    name: 'Hey',
    data: [{
      description: '',
      name: 'data',
      value: '',
      type: 'string',
      default: 'haha',
    }, {
      description: '',
      name: 'if',
      value: '',
      type: 'string',
      default: 'true',
    }],
    children: [],
  }, {
    codebase: {
      html: '',
      css: '',
    },
    theme: [{
      description: '',
      name: 'primary',
      value: '',
      type: 'string',
      default: '#333',
    }],
    name: 'Resume',
    data: [{
      description: '',
      name: 'if',
      value: '',
      type: 'string',
      default: 'true',
    }, {
      description: '',
      name: 'ifnot',
      value: '',
      type: 'string',
      default: '',
    }, {
      description: '',
      name: 'array',
      value: '',
      type: 'array',
      default: [1, 2, 3, 4],
    }],
    children: [],
  }, {
    codebase: {
      html: '',
      css: '',
    },
    theme: [{
      description: '',
      name: 'primary',
      value: '',
      type: 'string',
      default: '#333',
    }],
    name: 'HaveChildren',
    data: [{
      description: '',
      name: 'if',
      value: '',
      type: 'string',
      default: 'true',
    }, {
      description: '',
      name: 'ifnot',
      value: '',
      type: 'string',
      default: '',
    }, {
      description: '',
      name: 'array',
      value: '',
      type: 'array',
      default: [1, 2, 3, 4],
    }],
    children: [{
      type: 'Text',
      content: 'children: {{children}}'
    }],
  }],
  liveData: [],
  theme: {},
  globalData: [
    {
      description: '',
      name: 'fuck',
      value: '',
      type: 'string',
      default: 'haha',
    }, {
      description: '',
      name: 'hello',
      value: '',
      type: 'array',
      default: [1, 2, 3],
    }, {
      description: '',
      name: 'loop',
      value: '',
      type: 'array',
      default: ['1', '2'],
    }, {
      description: '',
      name: 'primary',
      value: '',
      type: 'string',
      default: '#333',
    }],
  globalTheme: [{
    description: '',
    name: 'primary',
    value: '',
    type: 'string',
    default: '#333',
  }],
  liveComponents: [{
    id: '',
    children: [],
  }],
  messages: {},
};
describe('common html test', () => {
  it('common test', () => {
    const html = `<div>
    <div>hello</div>
    </div>`;
    const data = lynx(html);
    const store = Object.assign({}, globalStore);
    const component = renderer.create(<div>{render(data, store)}</div>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render a component', () => {
    const html = `<div>
    <Hey>hello</Hey>

    </div>`;
    const data = lynx(html);
    const store = Object.assign({}, globalStore);
    const component = renderer.create(<div>{render(data, store)}</div>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should mounted if true', () => {
    const html = `<div>
    <Hey  re:if={{if}}>hello</Hey>

    </div>`;
    const data = lynx(html);
    const store = Object.assign({}, globalStore);
    const component = renderer.create(<div>{render(data, store)}</div>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should disappear if not true', () => {
    const html = `<div re:if={{ifnot}}>
    <Hey>hello</Hey>

    </div>`;
    const data = lynx(html);
    const store = Object.assign({}, globalStore);
    const component = renderer.create(<div>{render(data, store)}</div>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should loop if there is a loop', () => {
    const html = `<div re:for={{array}}>
    <Hey>hello</Hey>

    </div>`;
    const data = lynx(html);
    const store = Object.assign({}, globalStore);
    const component = renderer.create(<div>{render(data, store)}</div>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render a component with judage the condition', () => {
    const html = `<div>
    <Hey re:if={{array}}>hello</Hey>

    </div>`;
    const data = lynx(html);
    const store = Object.assign({}, globalStore);
    const component = renderer.create(<div>{render(data, store)}</div>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render a component with a loop ', () => {
    const html = `<div>
    <Hey re:for={{array}}>hello</Hey>

    </div>`;
    const data = lynx(html);
    const store = Object.assign({}, globalStore);
    const component = renderer.create(<div>{render(data, store)}</div>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render a component contained another component ', () => {
    const html = `<div>
      <HaveChildren re:for={{array}}>
        <Hey />
      </HaveChildren>
    </div>`;
    const data = lynx(html);
    const component = renderer.create(<div>{render(data, globalStore)}</div>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('data test', () => {
  it('should take the live data', () => {
    // ...
  });
});
