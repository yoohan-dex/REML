import * as React from 'react';
import './styles.less';
export interface ResumeProps {
}

class Resume extends React.PureComponent<ResumeProps, any> {
  render() {
    return (
      <div className="resume-container">
        {this.props.children}
      </div>
    );
  }
}

export default Resume;
