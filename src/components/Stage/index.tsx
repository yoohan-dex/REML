import * as React from 'react';
import './styles.less';
export interface StageProps {
}

class Stage extends React.Component<StageProps, any> {
  render() {
    return (
      <section className="home-stage">
        {this.props.children}
      </section>
    );
  }
}

export default Stage;
