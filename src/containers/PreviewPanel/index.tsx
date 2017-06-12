import { ChildrenType } from '../../lib/lynx/lib/format';
import { Device } from 'components/Simulator';
import { State } from 'reducers';
import { Tree } from 'lib/lynx/lib/format';
import * as React from 'react';
import { connect } from 'react-redux';
import RenderMachine from 'modules/RenderMachine';
import StyleMachine from 'modules/StyleMachine';
import Simulator from 'components/Simulator';
import { ResumeStore } from 'modules/RenderMachine/typings';
export interface PreviewPanelProps {
  deviceType: Device;
}

export interface StateProps {
  resumeStore: ResumeStore;
}

export interface DispatchProps { }

export type Props = PreviewPanelProps & StateProps & DispatchProps;

export class Preview extends React.Component<Props, any> {
  render() {
    const { resumeStore } = this.props;
    let tokens: Tree[] | ChildrenType;
    if (resumeStore.staticComponents && resumeStore.staticComponents[0]) {
      tokens = resumeStore.staticComponents[0].children;
    } else {
      tokens = [];
    }
    return (
      <div>
        <Simulator isRotated={false} device={this.props.deviceType}>
          {this.props.resumeStore.staticComponents && <StyleMachine
            staticComponents={resumeStore.staticComponents}
            liveData={resumeStore.liveData}
            theme={resumeStore.theme}
          />}

          <RenderMachine
            tokens={tokens}
            resumeStore={resumeStore}
          />
        </Simulator>
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps, PreviewPanelProps>(
  (state: State) => ({
    resumeStore: state.resumeStore,
  }),
)(Preview);
