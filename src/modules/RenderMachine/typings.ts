import { Tree, ChildrenType } from 'lib/lynx/lib/format';

export interface ResumeStore {
  staticComponents: StaticComponent[];
  globalData: StaticData[];
  globalTheme: StaticData[];
  liveComponents: LiveComponents[];
  liveData: LiveData[];
  messages: Messages;
  theme: Theme;
}

// export type ComponentType = 'Widget' | 'Layout';

export type StaticComponent = {
  // type: ComponentType;
  name: string;
  data: StaticData[];
  theme: StaticData[];
  children: Tree[] | ChildrenType;
  codebase: Code;
};

export type Code = {
  html: string;
  css: string;
};

export type Expression = {
  componentId: string;
  data: string[];
  expression: string;
};

export interface LiveComponents {
  id: string;
  children: LiveComponents[];
}

export type StaticData = {
  description: string;
  name: string;
  type: string;
  default: any;
  value: any;
};

export type LiveData = {
  id: string;
  data: StaticData[];
  theme: StaticData[];
};

export type Styles = {
  [key: string]: string;
};

export interface Message {
  name: string;
  description: string;
  type: string;
  default: any;
  value: any;
}

export type Messages = {
  [module: string]: {
    [name: string]: StaticData;
  }
};

export type Theme = {
  [module: string]: {
    [name: string]: StaticData;
  }
};
