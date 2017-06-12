import * as React from 'react';

export interface ContextPopoverProps {
  title: string;
  handleChange: (value: any) => void;
}

class ContextPopover extends React.PureComponent<ContextPopoverProps, any> {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <input className="pt-input" onChange={this.props.handleChange} />
      </div>
    );
  }
}


export default ContextPopover;
