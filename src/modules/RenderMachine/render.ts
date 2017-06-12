import * as React from 'react';
import * as R from 'ramda';
import { StaticData, StaticComponent, ResumeStore, Styles, LiveComponents, LiveData } from './typings';
import { ChildrenType, Text, Tree } from '../../lib/lynx/lib/format';
const paul = require('paul');
interface Scope {
  currentComponentName: string[];
  currentLiveComponentName: string[];
  currentComponentChildren: ChildrenType[];
  liveComponents: string[];
}

interface WalkOptions {
  key: number; // for react unique key
  scope: Scope; // for parse component
}

type Walk = (node: any, scope: LiveComponents[]) => any;

function parseExpression(str: string) {
  const leftPos = str.indexOf('{{');
  if (leftPos === -1) {
    return false;
  }
  const rightPos = str.indexOf('}}', leftPos);
  if (rightPos === -1) {
    return false;
  }
  const expression = str.slice(leftPos + 2, rightPos).trim();
  if (expression.includes('{') || expression.includes('}')) {
    throw (new Error('Expression can not includes any curly bracket'));
  }
  return {
    left: str.slice(0, leftPos),
    expression,
    right: str.slice(rightPos + 2),
  };
}

function renderText(
  node: Text,
  walk: Walk,
  store: ResumeStore,
  walkOptions: WalkOptions,
  scope: LiveComponents[],
): any {
  const expressionObject = parseExpression(node.content);
  if (!expressionObject) {
    return node.content;
  }
  const {
    left,
    expression,
    right,
  } = expressionObject;
  const rightObject: Text = {
    type: 'Text',
    content: right,
  };
  let data: StaticData;
  function extraExpression(): any {
    if (data.value) {
      return [left + data.value, renderText(rightObject, walk, store, walkOptions, scope)];
    } else if (data.default) {
      return [left + data.default, renderText(rightObject, walk, store, walkOptions, scope)];
    }
  }
  if (expression === 'children') {
    const rightSide = renderText(rightObject, walk, store, walkOptions, scope);
    if (walkOptions.scope.currentComponentName.length > 1) {
      // tslint:disable-next-line:no-unused-expression
      walkOptions.scope.currentComponentName.pop() as string;
    }
    const children = walk(walkOptions.scope.currentComponentChildren.pop(), scope);
    return [
      left,
      children,
      rightSide,
    ];
  } else if (expression.indexOf('::') !== -1) {
    const messages = expression.split('::');
    if (messages.length > 1) {
      const [module, name] = messages;
      data = store.messages[module][name];
      if (data) {
        return extraExpression();
      }
      throw new Error(`you have no the message item named ${name}`);
    }
  } else {
    data = getLiveOrStaticData(expression, walkOptions, store);
    if (data) {
      return extraExpression();
    } else {
      data = getData(expression, store.globalData);
      if (data) {
        return extraExpression();
      } else {
        throw new Error(`you have no a data named ${expression}`);
      }
    }
  }
}
export function getMessages(module: string, name: string, store: ResumeStore) {
  return store.messages[module][name];

}
export function getLiveOrStaticData(dataName: string, walkOptions: WalkOptions, store: ResumeStore) {
  let data: StaticData;
  const len = walkOptions.scope.currentLiveComponentName.length;
  if (len > 0) {

    const idx = R.findIndex(R.propEq('id', walkOptions.scope.currentLiveComponentName[len - 1]), store.liveData);
    data = getData(dataName, store.liveData[idx].data);
  } else {
    const currentComponent =
      getComponentFromStatic(
        walkOptions.scope.currentComponentName[walkOptions.scope.currentComponentName.length - 1],
        store,
      );
    data = getData(dataName, currentComponent.data);
  }
  return data;
}
export default function render(
  tree: Tree[] | ChildrenType,
  store: ResumeStore,
) {
  store.liveComponents = [];
  store.liveComponents[0] = {
    id: 'Resume',
    children: [],
  };
  let walkOptions: WalkOptions = {
    key: 0, // for the react component key
    scope: {
      currentComponentName: ['Resume'], // the component stack
      currentLiveComponentName: [],
      currentComponentChildren: [],
      liveComponents: ['Resume'],
    },  // for the component's inner data and theme;
  };

  return paul.walk(tree, (
    node: Tree | Text,
    walk: Walk,
    scope: LiveComponents[] = store.liveComponents[0].children,
    // what: any,
  ) => {
    if (node.type === 'Text') {
      return renderText(node, walk, store, walkOptions, scope);
    }

    const condition = parseCondition(node, store, walkOptions);
    const loop = parseLoop(node, store, walkOptions);
    if (condition) {
      if (condition.value || condition.default) {
        if (loop) {
          if (!Array.isArray(loop.default) || (loop.value && !Array.isArray(loop.value))) {
            throw (new Error(`${loop.name} should be an array`));
          }

          if (loop.value) {
            return loop.value.map((v: any) => renderElement(node, walk, store, walkOptions, scope));
          } else if (loop.default) {
            const components = loop.default.map((v: any) => {
              return renderElement(node, walk, store, walkOptions, scope);
            });
            return components;
          }
          // tslint:disable-next-line:no-console
          console.error('loop failed', `you have no the data named ${loop.name}`);
          return '';
        }
        return renderElement(node, walk, store, walkOptions, scope);

      }
      return '';

    } else if (loop) {
      if (!Array.isArray(loop.default) || (loop.value && !Array.isArray(loop.value))) {
        throw (new Error(`${loop.name} should be an array`));
      }

      if (loop.value) {
        return loop.value.map((v: any) => renderElement(node, walk, store, walkOptions, scope));
      } else if (loop.default) {
        return loop.default.map((v: any) =>
          renderElement(node, walk, store, walkOptions, scope),
        );
      }
      // tslint:disable-next-line:no-console
      console.error('loop failed', `you have no the data named ${loop.name}`);
      return '';
    } else {
      return renderElement(node, walk, store, walkOptions, scope);
    }
  });
}

function parseCondition(
  node: Tree,
  store: ResumeStore,
  walkOptions: WalkOptions
) {
  if (!node.attributes) {
    node.attributes = {};
  }
  if (node.attributes.condition) {
    const name = node.attributes.condition;
    let data = getLiveOrStaticData(name, walkOptions, store);
    if (!data) {
      data = getData(name, store.globalData);
      if (!data) {
        return ({
          name,
          value: '',
          default: '',
        });
      } else {
        return ({
          name,
          value: data.value,
          default: data.default,
        });
      }
    }
    return ({
      name,
      value: data.value,
      default: data.default,
    });

  }
  return false;
}

function getData(name: string, data: StaticData[]): StaticData {
  return R.find(
    R.propEq('name', name)
  )(data);
}
function parseLoop(
  node: Tree,
  store: ResumeStore,
  walkOptions: WalkOptions,
) {
  const {
    scope,
  } = walkOptions;
  if (node.attributes.loop) {
    const currentComponent = getComponentFromStatic(
      scope.currentComponentName[scope.currentComponentName.length - 1],
      store,
    );
    const name = node.attributes.loop;
    let data = getData(name, currentComponent.data);
    if (!data) {
      data = getData(name, store.globalData);
      if (!data) {
        return {
          name,
          value: '',
          default: [],
        };
      } else {
        return ({
          name,
          value: data.value,
          default: data.default,
        });
      }
    } else {
      return {
        name,
        value: data.value,
        default: data.default,
      };
    }
  }
  return false;
}

function getComponentFromStatic(currentComponentName: string, store: ResumeStore) {
  const component = R.find(
    R.propEq(
      'name',
      currentComponentName,
    ))(store.staticComponents);
  if (component) {
    return component as StaticComponent;
  }
  throw (new Error(`It is likely you have no the component named ${currentComponentName} in your components`));
}

function parseStyle(styles: Styles, store: ResumeStore, walkOptions: WalkOptions) {
  const inlineStyle: Styles = {};
  const { scope } = walkOptions;
  Object.keys(styles).forEach(key => {
    const isExpression = parseExpression(styles[key]);
    if (!isExpression) {
      inlineStyle[key] = styles[key];
    } else {
      const { left, expression, right } = isExpression;
      const currentComponent = getComponentFromStatic(
        scope.currentComponentName.length > 1
          ? scope.currentComponentName[scope.currentComponentName.length - 1]
          : scope.currentComponentName[0],
        store,
      );
      const data = getData(expression, currentComponent.data);
      inlineStyle[key] = left + data.value ? data.value : data.default + right;
    }
  });
  return inlineStyle;
}

function parseUrl(url: string, store: ResumeStore, walkOptions: WalkOptions) {
  let ret: string = '';
  const { scope } = walkOptions;
  console.log('parseURL', url);
  const isExpression = parseExpression(url);
  if (!isExpression) {
    ret = url;
  } else {
    const { left, expression, right } = isExpression;
    const currentComponent = getComponentFromStatic(
      scope.currentComponentName.length > 1
        ? scope.currentComponentName[scope.currentComponentName.length - 1]
        : scope.currentComponentName[0],
      store,
    );
    const data = getData(expression, currentComponent.data);
    if (data) {
      ret = left + (data.value ? data.value : data.default) + right;
    }

  }
  return ret;
}

function renderElement(
  node: Tree,
  walk: Walk,
  store: ResumeStore,
  walkOptions: WalkOptions,
  scope: LiveComponents[]) {
  const props: {
    [idx: string]: any;
  } = {
      key: walkOptions.key++,
    };
  if (node.attributes.styles) {
    props.style = { ...parseStyle(node.attributes.styles, store, walkOptions) };
  }
  if (node.attributes.className) {
    props.className = parseUrl(node.attributes.className.join(' '), store, walkOptions);
  }
  if (node.attributes.src) {
    props.src = parseUrl(node.attributes.src, store, walkOptions);
  }
  if (node.attributes.href) {
    props.href = parseUrl(node.attributes.href, store, walkOptions);
  }
  if (node.type === 'Element') {
    return React.createElement(
      node.tagName,
      props,
      walk(node.children, scope));
  } else if (node.type === 'Component') {
    const staticComponent = getComponentFromStatic(node.tagName, store);
    if (node.attributes.key) {
      const id = `${node.tagName}-${node.attributes.key}`;
      const liveComponent = {
        id,
        children: [],
      };
      let idx = -1;
      store.liveData.forEach((v, i) => {
        if (v.id === liveComponent.id) {
          idx = i;
        }
      });
      const liveData: LiveData = {
        id,
        data: staticComponent.data.slice(),
        theme: staticComponent.theme.slice(),
      };
      walkOptions.scope.currentLiveComponentName.push(id);
      if (idx === -1) {
        store.liveData.push(liveData);
      } else {
        liveData.data.forEach((d, i) => {
          if (store.liveData[idx].data[i]) {
            // ...
          } else {
            store.liveData[idx].data.push(d);
          }
        });
        liveData.theme.forEach((t, i) => {
          if (store.liveData[idx].theme[i]) {
            // ...
          } else {
            store.liveData[idx].theme.push(t);
          }
        });
      }
      scope.push(liveComponent);
    }
    walkOptions.scope.currentComponentName.push(node.tagName);
    walkOptions.scope.currentComponentChildren.push(node.children);
    const component = React.createElement(
      'div',
      {
        ...props,
        style: { display: 'inline' },
        className:
        node.attributes.key
          ? `${props.className} ${node.tagName}-${node.attributes.key}`
          : `${props.className} ${node.tagName}`,
        key: walkOptions.key++,
      },
      walk(staticComponent.children, node.attributes.key ? scope[scope.length - 1].children : scope),
    );
    if (node.attributes.key && walkOptions.scope.currentLiveComponentName.length > 0) {
      walkOptions.scope.currentLiveComponentName.pop();
    }
    if (walkOptions.scope.currentComponentName.length > 1) {
      walkOptions.scope.currentComponentName.pop();
    }
    return component;
  }
  return new Error('the node type is neither an Element nor a Component');
}
