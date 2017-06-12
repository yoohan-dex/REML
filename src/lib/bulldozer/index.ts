export default function bulldozer(
  css: string,
  currentComponent: string,
) {
  css = removeComment(css);
  return componentalize(css, currentComponent);

}

function removeComment(str: string): string {
  const open = str.indexOf('/*');
  if (open !== -1) {
    const close = str.indexOf('*/');
    if (close === -1) {
      return '';
    } else {
      return removeComment(str.substring(0, open) + str.substring(close + 2));
    }
  } else {
    return str;
  }
}

export function componentalize(str: string, currentComponent: string) {
  if (str.length > 0) {
    str = str.trim();
    const lb = str.indexOf('{');
    const rb = str.indexOf('}');
    let haveProcessed: string = '';
    if (lb !== -1) {
      const selectorString = str.slice(0, lb);
      const selectors = selectorString.split(',');
      if (selectorString.indexOf('@') === -1) {
        const newSelector = selectors.map((selector => `.${currentComponent} `.concat(selector))).join(',');
        haveProcessed
          = newSelector
          + str.slice(lb, rb + 1)
          + componentalize(
            str.slice(rb + 2),
            currentComponent,
          );
      } else {
        if (selectorString.indexOf('media') !== -1) {
          const lastBracket = findFinalBracket(str);
          haveProcessed
            = '\n'
            + selectorString
            + '{'
            + componentalize(str.slice(lb + 1, lastBracket), currentComponent)
            + '}\n'
            + componentalize(str.slice(lastBracket + 1), currentComponent);
        } else {
          const lastBracket = findFinalBracket(str);
          haveProcessed
            = '\n'
            + selectorString
            + str.slice(lb, lastBracket + 1)
            + componentalize(str.slice(lastBracket + 1), currentComponent);
        }
      }

    }
    return haveProcessed;
  } else {
    return '';
  }
}
export function findFinalBracket(str: string): number {
  let idx = 0;
  if (str.length > 0) {
    const firstClose = str.indexOf('}');
    const secondClose = str.indexOf('}', firstClose + 1);
    const secondOpen = str.indexOf('{', firstClose + 1);
    const firstCloseSecondOpen = secondOpen !== -1 ? secondOpen - firstClose : Infinity;
    const firstCloseSecondClose = secondClose - firstClose;
    if (firstCloseSecondOpen > firstCloseSecondClose) {
      idx = secondClose;
    } else {
      idx = secondClose + findFinalBracket(str.slice(secondClose));
    }
  }
  return idx;
}