import { DataType } from '../reducers/resume';
import { TreeType } from '../containers/LibraryPanel';
import { Tree } from 'lib/lynx/lib/format';
import {
  AddStaticComponent,
  AddStaticData,
  ChangeTemplate,
  ModCommonItem,
  ModLiveData,
  ModStaticComponent,
  ModStaticComponentName,
  ModStaticData,
  PushCodeCss,
  PushCodeHtml,
  RemoveStaticComponent,
  RemoveStaticData,
  SetActiveComponent,
  SetActiveTemplate,
  SetCommonValue,
  SetComponentType,
  SetInspectingType,
  SetLiveComponent
} from './actions';

import * as types from './constants';
import { StaticComponent, StaticData, ResumeStore } from 'modules/RenderMachine/typings';
import { ComponentType } from 'reducers/global';
export const pushCodeHtml = (componentName: string, html: string): PushCodeHtml => ({
  type: types.PUSH_CODES_HTML,
  componentName,
  html,
});

export const pushCodeCss = (componentName: string, css: string): PushCodeCss => ({
  type: types.PUSH_CODES_CSS,
  componentName,
  css,
});

export const setActiveComponent = (id: string): SetActiveComponent => ({
  type: types.SET_ACTIVE_COMPONENT,
  id,
});

export const setLiveComponent = (id: string): SetLiveComponent => ({
  type: types.SET_LIVE_COMPONENT,
  id,
});

export const setComponentType = (componentType: ComponentType): SetComponentType => ({
  type: types.SET_COMPONENT_TYPE,
  componentType,
});

export const setInspectingType = (treeType: TreeType): SetInspectingType => ({
  type: types.SET_INSPECTING_TYPE,
  inspectingType: treeType,
});

export const addStaticComponent = (component: StaticComponent): AddStaticComponent => ({
  type: types.ADD_STATIC_COMPONENT,
  component,
});

export const removeStaticComponent = (name: string): RemoveStaticComponent => ({
  type: types.REMOVE_STATIC_COMPONENT,
  name,
});

export const addStaticData = (activeComponent: string, dataType: DataType, data: StaticData): AddStaticData => ({
  type: types.ADD_STATIC_DATA,
  activeComponent,
  dataType,
  data,
});

export const modStaticData =
  (activeComponent: string, dataType: DataType, dataName: string, data: StaticData): ModStaticData => ({
    type: types.MOD_STATIC_DATA,
    activeComponent,
    dataType,
    dataName,
    data,
  });

export const removeStaticData = (activeComponent: string, dataType: DataType, name: string): RemoveStaticData => ({
  type: types.REMOVE_STATIC_DATA,
  activeComponent,
  dataType,
  name,
});

export const modStaticComponent = (name: string, tokens: Tree[]): ModStaticComponent => ({
  type: types.MOD_STATIC_COMPONENT,
  name,
  tokens,
});

export const modStaticComponentName = (activeComponent: string, value: string): ModStaticComponentName => ({
  type: types.MOD_STATIC_COMPONENT_NAME,
  activeComponent,
  value,
});

export const modLiveData = (id: string, dataType: DataType, dataName: string, data: StaticData): ModLiveData => ({
  type: types.MOD_LIVE_DATA,
  id,
  dataType,
  dataName,
  data,
});

export const modCommonItem = (
  componentType: 'theme' | 'messages',
  module: string,
  name: string,
  data: StaticData,
): ModCommonItem => ({
  type: types.MOD_COMMON_ITEM,
  componentType,
  module,
  name,
  data,
});

export const setActiveTemplate = (
  template: ResumeStore,
): SetActiveTemplate => ({
  type: types.SET_ACTIVE_TEMPLATE,
  template,
});

export const changeTemplate = (
  template: ResumeStore,
): ChangeTemplate => ({
  type: types.CHANGE_TEMPLATE,
  template,
});

export const setCommonValue = (
  componentType: 'theme' | 'messages',
  module: string,
  name: string,
  value: any,
): SetCommonValue => ({
  type: types.SET_COMMON_VALUE,
  componentType,
  module,
  name,
  value,
});