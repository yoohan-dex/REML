import {
  AddStaticComponent,
  ModStaticComponent,
  ModStaticComponentName,
  PushCodeHtml,
  PushCodeCss,
  RemoveStaticComponent,
  AddStaticData,
  ModLiveData,
  ModStaticData,
  RemoveAllLiveData,
  RemoveStaticData,
  ModCommonItem,
} from 'actions/actions';
import * as types from 'actions/constants';
import initialState from './initialState';
import { ResumeStore } from 'modules/RenderMachine/typings';
import * as R from 'ramda';

export const findIdxByName = (name: string, state: ResumeStore) =>
  R.findIndex(R.propEq('name', name), state.staticComponents);
export const findIdxById = (id: string, state: ResumeStore) =>
  R.findIndex(R.propEq('id', id), state.liveData);

export enum DataType {
  Data,
  Theme,
}
type StaticLibraryActions = AddStaticComponent
  | ModStaticComponent
  | ModStaticComponentName
  | PushCodeHtml
  | PushCodeCss
  | RemoveStaticComponent
  | AddStaticData
  | RemoveStaticData
  | ModStaticData
  | ModLiveData
  | RemoveAllLiveData
  | ModCommonItem;

export default (state: ResumeStore = initialState, action: StaticLibraryActions): ResumeStore => {
  let idx: number;
  switch (action.type) {
    case types.ADD_STATIC_COMPONENT:
      return ({
        ...state,
        staticComponents: [
          ...state.staticComponents,
          action.component
        ],
      });
    case types.MOD_STATIC_COMPONENT:
      idx = findIdxByName(action.name, state);
      return ({
        ...state,
        staticComponents: [
          ...state.staticComponents.slice(0, idx),
          { ...state.staticComponents[idx], children: action.tokens },
          ...state.staticComponents.slice(idx + 1),
        ]
      });
    case types.MOD_STATIC_COMPONENT_NAME:
      idx = findIdxByName(action.activeComponent, state);
      return ({
        ...state,
        staticComponents: [
          ...state.staticComponents.slice(0, idx),
          { ...state.staticComponents[idx], name: action.value },
          ...state.staticComponents.slice(idx + 1),
        ]
      });
    case types.PUSH_CODES_HTML:
      idx = findIdxByName(action.componentName, state);
      return ({
        ...state,
        staticComponents: [
          ...state.staticComponents.slice(0, idx),
          {
            ...state.staticComponents[idx], codebase: {
              ...state.staticComponents[idx].codebase,
              html: action.html,
            }
          },
          ...state.staticComponents.slice(idx + 1),
        ]
      });
    case types.PUSH_CODES_CSS:
      idx = findIdxByName(action.componentName, state);
      return ({
        ...state,
        staticComponents: [
          ...state.staticComponents.slice(0, idx),
          {
            ...state.staticComponents[idx], codebase: {
              ...state.staticComponents[idx].codebase,
              css: action.css,
            }
          },
          ...state.staticComponents.slice(idx + 1),
        ]
      });
    case types.REMOVE_STATIC_COMPONENT:
      idx = findIdxByName(action.name, state);
      return ({
        ...state,
        staticComponents: [
          ...state.staticComponents.slice(0, idx),
          ...state.staticComponents.slice(idx + 1),
        ]
      });
    case types.ADD_STATIC_DATA:
      idx = findIdxByName(action.activeComponent, state);
      if (action.dataType === DataType.Data) {
        return ({
          ...state,
          staticComponents: [
            ...state.staticComponents.slice(0, idx),
            { ...state.staticComponents[idx], data: [...state.staticComponents[idx].data, action.data] },
            ...state.staticComponents.slice(idx + 1),
          ]
        });
      } else {
        return ({
          ...state,
          staticComponents: [
            ...state.staticComponents.slice(0, idx),
            { ...state.staticComponents[idx], theme: [...state.staticComponents[idx].theme, action.data] },
            ...state.staticComponents.slice(idx + 1),
          ]
        });
      }
    case types.REMOVE_STATIC_DATA:
      idx = findIdxByName(action.activeComponent, state);
      if (action.dataType === DataType.Data) {
        return ({
          ...state,
          staticComponents: [
            ...state.staticComponents.slice(0, idx),
            {
              ...state.staticComponents[idx],
              data: state.staticComponents[idx].data.filter(v => v.name !== action.name),
            },
            ...state.staticComponents.slice(idx + 1),
          ]
        });
      } else {
        return ({
          ...state,
          staticComponents: [
            ...state.staticComponents.slice(0, idx),
            {
              ...state.staticComponents[idx],
              theme: state.staticComponents[idx].theme.filter(v => v.name !== action.name),
            },
            ...state.staticComponents.slice(idx + 1),
          ]
        });
      }
    case types.MOD_STATIC_DATA:
      idx = findIdxByName(action.activeComponent, state);
      if (action.dataType === DataType.Data) {
        return ({
          ...state,
          staticComponents: [
            ...state.staticComponents.slice(0, idx),
            {
              ...state.staticComponents[idx],
              data: state.staticComponents[idx].data.map(v => {
                if (v.name === action.dataName) {
                  return action.data;
                }
                return v;
              }),
            },
            ...state.staticComponents.slice(idx + 1),
          ]
        });
      } else {
        return ({
          ...state,
          staticComponents: [
            ...state.staticComponents.slice(0, idx),
            {
              ...state.staticComponents[idx],
              theme: state.staticComponents[idx].theme.map(v => {
                if (v.name === action.dataName) {
                  return action.data;
                }
                return v;
              }),
            },
            ...state.staticComponents.slice(idx + 1),
          ]
        });
      }
    case types.MOD_LIVE_DATA:
      idx = findIdxById(action.id, state);

      if (action.dataType === DataType.Data) {
        let dataIdx = -1;
        state.liveData[idx].data.forEach((d, i) => {
          if (d.name === action.dataName) {
            dataIdx = i;
          }
        });
        return ({
          ...state,
          liveData: [
            ...state.liveData.slice(0, idx),
            {
              ...state.liveData[idx], data: [
                ...state.liveData[idx].data.slice(0, dataIdx),
                action.data,
                ...state.liveData[idx].data.slice(dataIdx + 1),
              ]
            },
            ...state.liveData.slice(idx + 1),
          ]
        });
      } else {
        let dataIdx = -1;
        state.liveData[idx].theme.forEach((d, i) => {
          if (d.name === action.dataName) {
            dataIdx = i;
          }
        });
        return ({
          ...state,
          liveData: [
            ...state.liveData.slice(0, idx),
            {
              ...state.liveData[idx],
              theme: [
                ...state.liveData[idx].theme.slice(0, dataIdx),
                action.data,
                ...state.liveData[idx].theme.slice(dataIdx + 1),
              ]
            },
            ...state.liveData.slice(idx + 1),
          ]
        });
      }
    case types.REMOVE_ALL_LIVE_DATA:
      return ({
        ...state,
        liveData: [],
      });

    case types.MOD_COMMON_ITEM:
      return ({
        ...state,
        [action.componentType]: {
          ...state[action.componentType],
          [action.module]: {
            ...state[action.componentType][action.module],
            [action.name]: action.data,
          }
        }
      });
    default:
      return state;
  }
};
