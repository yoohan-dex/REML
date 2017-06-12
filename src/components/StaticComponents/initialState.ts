import { ITreeNode } from '@blueprintjs/core';
import { ComponentType } from 'reducers/global';
export default [
  {
    id: ComponentType.StaticComponent,
    hasCaret: true,
    iconName: 'projects',
    label: 'Component',
    childNodes: [],
  },
  {
    id: ComponentType.Theme,
    hasCaret: true,
    iconName: 'style',
    label: 'Theme',
    childNodes: [{
      id: 'layout',
      hasCaret: false,
      iconName: 'page-layout',
      label: 'layout',
      childNodes: [],
    }, {
      id: 'style',
      hasCaret: false,
      iconName: 'style',
      label: 'style',
      childNodes: [],
    }],
  },
  // {
  //   id: ComponentType.Layout,
  //   hasCaret: true,
  //   iconName: 'page-layout',
  //   label: 'Layout',
  //   childNodes: [],
  // },
  // {
  //   id: ComponentType.Widget,
  //   hasCaret: true,
  //   iconName: 'wrench',
  //   label: 'Widget',
  //   childNodes: [],
  // },
  {
    id: ComponentType.Messages,
    hasCaret: true,
    iconName: 'document',
    label: 'Message',
    childNodes: [{
      id: 'contact',
      hasCaret: false,
      iconName: 'contact',
      label: 'Contact',
      childNodes: [],
    }],
  }

] as ITreeNode[];