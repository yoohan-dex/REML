import { AuthState } from 'reducers/auth';
import { Link } from 'react-router-dom';
import { State } from 'reducers';
import { logout, signIn, signUp } from 'actions/async/actionCreator';
import { SignInPayload, SignUpPayload } from 'actions/async/actions';
import * as React from 'react';
import AuthBox from 'components/AuthBox';
import { Popover, Menu, MenuItem, PopoverInteractionKind, Position } from '@blueprintjs/core';
import { connect } from 'react-redux';
export interface HomeProps {
  leftSide: any;
  rightSide: any;
}
interface HomeState {
  isOpen: boolean;
  authType: 'signIn' | 'signUp';
}
export interface StateProps {
  auth: AuthState;
}
export interface DispatchProps {
  logout: () => void;
  signIn: (state: SignInPayload) => void;
  signUp: (state: SignUpPayload) => void;
}

type Props = HomeProps & StateProps & DispatchProps;
class Home extends React.Component<Props, HomeState> {
  state: HomeState = {
    isOpen: false,
    authType: 'signIn'
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
      <nav className="pt-navbar">
        <div className="index-nav">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading"><Link className="common-link" to="/">Feeley</Link></div>
            {this.props.leftSide}
          </div>
          <div className="pt-navbar-group pt-align-right">

            <AuthBox
              isOpen={this.state.isOpen}
              onClose={() => this.setState({ isOpen: false })}
              type={this.state.authType}
              handleSubmit={this.handleAuth}
              handleTypeChange={this.handleAuthType}
              message={this.props.auth.error}
            />
            {this.props.rightSide}
            {this.renderAuthButton()}
          </div>
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
              <MenuItem
                text="Edit"
                children={
                  <div>
                    <li>
                      <Link className="pt-menu-item pt-popover-dismiss" to="/resume-edit">Create Resume</Link>
                    </li>
                    <li>
                      <Link className="pt-menu-item pt-popover-dismiss" to="/template-edit">Create Template</Link>
                    </li>
                  </div>

                }
              />
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

export default connect<StateProps, DispatchProps, HomeProps>(
  (state: State): StateProps => ({
    auth: state.auth,
  }),
  (dispatch: any): DispatchProps => ({
    signIn: (state: SignInPayload) => dispatch(signIn(state)),
    signUp: (state: SignUpPayload) => dispatch(signUp(state)),
    logout: () => dispatch(logout())
  })
)(Home);
