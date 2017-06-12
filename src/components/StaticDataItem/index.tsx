import DataCard from 'components/DataCard';
import * as React from 'react';
import { Collapse } from '@blueprintjs/core';
import './styles.less';
import { StaticData } from 'modules/RenderMachine/typings';
interface StaticDataItemProps {
  data: StaticData;
  inspectingType: 'live' | 'static';
  handleDataUpload: (dataName: string, data: StaticData) => void;
  noRemove?: boolean;
  handleDataRemove?: (dataName: string) => void;
}

interface StaticDataItemState {
  isOpen: boolean;
}

class StaticDataItem extends React.Component<StaticDataItemProps, StaticDataItemState> {
  state: StaticDataItemState = {
    isOpen: false,
  };
  public render(): JSX.Element {
    return (
      <div className="pt-elevation-1 item-wrap">
        <div
          onClick={!this.state.isOpen ? this.openPopover : this.closePopover}
          className="pt-button pt-fill pt-minimal item"
        >
          {this.props.data.name}
        </div>
        <Collapse isOpen={this.state.isOpen}>
          <DataCard
            inspectingType={this.props.inspectingType}
            data={this.props.data}
            noRemove={this.props.noRemove}
            handleCancel={this.handleCancel}
            handleDataUpload={this.props.handleDataUpload}
            handleConfirm={this.handleConfirm}
          />
        </Collapse>
      </div>
    );
  }
  private handleConfirm = () => {
    this.closePopover();
  }

  private openPopover = () => {
    this.setState((s: StaticDataItemState): { isOpen: boolean } => ({
      isOpen: true,
    }));
  }

  private handleCancel = () => {
    this.closePopover();
    if (this.props.handleDataRemove) {
      this.props.handleDataRemove(this.props.data.name);
    }
  }

  private closePopover = () => {
    this.setState((s: StaticDataItemState): { isOpen: boolean } => ({
      isOpen: false,
    }));
  }
}

export default StaticDataItem;
