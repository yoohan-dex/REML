// import { PushCodeHtml, PushCodeCss } from 'actions/actions';
// import * as types from 'actions/constants';

// export type Actions = PushCodeHtml & PushCodeCss;

// export interface CodebaseState {
//   [component: string]: {
//     html: string;
//     css: string;
//   };
// }
// const codebaseState: CodebaseState = {
//   resume: {
//     html: '',
//     css: '',
//   }
// };

// export default (state: CodebaseState = codebaseState, action: Actions): CodebaseState => {
//   switch (action.type) {
    // case types.PUSH_CODES_HTML:
    //   return {
    //     ...state,
    //     [action.componentName]: {
    //       ...state[action.componentName],
    //       html: action.html,
    //     }
    //   };
//     case types.PUSH_CODES_CSS:
//       return {
//         ...state,
//         [action.componentName]: {
//           ...state[action.componentName],
//           css: action.css,
//         }
//       };
//     default:
//       return state;
//   }
// };
