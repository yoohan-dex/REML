import * as React from 'react';
import * as Color from 'react-color';
import './styles.less';
import { StaticData } from 'modules/RenderMachine/typings';
export interface DataItemProps {
  data: StaticData;
  handleValueChange: (value: any) => void;
}

class DataItem extends React.PureComponent<DataItemProps, any> {
  color: Color.ChromePicker;

  public renderInput = () => {
    switch (this.props.data.type) {
      case 'string':
        return (
          <div className="pt-form-group">
            <label className="pt-label pt-ui-text-large">
              {this.props.data.description}
            </label>
            <div className="pt-form-content">
              <input
                onChange={e => this.props.handleValueChange(e.target.value)}
                value={this.props.data.value}
                placeholder={this.props.data.default}
                className="pt-input pt-fill input-block"
                type="text"
                dir="auto"
              />
            </div>
          </div>

        );
      case 'number':
        return (
          <div className="pt-form-group">
            <label className="pt-label">
              {this.props.data.description}
            </label>
            <div className="pt-form-content">
              <input
                onChange={e => this.props.handleValueChange(e.target.value)}
                value={this.props.data.value}
                placeholder={this.props.data.default}
                className="pt-input pt-fill input-block"
                type="number"
              />
            </div>
          </div>

        );
      case 'color':
        return (
          <div className="pt-form-group">
            <label className="pt-label">
              {this.props.data.description}
            </label>
            <div className="pt-form-content">
              <Color.ChromePicker
                onChange={e => this.props.handleValueChange(e.hex)}
                color={this.props.data.value}
                ref={() => this.setChromePickerStyle()}
              />
            </div>
          </div>
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

export default DataItem;
