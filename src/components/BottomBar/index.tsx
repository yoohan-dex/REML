import * as React from 'react';
import './styles.css';
import LiveBreadcrumbs from '../LiveBreadcrumbs';
export interface BottomBarProps { }

class BottomBar extends React.Component<BottomBarProps, any> {
  render() {
    return (
      <footer
        style={{ position: 'absolute', boxShadow: 'none' }}
        className="bottom-bar pt-navbar "
      >
        <div className="pt-navbar-group pt-align-left">
          <LiveBreadcrumbs />
        </div>
        <div className="pt-navbar-group navbar-center-items">
          <button className="pt-button pt-minimal pt-icon-code" />

        </div>
        <div className="pt-navbar-group pt-align-right">
          <span className="pt-navbar-divider" />
          <button className="pt-button pt-minimal pt-icon-cog" />
        </div>
      </footer>
    );
  }
}

export default BottomBar;
