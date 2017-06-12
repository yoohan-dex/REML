import { Dialog } from '@blueprintjs/core/dist';
import * as classnames from 'classnames';
import { Device } from '../../components/Simulator';
import { setActiveTemplate, setCommonValue } from '../../actions/actionCreators';
import { getAllTemplate, updateResume } from '../../api/resume';
import { AuthState } from '../../reducers/auth';
import { State } from '../../reducers';
import { logout, signIn, signUp } from '../../actions/async/actionCreator';
import { SignInPayload, SignUpPayload } from '../../actions/async/actions';
import { Route, Switch } from 'react-router-dom';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Nav from './Nav';
import Stage from 'components/Stage';
import Card from 'components/TemplateCard';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ResumeEdit from '../../pages/ResumeEditPage';
import './styles.less';
import { ResumeStore } from 'modules/RenderMachine/typings';
export interface HomeProps { }
interface HomeState {
  templates: Template[];
  activeTemplate: Template;
  device: Device;
  success: boolean;
}

interface Template {
  name: string;
  username: string;
  template: any;
  img: string;
}
export interface StateProps {
  auth: AuthState;
  resuming: ResumeStore;
}

export interface DispatchProps {
  logout: () => void;
  signIn: (state: SignInPayload) => void;
  signUp: (state: SignUpPayload) => void;
  setActiveTemplate: (template: ResumeStore) => void;
  setCommonValue: (
    componentType: 'theme' | 'messages',
    module: string,
    name: string,
    value: any) => void;
}

type Props = HomeProps & StateProps & DispatchProps;
class Home extends React.Component<Props & RouteComponentProps<'/'>, HomeState> {
  state: HomeState = {
    templates: [],
    activeTemplate: {
      name: '',
      username: '',
      template: '',
      img: '',
    },
    device: Device.PC,
    success: false,
  };
  async componentDidMount() {
    const payload = await getAllTemplate();
    this.setState(p => ({
      templates: payload.data
    }));
  }
  render() {
    return (
      <div>
        <Nav leftSide={this.renderLeftSide()} rightSide={this.renderRightSide()} />
        <div style={{ position: 'absolute', top: 50, width: '100%', bottom: 0 }}>
          <Dialog isOpen={this.state.success} onClose={() => this.setState({ success: false })}>
            your resume : <a target="_blank" href={`localhost:8000/resume/${this.props.auth.user}`}>{`localhost:8000/resume/${this.props.auth.user}`}</a>
          </Dialog>
          <Switch>
            <Route
              path="/"
              exact
              children={
                () => (
                  <Stage >
                    {this.state.templates.map((v, i) => (
                      <Card
                        key={i}
                        name={v.name}
                        username={v.username}
                        img={v.img}
                        onClick={this.handleChooseTemplate(i)}
                      />
                    ))}
                  </Stage >
                )
              }
            />
            <Route
              path="/resume-edit"
              exact
              children={
                () => (
                  <ResumeEdit
                    device={this.state.device}
                    activeTemplate={this.props.resuming}
                    setCommonValue={this.props.setCommonValue}
                  />
                )
              }
            />
          </Switch>
        </div>
      </div>
    );
  }

  private handleChooseTemplate = (i: number) => {
    return () => {
      this.props.setActiveTemplate(this.state.templates[i].template);
      this.props.history.push('/resume-edit');
    };
  }
  private renderRightSide = () => {
    if (this.props.history.location.pathname === '/') {
      return <div />;
    } else {
      return (
        <div>
          <button
            onClick={() => {
              this.setState({ success: true });
              updateResume(
                { resume: this.props.resuming, data: {} }
              );
            }}
            className="pt-button pt-minimal pt-icon-upload"
          />
        </div>
      );
    }
  }
  private renderLeftSide = () => {
    if (this.props.history.location.pathname === '/') {
      return <input className="pt-input" placeholder="Search templates..." type="text" />;
    } else {
      return (
        <div>
          <button
            onClick={this.handleDevice}
            className={classnames('pt-button pt-minimal', {
              'pt-icon-desktop': this.state.device === Device.PC,
              'pt-icon-mobile-phone': this.state.device === Device.MOBILE,
            })}
          />
        </div>
      );
    }
  }

  private handleDevice = () => {
    this.setState({
      device: this.state.device === Device.MOBILE ? Device.PC : Device.MOBILE,
    });
  }
}

const component = connect<StateProps, DispatchProps, HomeProps & RouteComponentProps<'/'>>(
  (state: State): StateProps => ({
    auth: state.auth,
    resuming: state.resuming,
  }),
  (dispatch: any): DispatchProps => ({
    signIn: (state: SignInPayload) => dispatch(signIn(state)),
    signUp: (state: SignUpPayload) => dispatch(signUp(state)),
    logout: () => dispatch(logout()),
    setActiveTemplate: (template: ResumeStore) => dispatch(setActiveTemplate(template)),
    setCommonValue: (
      componentType: 'theme' | 'messages',
      module: string,
      name: string,
      value: any) => dispatch(setCommonValue(componentType, module, name, value)),
  })
)(Home);

export default withRouter(component);