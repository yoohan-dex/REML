import { SignInPayload, SignUpPayload } from '../../actions/async/actions';
import * as React from 'react';
import { Dialog, Button, Intent } from '@blueprintjs/core';
import Input from 'components/Input';
export interface AuthBoxProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'signIn' | 'signUp';
  handleSubmit: (value: SignInPayload | SignUpPayload) => void;
  handleTypeChange: () => void;
  message: string;
}

export interface State {
  signIn: SignInPayload;
  signUp: SignUpPayload;
}

class AuthBox extends React.Component<AuthBoxProps, State> {
  state: State = {
    signIn: {
      email: '',
      password: '',
    },
    signUp: {
      email: '',
      username: '',
      password: '',
      retypePassword: '',
    },
  };
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <Dialog
        title={this.renderText()}
        isOpen={this.props.isOpen}
        canOutsideClickClose
        onClose={this.props.onClose}
        style={{ width: 300 }}
      >
        <div style={{ padding: '20px 20px 0' }}>
          <form
            className="pt-form-group"
            onSubmit={e => {
              e.preventDefault();
              this.props.handleSubmit(this.state[this.props.type]);
            }}
          >
            {this.renderForm()}
            <Button
              style={{ margin: '10px 0' }}
              label="Sign in"
              type="submit"
              intent={Intent.PRIMARY}
            >
              {this.renderText()}
            </Button>
            <a onClick={this.props.handleTypeChange}>To {this.props.type === 'signIn' ? 'Sign Up' : 'Sign In'}</a>
            <p>{this.props.message}</p>
          </form>
        </div>
      </Dialog>
    );
  }
  private renderText = () => this.props.type === 'signIn' ? 'Sign In' : 'Sign Up';
  private renderForm = () => {
    if (this.props.type === 'signIn') {
      return this.renderSignIn();
    }
    return this.renderSignUp();
  }
  private renderSignIn = () => {
    return (
      <div>
        <Input
          value={this.state.signIn.email}
          onChange={this.handleChange('email')}
          label="email"
          type="text"
        />
        <Input
          value={this.state.signIn.password}
          onChange={this.handleChange('password')}
          label="password"
          type="password"
        />
      </div>
    );
  }
  private renderSignUp = () => {
    return (
      <div>
        <Input
          value={this.state.signUp.email}
          onChange={this.handleChange('email')}
          label="Email"
          type="text"
        />
        <Input
          value={this.state.signUp.username}
          onChange={this.handleChange('username')}
          label="Username"
          type="text"
        />
        <Input
          value={this.state.signUp.password}
          onChange={this.handleChange('password')}
          label="Password"
          type="password"
        />
        <Input
          value={this.state.signUp.retypePassword}
          onChange={this.handleChange('retypePassword')}
          label="retype password"
          type="password"
        />
      </div>
    );
  }
  private handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type } = this.props;
    const value = e.target.value;
    this.setState(p => ({
      ...p,
      [type]: {
        ...p[type],
        [name]: value,
      }
    }));
  }
}

export default AuthBox;
