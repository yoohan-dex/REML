import { TreeType } from 'containers/LibraryPanel';
import * as types from 'actions/constants';
import {
  SetActiveComponent,
  SetInspectingType,
  SetLiveComponent,
  SetComponentType,
} from 'actions/actions';

export const enum ComponentType {
  StaticComponent,
  Theme,
  Messages,
  Layout,
  Widget,
}
export type Actions =
  SetActiveComponent
  | SetInspectingType
  | SetLiveComponent
  | SetComponentType;

export interface GlobalState {
  activeComponent: string;
  liveComponent: string;
  inspectingType: TreeType;
  componentType: ComponentType;
}
const globalState: GlobalState = {
  activeComponent: 'Resume',
  liveComponent: 'Resume',
  inspectingType: TreeType.Static,
  componentType: ComponentType.StaticComponent,
};

export default (state: GlobalState = globalState, action: Actions): GlobalState => {
  switch (action.type) {
    case types.SET_ACTIVE_COMPONENT:
      return {
        ...state,
        activeComponent: action.id,
      };
    case types.SET_INSPECTING_TYPE:
      return {
        ...state,
        inspectingType: action.inspectingType,
      };
    case types.SET_LIVE_COMPONENT:
      return {
        ...state,
        liveComponent: action.id,
      };
    case types.SET_COMPONENT_TYPE:
      return {
        ...state,
        componentType: action.componentType,
      };
    default:
      return state;
  }
};
