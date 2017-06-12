import * as React from 'react';
import * as Color from 'react-color';
import './styles.less';
import { StaticData } from 'modules/RenderMachine/typings';
export interface ValueInputerProps {
  data: StaticData;
  handleValueChange: (value: any) => void;
}

class ValueInputer extends React.PureComponent<ValueInputerProps, any> {
  color: Color.ChromePicker;

  public renderInput = () => {
    switch (this.props.data.type) {
      case 'string':
        return (
          <input
            onChange={e => this.props.handleValueChange(e.target.value)}
            value={this.props.data.default}
            placeholder="value"
            className="pt-input pt-fill input-block"
            type="text"
          />
        );
      case 'number':
        return (
          <input
            onChange={e => this.props.handleValueChange(e.target.value)}
            value={this.props.data.default}
            placeholder="number"
            className="pt-input pt-fill input-block"
            type="number"
          />
        );
      case 'color':
        return (
          <Color.ChromePicker
            onChange={e => this.props.handleValueChange(e.hex)}
            color={this.props.data.default}
            ref={() => this.setChromePickerStyle()}
          />
        );
      default:
        return (
          <input placeholder="value" />
        );
    }
  }

  render() {
    return (
      <div className="value-inputer">
        {this.renderInput()}
      </div>
    );
  }

  private setChromePickerStyle() {
    const picker = document.getElementsByClassName('chrome-picker');
    const len = picker.length;
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        // tslint:disable-next-line:no-string-literal
        picker[i]['style']['boxShadow'] = 'none';
        // tslint:disable-next-line:no-string-literal
        picker[i]['style']['width'] = '100%';
      }
    }
  }
}

export default ValueInputer;
