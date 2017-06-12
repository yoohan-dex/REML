import { DataType } from '../reducers/resume';
import { Tree } from '../lib/lynx/lib/format';
import * as types from './constants';
import { Action } from 'redux';
import { StaticComponent, StaticData, ResumeStore } from 'modules/RenderMachine/typings';
import { TreeType } from 'containers/LibraryPanel';
import { ComponentType } from 'reducers/global';

export interface PushCodeHtml extends Action {
  type: types.PUSH_CODES_HTML;
  componentName: string;
  html: string;
}

export interface PushCodeCss extends Action {
  type: types.PUSH_CODES_CSS;
  componentName: string;
  css: string;
}

export interface AddStaticComponent extends Action {
  type: types.ADD_STATIC_COMPONENT;
  component: StaticComponent;
}

export interface RemoveStaticComponent extends Action {
  type: types.REMOVE_STATIC_COMPONENT;
  name: string;
}

export interface ModStaticComponent extends Action {
  type: types.MOD_STATIC_COMPONENT;
  name: string;
  tokens: Tree[];
}

export interface ModStaticComponentName extends Action {
  type: types.MOD_STATIC_COMPONENT_NAME;
  activeComponent: string;
  value: string;
}

export interface AddStaticData extends Action {
  type: types.ADD_STATIC_DATA;
  activeComponent: string;
  dataType: DataType;
  data: StaticData;
}

export interface ModStaticData extends Action {
  type: types.MOD_STATIC_DATA;
  activeComponent: string;
  dataType: DataType;
  data: StaticData;
  dataName: string;
}

export interface RemoveStaticData extends Action {
  type: types.REMOVE_STATIC_DATA;
  activeComponent: string;
  dataType: DataType;
  name: string;
}

export interface SetActiveComponent extends Action {
  type: types.SET_ACTIVE_COMPONENT;
  id: string;
}

export interface SetInspectingType extends Action {
  type: types.SET_INSPECTING_TYPE;
  inspectingType: TreeType;
}

export interface SetComponentType extends Action {
  type: types.SET_COMPONENT_TYPE;
  componentType: ComponentType;
}
export interface SetLiveComponent extends Action {
  type: types.SET_LIVE_COMPONENT;
  id: string;
}

export interface ModLiveData extends Action {
  type: types.MOD_LIVE_DATA;
  id: string;
  dataType: DataType;
  dataName: string;
  data: StaticData;
}
export interface RemoveAllLiveData extends Action {
  type: types.REMOVE_ALL_LIVE_DATA;
}

export interface ModCommonItem extends Action {
  type: types.MOD_COMMON_ITEM;
  componentType: 'theme' | 'messages';
  module: string;
  name: string;
  data: StaticData;
}

export interface SetActiveTemplate extends Action {
  type: types.SET_ACTIVE_TEMPLATE;
  template: ResumeStore;
}

export interface ChangeTemplate extends Action {
  type: types.CHANGE_TEMPLATE;
  template: ResumeStore;
}

export interface SetCommonValue extends Action {
  type: types.SET_COMMON_VALUE;
  componentType: 'theme' | 'messages';
  module: string;
  name: string;
  value: any;
}