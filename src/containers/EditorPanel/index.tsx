import { ComponentType } from 'reducers/global';
import { Tree } from 'lib/lynx/lib/format';
import { modStaticComponent } from '../../actions/actionCreators';
import { State } from 'reducers';
import lynx from 'lib/lynx';
import { Dispatch } from 'redux';
import * as React from 'react';
import Editor from 'components/Editor';
import { pushCodeHtml, pushCodeCss } from 'actions/actionCreators';
import { connect } from 'react-redux';
import './styles.css';
import { ResumeStore } from 'modules/RenderMachine/typings';

export interface Code {
  html: string;
  css: string;
}

export const enum EditorType {
  HTML = 0,
  CSS,
}
export interface EditorPanelProps {
  type: EditorType;

}

interface StateProps {
  resumeStore: ResumeStore;
  activeComponent: string;
  componentType: ComponentType;
}

interface DispatchProps {
  pushCodeHtml: (activeComponent: string, html: string) => void;
  pushCodeCss: (activeComponent: string, css: string) => void;
  modStaticComponent: (name: string, tokens: Tree[]) => void;
}

type Props = EditorPanelProps & StateProps & DispatchProps;

class EditorPanel extends React.Component<Props, {}> {

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        {this.props.resumeStore.staticComponents.map((v, i) => {
          return this.renderEditor(
            v.codebase,
            v.name === this.props.activeComponent,
            i,
          );
        })}
      </div>
    );
  }
  private renderEditor = (codebase: { html: string, css: string }, display: boolean, i: number) => {
    return (
      <div key={i} style={{ display: display ? 'block' : 'none' }}>
        <Editor
          type={this.props.type}
          handleCodeChange={this.handleCodeChange}
          value={codebase}
        />

      </div>
    );
  }
  private handleCodeChange = (newCode: string) => {
    const {
      activeComponent,
      pushCodeHtml,
      pushCodeCss,
      type,
      modStaticComponent,
      componentType,
    } = this.props;
    if (componentType === ComponentType.StaticComponent) {
      if (type === EditorType.HTML) {
        let tokens: Tree[] = [];
        try {
          tokens = lynx(newCode);
          modStaticComponent(activeComponent, tokens);

        } catch (e) {
          // ...
        }
        pushCodeHtml(activeComponent, newCode);
      } else {

        pushCodeCss(activeComponent, newCode);
      }
    }
  }
}

const mapStateToProps = (state: State): StateProps => ({
  resumeStore: state.resumeStore,
  activeComponent: state.global.activeComponent,
  componentType: state.global.componentType,
});

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => ({
  pushCodeHtml: (activeComponent: string, html: string) => dispatch(pushCodeHtml(activeComponent, html)),
  pushCodeCss: (activeComponent: string, css: string) => dispatch(pushCodeCss(activeComponent, css)),
  modStaticComponent: (name: string, tokens: Tree[]) => dispatch(modStaticComponent(name, tokens)),
});

export default connect<StateProps, DispatchProps, EditorPanelProps>(
  mapStateToProps,
  mapDispatchToProps,
)(EditorPanel);
