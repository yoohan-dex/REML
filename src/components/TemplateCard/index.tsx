import * as React from 'react';
import './styles.less';
export interface TemplateCardProps {
  name: string;
  username: string;
  img: string;
  onClick: () => void;
}

class TemplateCard extends React.Component<TemplateCardProps, any> {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        style={{
          backgroundImage: `url('${this.props.img}')`,
          height: 300,
          padding: 0,
        }}
        className="pt-card pt-interactive template-card template-inner-card"
      >
        <div className="template-title">
          <h2>{this.props.name}</h2>
          <h4>{this.props.username}</h4>

        </div>
      </div>
    );
  }
}

export default TemplateCard;
