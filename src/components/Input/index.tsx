import * as React from 'react';

export interface InputProps {
  style?: React.CSSProperties;
  label: string;
  type?: string;
  placeholder?: string;
  onChange: (v: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

class Input extends React.PureComponent<InputProps, any> {
  render() {
    return (
      <label className="pt-label">
        {this.props.label}
        <input
          value={this.props.value}
          className="pt-input pt-fill"
          style={this.props.style}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          dir="auto"
        />
      </label>
    );
  }
}
export default Input;
