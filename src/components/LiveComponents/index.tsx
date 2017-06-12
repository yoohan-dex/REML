import * as React from 'react';
import { ITreeNode, Tree } from '@blueprintjs/core';
const paul = require('paul');
// import initialState from './initialState';
import { LiveComponents as LiveComponentTree } from 'modules/RenderMachine/typings';
import './styles.css';
import { TreeType } from 'containers/LibraryPanel';
export interface LiveComponentsProps {
  liveComponentTree: LiveComponentTree[];
  liveComponent: string;
  inspectingType: TreeType;
  setLiveComponent: (name: string) => void;
}

type State = {
  expands: { [idx: string]: boolean },
};

class LiveComponents extends React.Component<LiveComponentsProps, State> {
  public constructor(props: LiveComponentsProps) {
    super(props);
    this.state = {
      expands: {},
    };
  }

  render() {
    return (
      <Tree
        className="tree-overflow"
        contents={this.generateNodes(this.props.liveComponentTree)}
        onNodeClick={this.handleNodeClick}
        onNodeCollapse={node => this.handleNodeExpand(node, false)}
        onNodeExpand={node => this.handleNodeExpand(node, true)}
      />
    );
  }

  private handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent<HTMLElement>) => {

    if (!e.shiftKey) {
      this.props.setLiveComponent(nodeData.label as string);
    }
  }

  private handleNodeExpand = (nodeData: ITreeNode, expand: boolean) => {
    this.setState((s: State) => ({
      expands: {
        ...s.expands,
        [nodeData.id]: expand,
      }
    }));
  }

  private generateNodes = (liveComponents: LiveComponentTree[]): ITreeNode[] => {
    return paul.walk(liveComponents, (node: LiveComponentTree, walk: any) => {
      if (node.children.length > 0) {
        return ({
          hasCaret: true,
          isExpanded: this.state.expands[node.id],
          isSelected: this.props.liveComponent === node.id,
          id: node.id,
          label: node.id,
          childNodes: walk(node.children),
        } as ITreeNode);
      }
      return ({
        hasCaret: false,
        isSelected: this.props.liveComponent === node.id,
        id: node.id,
        label: node.id,
        childNodes: [],
      } as ITreeNode);
    });
  }
}

export default LiveComponents;
