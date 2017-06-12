import * as React from 'react';
import Frame from 'react-frame-component';
import './styles.css';
export interface SimulatorProps {
  url?: string;
  device?: Device;
  isRotated: boolean;
}

export const enum Device {
  PC = 0,
  MOBILE,
  TABLET,
}

type DefaultDevice = {
  name: Device,
  width: number | string,
  height: number | string,
};

const DEFAULT_DEVICES: DefaultDevice[] = [
  { name: Device.PC, width: '100%', height: '100%' },
  { name: Device.MOBILE, width: 376, height: 667 },
  { name: Device.TABLET, width: 576, height: 768 },
];

const INITIAL_FRAME_CONTENT = `
  <!DOCTYPE html>
  <html>
    <head>${document.head.innerHTML}</head>
    <body>
      <div class="frame-root"></div>
    </body>
  </html>
`;

class Simulator extends React.Component<SimulatorProps, {}> {
  static defaultProps = {
    url: null,
    device: Device.PC,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ url: this.props.url }));
  }
  render() {
    return (
      <div className="root">
        {this.renderContent()}
      </div>
    );
  }

  private renderFrame(device: Device, url: string | undefined, children: React.ReactNode) {
    return (
      <Frame
        initialContent={INITIAL_FRAME_CONTENT}
        style={this.getDeviceDimensions(device)}
        src={url}
      >
        {!url && children}

      </Frame>
    );
  }

  private renderDevice(device: Device, url: string | undefined, children: React.ReactNode) {

    return (
      <div
        data-width={DEFAULT_DEVICES[device].width}
        data-height={DEFAULT_DEVICES[device].height}
        className="device"
        style={this.getDeviceDimensions(device)}
      >
        {this.renderFrame(device, url, children)}
      </div>
    );
  }

  private renderContent() {
    const { url, children, device } = this.props;
    return (
      <div className="content">
        {this.renderDevice(device ? device : Device.PC, url, children)}
      </div>
    );
  }

  private getDeviceDimensions(device: Device) {
    return ({
      width: DEFAULT_DEVICES[device].width,
      height: DEFAULT_DEVICES[device].height
    });
  }

}
export default Simulator;
