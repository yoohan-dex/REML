import { logout, signIn, signUp, updateResume, updateTempate } from '../../actions/async/actionCreator';
import { State } from '../../reducers';
import { ResumePayload, SignInPayload, SignUpPayload, TemplatePayload } from '../../actions/async/actions';
import { AuthState } from '../../reducers/auth';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { Classes, Popover, Menu, MenuItem, PopoverInteractionKind, Position } from '@blueprintjs/core';
import AuthBox from 'components/AuthBox';
import { ResumeStore } from 'modules/RenderMachine/typings';
interface TopBarProps {
}
const alignLeftGroup = classnames(Classes.NAVBAR_GROUP, Classes.ALIGN_LEFT);
const alignRightGroup = classnames(Classes.NAVBAR_GROUP, Classes.ALIGN_RIGHT);
interface TopBarState {
  isOpen: boolean;
  authType: 'signIn' | 'signUp';
  templateName: string;
}
interface StateProps {
  auth: AuthState;
  resume: ResumeStore;
}

interface DispatchProps {
  signIn: (state: SignInPayload) => void;
  signUp: (state: SignUpPayload) => void;
  updateResume: (state: ResumePayload) => void;
  updateTemplate: (state: TemplatePayload) => void;
  logout: () => void;
}

type Props = TopBarProps & StateProps & DispatchProps;
class TopBar extends React.Component<Props, TopBarState> {
  state: TopBarState = {
    isOpen: false,
    authType: 'signIn',
    templateName: '',
  };
  componentDidUpdate(p: Props) {
    if (this.props.auth.user && !p.auth.user) {
      this.setState(() => ({
        isOpen: false,
      }));
    }
  }
  render() {
    return (
      <nav style={{ boxShadow: 'none' }} className={Classes.NAVBAR}>
        <div className={alignLeftGroup}>
          <div className={Classes.NAVBAR_HEADING}><Link className="common-link" to="/">Feeley</Link></div>
        </div>
        <AuthBox
          isOpen={this.state.isOpen}
          onClose={() => this.setState({ isOpen: false })}
          type={this.state.authType}
          handleSubmit={this.handleAuth}
          handleTypeChange={this.handleAuthType}
          message={this.props.auth.error}
        />
        <div className={alignRightGroup}>
          {this.renderPublishButton()}
          <span className={Classes.NAVBAR_DIVIDER} />
          {this.renderAuthButton()}
          <button className="pt-button pt-minimal pt-icon-notifications" />
        </div>
      </nav>
    );
  }
  private renderAuthButton = () => {
    if (!this.props.auth.user) {
      return (
        <div>
          <button onClick={() => this.setState({ isOpen: true })} className="pt-button pt-minimal pt-icon-user" />
        </div>
      );
    } else {
      return (
        <Popover
          content={
            <Menu>
              <MenuItem text={this.props.auth.user} />
              <MenuItem onClick={this.props.logout} text="Log out" />
            </Menu>
          }

          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM_RIGHT}
        >
          <button className="pt-button pt-minimal pt-icon-user" />
        </Popover>
      );
    }
  }

  private renderPublishButton = () => {
    if (!this.props.auth.user) {
      return (
        <button
          onClick={() => this.setState({ isOpen: true })}
          className="pt-button pt-minimal pt-icon-upload"
        >
          Publish
        </button>
      );
    }
    return (
      <Popover
        content={
          <form
            onSubmit={this.handlePublish}
            style={{ margin: 10 }}
          >
            <input
              onChange={e => this.setState({ templateName: e.target.value })}
              value={this.state.templateName}
              placeholder="Your template Name"
              className="pt-input pt-fill input-block"
              type="text"
            />
            <button
              style={{ marginTop: 10, right: 0 }}
              className="pt-button pt-minimal"
            >
              Confirm
            </button>
          </form>}
        interactionKind={PopoverInteractionKind.CLICK}
        position={Position.BOTTOM_RIGHT}
      >
        <button className="pt-button pt-minimal pt-icon-upload">
          Publish
        </button>
      </Popover>
    );

  }
  private handlePublish = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { templateName } = this.state;
    if (templateName) {
      this.props.updateTemplate({
        name: templateName,
        template: this.props.resume,
      });
    }
  }
  private handleAuthType = () => {
    this.setState(p => ({
      authType: p.authType === 'signIn' ? 'signUp' : 'signIn',
    }));
  }

  private handleAuth = (state: SignInPayload | SignUpPayload) => {
    if (this.state.authType === 'signIn') {
      this.props.signIn(state);
    } else {
      this.props.signUp(state as SignUpPayload);
    }
  }
}

export default connect<StateProps, DispatchProps, TopBarProps>(
  (state: State): StateProps => ({
    auth: state.auth,
    resume: state.resumeStore,
  }),
  (dispatch: any): DispatchProps => ({
    signIn: (state: SignInPayload) => dispatch(signIn(state)),
    signUp: (state: SignUpPayload) => dispatch(signUp(state)),
    updateResume: (state: ResumePayload) => dispatch(updateResume(state)),
    updateTemplate: (state: TemplatePayload) => dispatch(updateTempate(state)),
    logout: () => dispatch(logout())
  })
)(TopBar);
