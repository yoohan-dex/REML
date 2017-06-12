import { ComponentType } from '../../reducers/global';
import { modLiveData } from 'actions/actionCreators';
import { TreeType } from '../LibraryPanel';
import { capitialize } from 'lib/lynx/lib/format';
import { State } from 'reducers';
import {
  modStaticComponentName,
  setActiveComponent,
  addStaticData,
  modStaticData,
  removeStaticData,
  modCommonItem,
} from 'actions/actionCreators';
import { DataType, findIdxById, findIdxByName } from '../../reducers/resume';
import { GlobalState } from 'reducers/global';
import * as React from 'react';
import { connect } from 'react-redux';
import { EditableText, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import './styles.less';
import { ResumeStore, StaticData } from 'modules/RenderMachine/typings';
import DataCard from 'components/DataCard';
import StaticDataItem from 'components/StaticDataItem';

type IsOpen = {
  data: boolean;
  theme: boolean;
};
export interface ControlPanelProps {
}

export interface ControlPanelState {
  isOpen: IsOpen;
  activeComponent: string;
  editing: boolean;
}

export interface DispatchProps {
  modStaticComponentName: (activeComponent: string, value: string) => void;
  setActiveComponent: (componentName: string) => void;
  addStaticData: (activeComponent: string, dataType: DataType, data: StaticData) => void;
  modStaticData: (activeComponent: string, dataType: DataType, dataName: string, data: StaticData) => void;
  removeStaticData: (activeComponent: string, dataType: DataType, dataName: string) => void;
  modLiveData: (id: string, dataType: DataType, dataName: string, value: any) => void;
  modCommonItem: (componentType: 'theme' | 'messages', module: string, name: string, data: StaticData) => void;
}

export interface StateProps {
  global: GlobalState;
  resumeStore: ResumeStore;
}

export type Props = ControlPanelProps & StateProps & DispatchProps;

class ControlPanel extends React.Component<Props, ControlPanelState> {

  state: ControlPanelState = {
    activeComponent: this.props.global.activeComponent,
    editing: false,
    isOpen: {
      data: false,
      theme: false,
    },
  };
  componentWillUpdate(nP: Props) {
    const { global } = nP;
    const { editing, activeComponent } = this.state;
    if (!editing && activeComponent !== global.activeComponent) {
      this.setState({
        activeComponent: global.activeComponent,
      });
    }
  }
  render() {
    return (
      <div className="control-panel">
        <div className="control-bar">
          {this.props.global.componentType === ComponentType.StaticComponent && this.renderTitle()}
        </div>
        {this.renderControlItem()}
      </div>
    );
  }

  private renderControlItem = () => {

    if (this.props.global.inspectingType === TreeType.Static) {
      switch (this.props.global.componentType) {
        case ComponentType.StaticComponent:
          return this.renderComponentData();
        case ComponentType.Messages:
          return this.renderOtherItem('messages');
        case ComponentType.Theme:
          return this.renderOtherItem('theme');
        default:
          return this.renderComponentData();
      }
    } else {
      return this.renderComponentData();
    }
  }

  private renderOtherItem = (type: 'theme' | 'messages') => {
    const data = this.props.resumeStore[type];
    const items: any[] = [];
    for (let module in data) {
      if (module === this.props.global.activeComponent) {
        for (let name in data[module]) {
          if (name) {
            items.push(
              <StaticDataItem
                noRemove={true}
                inspectingType="static"
                data={data[module][name]}
                key={name}
                handleDataUpload={this.handleCommonUpload(type)}
              />
            );
          }
        }
      }
    }
    return items;
  }
  private handleCommonUpload = (type: 'theme' | 'messages') => (name: string, data: StaticData) => {
    this.props.modCommonItem(type, this.props.global.activeComponent, name, data);
  }
  private renderComponentData = () => {
    return (
      <div>
        {this.renderItem('data')}
        {this.renderDataItem('data')}
        {this.renderItem('theme')}
        {this.renderDataItem('theme')}
      </div>
    );
  }

  private renderStaticData = (type: 'data' | 'theme') => {
    const idx = findIdxByName(this.props.global.activeComponent, this.props.resumeStore);
    const data = this.props.resumeStore.staticComponents[idx][type];
    return data.map(d => (
      <StaticDataItem
        inspectingType="static"
        data={d}
        key={d.name}
        handleDataUpload={this.handleStaticDataUpload(type === 'data' ? DataType.Data : DataType.Theme)}
        handleDataRemove={this.handleStaticDataRemove(type === 'data' ? DataType.Data : DataType.Theme)}
      />
    ));
  }

  private renderLiveData = (type: 'data' | 'theme') => {
    let idx = findIdxById(this.props.global.liveComponent, this.props.resumeStore);
    let data: StaticData[] = [];
    // tslint:disable-next-line:no-console
    if (
      idx > -1 &&
      this.props.resumeStore.liveData.length > 0
    ) {
      data = this.props.resumeStore.liveData[idx][type];
    }

    return data.map((d, i) => (
      <StaticDataItem
        inspectingType="live"
        data={d}
        key={i}
        handleDataUpload={this.handleLiveDataUpload(type === 'data' ? DataType.Data : DataType.Theme)}
      />
    ));
  }

  private handleStaticDataRemove = (dataType: DataType) => (name: string) => {
    this.props.removeStaticData(this.props.global.activeComponent, dataType, name);
  }

  private handleLiveDataUpload = (dataType: DataType) => (dataName: string, data: StaticData) => {
    this.props.modLiveData(this.props.global.liveComponent, dataType, dataName, data);
  }

  private openPopover = (dataType: DataType) => () => {
    this.setState((s: ControlPanelState): { isOpen: IsOpen } => ({
      isOpen: {
        data: dataType === DataType.Data,
        theme: dataType === DataType.Theme,
      }
    }));
  }

  private closePopover = () => {
    this.setState((s: ControlPanelState): { isOpen: IsOpen } => ({
      isOpen: {
        data: false,
        theme: false,
      }
    }));
  }

  private handleStaticDataConfirm = (dataType: DataType) => (name: string, data: StaticData) => {
    if (data.name) {
      const idx = findIdxByName(this.props.global.activeComponent, this.props.resumeStore);
      const isExist = this.props.resumeStore.staticComponents[idx].data.filter(d => d.name === data.name).length > 0;
      if (!isExist) {
        this.props.addStaticData(this.props.global.activeComponent, dataType, data);
        this.closePopover();
      }
    }
  }

  private handleStaticDataUpload = (dataType: DataType) => (dataName: string, data: StaticData) => {
    this.props.modStaticData(this.props.global.activeComponent, dataType, dataName, data);
  }

  private cleanState = (v?: string) => {
    this.setState(() => ({
      activeComponent: v ? v : this.props.global.activeComponent,
    }));
  }
  private renderItem = (type: 'data' | 'theme') => {
    const isData = type === 'data';
    return (
      <div className="control-bar">
        <p>{isData ? 'Data' : 'Theme'}</p>
        <Popover
          isOpen={this.state.isOpen[type]}
          content={
            (
              <DataCard
                inspectingType="static"
                handleDataUpload={this.handleStaticDataConfirm(isData ? DataType.Data : DataType.Theme)}
                handleCancel={this.closePopover}
              />
            )
          }
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM_RIGHT}
          popoverClassName="popover-235"
        >
          {this.renderAddingButton(type)}
        </Popover>
      </div>
    );
  }

  private renderTitle = () => {
    const { global } = this.props;
    const isStatic = global.inspectingType === TreeType.Static;
    return isStatic
      ? (
        <EditableText
          value={this.state.activeComponent}
          className="title"
          onEdit={() => {
            this.setState({
              editing: true,
            });
          }}
          onChange={
            v => {
              this.setState(() => ({
                activeComponent: v,
              }));
            }
          }
          onConfirm={
            v => {
              const idx = findIdxByName(capitialize(v), this.props.resumeStore);
              this.setState({
                editing: false,
              });
              if (idx !== -1) {
                this.cleanState();
              } else {
                const value = capitialize(v);
                this.props.setActiveComponent(value);
                this.props.modStaticComponentName(global.activeComponent, value);
                this.cleanState(value);
              }
            }
          }
        />)
      : (
        <p className="title">{this.props.global.liveComponent}</p>
      );
  }

  private renderAddingButton = (type: 'data' | 'theme') => {
    const isData = type === 'data';
    return this.props.global.inspectingType === TreeType.Static
      ? (
        <button
          onClick={this.openPopover(isData ? DataType.Data : DataType.Theme)}
          className="pt-button pt-minimal pt-icon-add"
        >
          New
        </button>
      ) : <div />;
  }
  private renderDataItem = (type: 'data' | 'theme') => {
    return this.props.global.inspectingType === TreeType.Static
      ? this.renderStaticData(type)
      : this.renderLiveData(type);
  }

}

const mapStateToProps = (state: State): StateProps => ({
  global: state.global,
  resumeStore: state.resumeStore,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  modStaticComponentName: (activeComponent: string, value: string) =>
    dispatch(modStaticComponentName(activeComponent, value)),
  setActiveComponent: (name: string) =>
    dispatch(setActiveComponent(name)),
  addStaticData: (activeComponent: string, dataType: DataType, data: StaticData) =>
    dispatch(addStaticData(activeComponent, dataType, data)),
  modStaticData: (activeComponent: string, dataType: DataType, dataName: string, data: StaticData) =>
    dispatch(modStaticData(activeComponent, dataType, dataName, data)),
  removeStaticData: (activeComponent: string, dataType: DataType, dataName: string) =>
    dispatch(removeStaticData(activeComponent, dataType, dataName)),
  modLiveData: (id: string, dataType: DataType, dataName: string, value: any) =>
    dispatch(modLiveData(id, dataType, dataName, value)),
  modCommonItem: (
    componentType: 'theme' | 'messages',
    module: string,
    name: string,
    data: StaticData
  ) =>
    dispatch(modCommonItem(componentType, module, name, data)),
});

export default connect<StateProps, DispatchProps, ControlPanelProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ControlPanel);
