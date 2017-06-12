import * as React from 'react';
import { Tab2, Tabs2, Collapse } from '@blueprintjs/core';
import DataItem from './DataItem';
import { Messages, Theme } from 'modules/RenderMachine/typings';
export interface DataCardProps {
  messages: Messages;
  theme: Theme;
  setCommonValue:
  (
    componentType: 'theme' | 'messages',
    module: string,
    name: string,
    value: any) => void;
}
export interface DataCardState {
  activeTabId?: string;
  isOpen: string[];
}

class DataCard extends React.Component<DataCardProps, DataCardState> {
  public state: DataCardState = {
    activeTabId: 'messages',
    isOpen: [],
  };
  render() {
    return (
      <Tabs2
        renderActiveTabPanelOnly={false}
        animate={true}
        id="Tabs2Example"
        selectedTabId={this.state.activeTabId}
        key="datacard"
        onChange={this.handleTabChange}
      >
        <Tab2 id="messages" title="Messages" panel={<div>{this.renderblock('messages')}</div>} />
        <Tab2 id="theme" title="Theme" panel={<div>{this.renderblock('theme')}</div>} />
      </Tabs2>
    );
  }

  // private handleNavbarTabChange = (navbarTabId: string) => this.setState({ navbarTabId });
  private handleTabChange = (activeTabId: string) => this.setState({ activeTabId });

  private renderblock = (type: 'theme' | 'messages') => {
    const data = this.props[type];
    const items: any[] = [];
    for (let module in data) {
      if (module) {
        items.push(
          <div style={{ marginTop: 10 }}>
            <div
              className="pt-button pt-fill pt-minimal item "
              style={{ fontSize: '20px', marginBottom: 10 }}
              onClick={this.handleCollapse(module)}
            >
              {module}
            </div>
            <Collapse
              isOpen={this.state.isOpen[module]}
            >
              <div style={{ padding: 10 }}>{this.renderItems(data[module], this.handleCommonUpload(type)(module))}</div>
            </Collapse>
          </div>
        );
      }
    }
    return items;
  }

  private renderItems = (block: any, handleUpload: Function) => {
    const items: any[] = [];
    for (let name in block) {
      if (name) {
        items.push(
          <DataItem
            data={block[name]}
            handleValueChange={handleUpload(name)}
          />
        );
      }
    }
    return items;
  }
  private handleCollapse = (module: string) => () => {
    const state = this.state.isOpen[module];
    const isOpen = {
      ...this.state.isOpen,
      [module]: !state,
    };
    this.setState({
      isOpen,
    });
  }
  private handleCommonUpload = (type: 'theme' | 'messages') => (module: string) => (name: string) => (value: any) => {
    this.props.setCommonValue(type, module, name, value);
  }
}

export default DataCard;
