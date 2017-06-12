import * as React from 'react';
import TopBar from '../TopBar';
import NewLayout from 'containers/NewLayout';
import { RouteComponentProps } from 'react-router-dom';
// import LiveComponents from '../LiveComponents';
// import ControlPanel from '../ControlPanel';
// import EditorPanel from '../EditorPanel';
import './styles.css';
export interface LayoutProps {
}

class Layout extends React.Component<LayoutProps & RouteComponentProps<'/template-edit'>, {}> {

  render(): JSX.Element {
    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <TopBar />
        <NewLayout />
      </div>
    );
  }
}

export default Layout;
