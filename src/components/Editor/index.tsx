import * as React from 'react';
import * as CodeMirror from 'react-codemirror';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css';
import './styles.css';
import { EditorType } from 'containers/EditorPanel';

export interface EditorProps {
  type: EditorType;
  value: {
    html: string;
    css: string;
  };
  handleCodeChange: (code: string) => void;
}

class Editor extends React.Component<EditorProps, {}> {
  static defaultProps = {
    type: 'xml',
  };
  render() {
    const isHtml = this.props.type === EditorType.HTML;
    return (
      <div style={{ height: '100%' }}>
        <div style={{ display: isHtml ? 'block' : 'none' }}>
          <CodeMirror
            key="html"
            className="editor-background"
            value={this.props.value.html}
            onChange={this.handleChange}
            options={{
              mode: 'xml',
              viewportMargin: 5,
              tabSize: 2,
            }}
          />
        </div>
        <div style={{ display: !isHtml ? 'block' : 'none' }}>
          <CodeMirror
            key="css"
            className="editor-background"
            value={this.props.value.css}
            onChange={this.handleChange}
            options={{
              mode: 'css',
              viewportMargin: 5,
              tabSize: 2,
            }}
          />
        </div>
      </div>
    );
  }

  private handleChange = (newValue: string) => {
    this.props.handleCodeChange(newValue);
  }
}

// function translateType(type: EditorType) {
//   switch (type) {
//     case EditorType.HTML:
//       return 'xml';
//     case EditorType.CSS:
//       return 'css';
//     default:
//       return 'xml';
//   }
// }
export default Editor;
