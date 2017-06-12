import { StaticData, StaticComponent, LiveData, Theme } from '../RenderMachine/typings';
import * as React from 'react';
import bulldozer from 'lib/bulldozer';

export default function render(staticComponent: StaticComponent[], liveData: LiveData[], globalTheme: Theme) {
  const components: React.ReactNode[] = [];
  staticComponent.forEach(v => {
    let css: string = '';
    try {
      css = bulldozer(v.codebase.css, v.name);
    } catch (e) {
      // ...
    }
    components.push(
      renderComponent(css, v.theme, v.name, globalTheme)
    );
  });
  liveData.forEach(d => {
    let css: string = '';
    let theme: StaticData[] = [];
    const [component] = d.id.split('-');
    staticComponent.forEach(c => {
      if (c.name === component) {
        css = bulldozer(c.codebase.css, d.id);
      }
    });
    liveData.forEach(data => {
      if (data.id === d.id) {
        theme = data.theme;
      }
    });
    components.push(
      renderComponent(css, theme, d.id, globalTheme),
    );
  });
  return components;
}

function renderComponent(css: string, data: StaticData[], key: string, globalTheme: Theme) {

  css = parseExpression(css, data, globalTheme);
  return React.createElement('style', { key }, css);
}

function parseExpression(str: string, data: StaticData[], globalTheme: Theme): string {
  const $position = str.indexOf('$');
  if ($position !== -1) {
    const beginPos = $position + 1;
    const $finalPos = str.indexOf('$', beginPos);
    let variable = '';
    if ($finalPos !== -1) {

      // const finalPos = parseVariable(str, beginPos);
      variable = str.slice(beginPos, $finalPos);
    }
    let value: string = '';
    if (variable) {
      if (variable.indexOf('::') !== -1) {
        const theme = variable.split('::');
        if (theme.length > 1) {
          const [module, name] = theme;
          const themedata = globalTheme[module][name];
          if (themedata) {
            if (themedata.value) {
              value = themedata.value;
            } else if (themedata.default) {
              value = themedata.default;
            }
          }
        }
      } else {
        data.forEach(v => {
          if (v.name === variable) {
            if (v.value) {
              value = v.value;
            } else if (v.default) {
              value = v.default;
            }
          }
        });
      }
    } else {
      return '';
    }
    return (
      str.slice(0, $position)
      + value
      + parseExpression(str.slice($finalPos + 1), data, globalTheme)
    );
  }
  return str;
}

function parseVariable(str: string, position: number) {
  if (isVariable(str[position])) {
    position += 1;
    parseVariable(str, position);
  }
  return position + 1;
}
function isVariable(char: string) {
  const code = char.charCodeAt(0);
  if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || code === 95) {
    return true;
  }
  return false;
}