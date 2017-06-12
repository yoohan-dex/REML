import * as React from 'react';
import './styles.less';
import { StaticData } from 'modules/RenderMachine/typings';
import ValueInputer from 'components/ValueInputer';

export interface DataCardProps {
  handleDataUpload: (dataName: string, data: StaticData) => void;
  handleCancel: () => void;
  handleConfirm?: () => void;
  inspectingType: 'live' | 'static';
  data?: StaticData;
  noRemove?: boolean;
}

interface State {
  data: StaticData;
}

class DataCard extends React.PureComponent<DataCardProps, State> {
  constructor() {
    super();

    this.state = {
      data: {
        name: '',
        description: '',
        default: '',
        value: '',
        type: 'string',
      } as StaticData
    };
  }

  render() {
    if (this.props.data) {
      return (
        <div className="data-card">

          {this.getData('description')
            ? <p className="data-immutable input-block">{this.getData('description')}</p>
            : undefined}
          <ValueInputer
            data={this.props.data ? this.props.data : this.state.data}
            handleValueChange={v => this.handleChange('default', v)}
          />
          <div className="control-bar">
            {this.renderRemove()}
            <button
              className="pt-button pt-minimal pt-icon-tick"
              onClick={this.handleTick}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="data-card">
        <div className="control-bar">
          <button
            className={`pt-button pt-minimal ${!this.props.data ? 'pt-icon-cross' : 'pt-icon-trash'}`}
            onClick={this.props.handleCancel}
          />
          <div className="pt-ui-text">{this.props.data ? 'Modify Data' : 'New Data'}</div>
          <button
            className="pt-button pt-minimal pt-icon-tick"
            onClick={this.handleTick}
          />

        </div>

        {!this.props.data
          ? (
            <input
              className="pt-input pt-fill input-block"
              type="text"
              value={this.getData('name')}
              onChange={e => this.handleChange('name', e.target.value)}
              placeholder="Data Name"
            />
          )
          : (
            <p className="data-immutable input-block">{this.getData('name')}</p>
          )}
        {!this.props.data
          ? (
            <div className="pt-select pt-fill input-block">
              <select
                onChange={e => this.handleChange('type', e.target.value)}
                value={this.getData('type')}
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="color">Color</option>
              </select>
            </div>)
          : undefined}
        <ValueInputer
          data={this.props.data ? this.props.data : this.state.data}
          handleValueChange={v => this.handleChange('default', v)}
        />
        {!this.props.data
          ? (
            <textarea
              value={this.getData('description')}
              className="pt-input pt-fill input-block"
              type="text"
              onChange={e => this.handleChange('description', e.target.value)}
              placeholder="Description"
            />)
          : (
            this.getData('description')
              ? <p className="data-immutable input-block">{this.getData('description')}</p>
              : undefined)}
      </div>
    );
  }

  private renderRemove = () => {
    if (this.props.noRemove) {
      return <div />;
    }
    return this.props.inspectingType === 'static' ? (
      <button
        className={`pt-button pt-minimal ${!this.props.data ? 'pt-icon-cross' : 'pt-icon-trash'}`}
        onClick={this.props.handleCancel}
      />
    ) : <div />;
  }

  private getData = (type: string) => {
    return this.props.data ? this.props.data[type] : this.state.data[type];
  }

  private handleTick = () => {
    if (!this.props.data) {
      this.props.handleDataUpload(this.state.data.name, this.state.data);
    } else if (this.props.handleConfirm) {
      this.props.handleConfirm();
    }
  }

  private handleChange = (type: string, v: string) => {
    if (!this.props.data) {
      this.setState((s: State): State => ({
        data: {
          ...s.data,
          [type]: v,
        }
      }));
    } else {
      this.props.handleDataUpload(this.props.data.name, {
        ...this.props.data,
        [type]: v,
      } as StaticData);
    }
  }
}

export default DataCard;
