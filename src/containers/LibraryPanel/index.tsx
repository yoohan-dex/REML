import { Actions, ComponentType, GlobalState } from '../../reducers/global';
import {
  addStaticComponent,
  setActiveComponent,
  removeStaticComponent,
  setLiveComponent,
  setComponentType,
} from 'actions/actionCreators';
import { Dispatch } from 'redux';
import { State } from 'reducers';
import * as React from 'react';
import { connect } from 'react-redux';
import LiveComponents from 'components/LiveComponents';
import StaticComponents from 'components/StaticComponents';
import { StaticComponent, ResumeStore } from 'modules/RenderMachine/typings';
export const enum TreeType {
  Static = 0,
  Live,
}
export interface StateProps {
  store: ResumeStore;
  global: GlobalState;
}

export interface LibraryPanelProps {
  type: TreeType;
}

export interface DispatchProps {
  addStaticComponent(components: StaticComponent): void;
  setActiveComponent(name: string): void;
  setLiveComponent(name: string): void;
  removeStaticComponent(name: string): void;
  setComponentType(componentType: ComponentType): void;
}

type Props = LibraryPanelProps & DispatchProps & StateProps;

class LibraryPanel extends React.Component<Props, {}> {
  state = {
    newComponentCount: 0,
  };
  render() {
    const isStatic = this.props.type === TreeType.Static;
    return (
      <div style={{ overflow: 'auto' }}>
        <div style={{ display: isStatic ? 'block' : 'none' }}>
          <StaticComponents
            componentType={this.props.global.componentType}
            messages={this.props.store.messages}
            theme={this.props.store.theme}
            setComponentType={this.props.setComponentType}
            activeComponent={this.props.global.activeComponent}
            handleComponentAdding={this.handleComponentAdding}
            staticComponents={this.props.store.staticComponents}
            setActiveComponent={this.props.setActiveComponent}
            handleComponentRemove={this.handleComponentRemoving}
            inspectingType={this.props.global.inspectingType}
          />
        </div>
        <div style={{ display: !isStatic ? 'block' : 'none' }}>

          <LiveComponents
            liveComponentTree={this.props.store.liveComponents}
            inspectingType={this.props.global.inspectingType}
            liveComponent={this.props.global.liveComponent}
            setLiveComponent={this.props.setLiveComponent}
          />
        </div>
      </div>
    );
  }

  private handleComponentAdding = () => {

    const { newComponentCount } = this.state;
    const component: StaticComponent = {
      name: newComponentCount > 0 ? `Untitled${newComponentCount}` : 'Untitled',
      data: [],
      theme: [],
      children: [],
      codebase: {
        html: '',
        css: '',
      }
    };

    this.setState({ newComponentCount: newComponentCount + 1 });
    this.props.addStaticComponent(component);
    this.props.setActiveComponent(component.name);
  }
  private handleComponentRemoving = (name: string) => {
    if (this.props.global.activeComponent === name) {
      this.props.setActiveComponent('Resume');
    }
    this.props.removeStaticComponent(name);
  }
}

const mapStateToProps = (state: State): StateProps => ({
  store: state.resumeStore,
  global: state.global,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => ({
  addStaticComponent: (component: StaticComponent) => dispatch(addStaticComponent(component)),
  setActiveComponent: (name: string) => dispatch(setActiveComponent(name)),
  removeStaticComponent: (name: string) => dispatch(removeStaticComponent(name)),
  setLiveComponent: (name: string) => dispatch(setLiveComponent(name)),
  setComponentType: (componentType: ComponentType) => dispatch(setComponentType(componentType)),
});
export default connect<StateProps, DispatchProps, LibraryPanelProps>(
  mapStateToProps,
  mapDispatchToProps,
)(LibraryPanel);
