import 'jest';
import { componentalize, findFinalBracket } from '../index';

it('should componentalize single line', () => {
    const css = '.div {color: red;}';
    const newCss = '.component .div {color: red;}';
    const afterComponentalized = componentalize(css, 'component');
    expect(afterComponentalized).toBe(newCss);
});

it('should componentalize multiline', () => {
    const css = '.h1 {color: red;} .h2 > .h4 {color: red;}';
    const newCss = '.component .h1 {color: red;}.component .h2 > .h4 {color: red;}';
    const afterComponentalized = componentalize(css, 'component');
    expect(afterComponentalized).toBe(newCss);
});



it('should find out the final bracket index', () => {
    const str = '{  }{}         }';
    const idx = findFinalBracket(str);
    expect(idx).toBe(str.lastIndexOf('}'));
});

it('should find out the final bracket in real enviroment', () => {
    const css = `
@media screen and (max-width: 300px) {
    .class {
        background-color:lightblue;
    }
}`;
    const idx = findFinalBracket(css);
    expect(idx).toBe(css.lastIndexOf('}'));
});

it('should componentalize media query', () => {
    const css = `
@media screen and (max-width: 300px) {
    .class {
        background-color:lightblue;
    }
}`;
    const newCss = `
@media screen and (max-width: 300px) {.component .class {
        background-color:lightblue;
    }}
`;
    const afterComponentalized = componentalize(css, 'component');
    expect(afterComponentalized).toBe(newCss);
});
it('should componentalize multiline media query', () => {
    const css = `
@media screen and (max-width: 300px) {
    .class {
        background-color:lightblue;
    }
}
@media screen and (max-width: 300px) {
    .class {
        background-color:lightblue;
    }
}`;
    const newCss = `
@media screen and (max-width: 300px) {.component .class {
        background-color:lightblue;
    }}

@media screen and (max-width: 300px) {.component .class {
        background-color:lightblue;
    }}
`;
    const afterComponentalized = componentalize(css, 'component');
    expect(afterComponentalized).toBe(newCss);
});

it('should componentalize multiline media query and multiline class', () => {
    const css = `
@media screen and (max-width: 300px) {
    .class {
        background-color:lightblue;
    }
}
@media screen and (max-width: 300px) {
    .class {
        background-color:lightblue;
    }
    .class {
        background-color:lightblue;
    }
}`;
    const newCss = `
@media screen and (max-width: 300px) {.component .class {
        background-color:lightblue;
    }}

@media screen and (max-width: 300px) {.component .class {
        background-color:lightblue;
    }.component .class {
        background-color:lightblue;
    }}
`;
    const afterComponentalized = componentalize(css, 'component');
    expect(afterComponentalized).toBe(newCss);
});

it('should componentalize more than one class splited by ","', () => {
    const css = `
@media screen and (max-width: 300px) {
    .class, .class2, .class4 {
        background-color:lightblue;
    }
}
@media screen and (max-width: 300px) {
    .class, h1, h2, h3 {
        background-color:lightblue;
    }
    .class, class::before {
        background-color:lightblue;
    }
}`;
    const newCss = `
@media screen and (max-width: 300px) {.component .class,.component  .class2,.component  .class4 {
        background-color:lightblue;
    }}

@media screen and (max-width: 300px) {.component .class,.component  h1,.component  h2,.component  h3 {
        background-color:lightblue;
    }.component .class,.component  class::before {
        background-color:lightblue;
    }}
`;
    const afterComponentalized = componentalize(css, 'component');
    expect(afterComponentalized).toBe(newCss);
});
