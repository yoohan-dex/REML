import * as React from 'react';
import * as classnames from 'classnames';

import { Tab2, Tabs2, Classes } from '@blueprintjs/core';
import './styles.css';
export interface Tab {
  id: string;
  title: string;
  panel?: JSX.Element;
}
export interface EditorPanelProps {
  tabs: Tab[];
}

type State = {
  navbarTabId: string,
};
class EditorPanel extends React.Component<EditorPanelProps, State> {
  constructor(props: EditorPanelProps) {
    super(props);
    this.state = {
      navbarTabId: props.tabs[0].id,
    };

  }

  render() {
    return (
      <div className={Classes.NAVBAR} style={{ height: 30 }}>
        <div className={classnames(Classes.ALIGN_LEFT)}>
          <Tabs2
            animate={true}
            id="editorPanel"
            onChange={(e: string) => this.handleNavbarTabChange(e)}
            renderActiveTabPanelOnly={true}
            selectedTabId={this.state.navbarTabId}
            defaultSelectedTabId={this.state.navbarTabId}

          >
            {this.props.tabs.map(this.renderTab)}
          </Tabs2>
        </div>
      </div>
    );
  }
  private renderTab(tab: Tab) {
    return (
      <Tab2 className="overflow-auto" key={tab.id} id={tab.id} title={tab.title} panel={tab.panel} />
    );
  }

  private handleNavbarTabChange(id: string) {
    this.setState({
      navbarTabId: id,
    });
  }
}

export default EditorPanel;
