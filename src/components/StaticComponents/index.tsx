import * as React from 'react';
import { Tree, ITreeNode, ContextMenu, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import './styles.css';
import initialState from './initialState';
import { StaticComponent, Messages, Theme } from 'modules/RenderMachine/typings';
import { TreeType } from 'containers/LibraryPanel';
import { ComponentType } from 'reducers/global';
interface StaticComponentsProps {
  staticComponents: StaticComponent[];
  messages: Messages;
  theme: Theme;
  activeComponent: string;
  inspectingType: TreeType;
  handleComponentAdding: () => void;
  handleComponentRemove: (name: string) => void;
  setActiveComponent: (name: string) => void;
  setComponentType: (componentType: ComponentType) => void;
  componentType: ComponentType;
}

type State = {
  expands: {
    [idx: string]: boolean;
  };
  isContextMenuOpen: boolean;
};

class StaticComponents extends React.Component<StaticComponentsProps, State> {
  constructor() {
    super();
    this.state = {
      expands: {},
      isContextMenuOpen: false,
    };
  }
  render() {
    return (
      <Tree
        className="tree-overflow"
        contents={this.generateStaticNodes(this.props.staticComponents, this.props.messages)}
        onNodeClick={this.handleNodeClick}
        onNodeCollapse={this.handleNodeCollapse}
        onNodeExpand={this.handleNodeExpand}
        onNodeContextMenu={this.showContextMenu}
      />
    );
  }

  private showContextMenu = (node: ITreeNode, nodepath: number[], e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // invoke static API, getting coordinates from mouse event
    if (nodepath.length > 1) {
      this.showChildrenMenu(nodepath, e, node);
    } else {
      this.showParentMenu(nodepath, e);
    }
    // indicate that context menu is open so we can add a CSS class to this element
  }

  private showParentMenu = (nodepath: number[], e: React.MouseEvent<HTMLDivElement>) => {
    ContextMenu.show(
      <Menu>
        <MenuItem
          iconName="add"
          text="New"
          onClick={this.props.handleComponentAdding}
        />
        <MenuDivider />
        <MenuItem disabled={true} text={JSON.stringify(nodepath)} />
      </Menu>,
      { left: e.clientX, top: e.clientY },
      () => this.setState({ isContextMenuOpen: false }),
    );
  }

  private showChildrenMenu = (nodepath: number[], e: React.MouseEvent<HTMLDivElement>, node: ITreeNode) => {

    ContextMenu.show(
      <Menu>
        <MenuItem
          iconName="graph-remove"
          text="Remove"
          onClick={() => this.props.handleComponentRemove(node.label as string)}
        />
        <MenuDivider />
        <MenuItem disabled={true} text={JSON.stringify(nodepath)} />
      </Menu>,
      { left: e.clientX, top: e.clientY },
      () => this.setState({ isContextMenuOpen: false }),
    );
  }
  private generateStaticNodes = (
    staticComponents: StaticComponent[],
    messages: Messages,
  ): ITreeNode[] => {
    const nodes: ITreeNode[] = staticComponents.map(staticComponent => ({
      id: staticComponent.name,
      hasCaret: false,
      label: staticComponent.name,
      childNodes: [],
      isSelected: staticComponent.name === this.props.activeComponent,
    }));

    return [
      { ...initialState[0], childNodes: nodes, isExpanded: this.state.expands[initialState[0].id] },
      {
        ...initialState[ComponentType.Theme],
        childNodes: this.generateNode(this.props.theme, ComponentType.Theme),
        isExpanded: this.state.expands[initialState[ComponentType.Theme].id],
      },
      {
        ...initialState[ComponentType.Messages],
        childNodes: this.generateNode(this.props.messages, ComponentType.Messages),
        isExpanded: this.state.expands[initialState[ComponentType.Messages].id]
      },
    ];
  }

  private handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
    if (_nodePath.length > 1) {
      this.props.setComponentType(initialState[_nodePath[0]].id as ComponentType);
      this.props.setActiveComponent(nodeData.label as string);
    }
  }
  private handleNodeCollapse = (nodeData: ITreeNode) => {
    this.setState((s: State) => ({
      expands: {
        ...s.expands,
        [nodeData.id]: false,
      }
    }));
  }
  private handleNodeExpand = (nodeData: ITreeNode) => {
    this.setState((s: State) => ({
      expands: {
        ...s.expands,
        [nodeData.id]: true,
      }
    }));
  }

  private generateNode = (data: Messages | Theme, componentType: ComponentType) => {
    let messagesNode: ITreeNode[] = [];
    const node: any[] = [];
    for (let module in data) {
      if (module) {
        node.push({
          id: module,
          label: module,
          childNodes: [],
          hasCaret: false,
          isSelected:
          module === this.props.activeComponent &&
          componentType === this.props.componentType
        });
      }
    }

    return messagesNode = node.slice();
  }

}

export default StaticComponents;
