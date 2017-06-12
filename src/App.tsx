import * as React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import store from './store';
import './App.less';

import Routes from './routes';
// import NewLayout from './components/NewLayout';

const history = createBrowserHistory();
class App extends React.Component<{}, null> {
  render() {
    return (
      <Provider store={store(history)}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
