import { ChildrenType, Tree } from '../../lib/lynx/lib/format';
import * as React from 'react';
import render from './render';
import Resume from './Resume';
import 'normalize.css';
import { ResumeStore } from './typings';
export interface RenderMachineProps {
  resumeStore: ResumeStore;
  tokens: Tree[] | ChildrenType;
}

export interface RenderMachineState {
  content: any;
}

class RenderMachine extends React.Component<RenderMachineProps, RenderMachineState> {
  state: RenderMachineState = {
    content: null,
  };
  // shouldComponentUpdate(nP: RenderMachineProps) {
  //   return (this.props.tokens !== nP.tokens)
  //     || ((this.props.resumeStore !== nP.resumeStore));
  // }
  render() {
    const { resumeStore, tokens } = this.props;
    let content = '';
    try {
      content = render(tokens, resumeStore);
    } catch (e) {
      console.log(e);
    }

    return (
      <div>
        <Resume>
          <div style={{ overflowX: 'hidden' }} className="Resume">
            {content}
          </div>
        </Resume>

      </div>
    );
  }

  // private renderContent = () => {
  //   const { resumeStore, tokens } = this.props;
  //   try {
  //     const content = render(tokens, resumeStore);
  //     this.setState((s: RenderMachineState) => ({
  //       content,
  //     }));
  //     return content;
  //   } catch (e) {
  //     // tslint:disable-next-line:no-console
  //     console.log(e);
  //     return this.state.content;
  //   }
  // }
}

export default RenderMachine;
