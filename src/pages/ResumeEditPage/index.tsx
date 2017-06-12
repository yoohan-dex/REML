import * as React from 'react';
import { Preview } from 'containers/PreviewPanel';
import { Device } from 'components/Simulator';
import './styles.less';
import DataCard from './DataCard';
import { ResumeStore } from 'modules/RenderMachine/typings';
export interface ResumeEditPageProps {
  activeTemplate: ResumeStore;
  device: Device;
  setCommonValue:
  (
    componentType: 'theme' | 'messages',
    module: string,
    name: string,
    value: any) => void;
}

class ResumeEditPage extends React.Component<ResumeEditPageProps, any> {
  render() {
    return (
      <div className="resume-editor-wrap">
        <div className="resume-editor">
          <Preview deviceType={this.props.device} resumeStore={this.props.activeTemplate} />
        </div>
        <div className="resume-editor">
          <DataCard
            messages={this.props.activeTemplate.messages}
            theme={this.props.activeTemplate.theme}
            setCommonValue={this.props.setCommonValue}
          />
        </div>
      </div>
    );
  }
}

export default ResumeEditPage;
