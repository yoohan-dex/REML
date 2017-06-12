import { ChangeTemplate, SetActiveTemplate, SetCommonValue } from '../actions/actions';
import * as types from 'actions/constants';
import { ResumeStore } from 'modules/RenderMachine/typings';

const initialState: ResumeStore = {
  staticComponents: [],
  liveComponents: [],
  liveData: [],
  globalData: [],
  globalTheme: [],
  theme: {},
  messages: {},
};

type StaticLibraryActions = SetCommonValue | SetActiveTemplate | ChangeTemplate;

export default (state: ResumeStore = initialState, action: StaticLibraryActions): ResumeStore => {
  switch (action.type) {
    case types.SET_COMMON_VALUE:
      return ({
        ...state,
        [action.componentType]: {
          ...state[action.componentType],
          [action.module]: {
            [action.name]: {
              ...state[action.componentType][action.module][action.name],
              value: action.value,
            }
          }
        }
      });
    case types.SET_ACTIVE_TEMPLATE:
      return action.template;
    case types.CHANGE_TEMPLATE:
      return {
        ...state,
        staticComponents: action.template.staticComponents,
        liveComponents: action.template.liveComponents,
        liveData: action.template.liveData,
        globalData: action.template.globalData,
        globalTheme: action.template.globalTheme,
      };

    default:
      return state;
  }
};
