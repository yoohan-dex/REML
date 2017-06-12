import { State } from '../../reducers';
import { GlobalState } from '../../reducers/global';
import { Dispatch } from 'redux';
import { SetInspectingType } from '../../actions/actions';
import { setInspectingType } from '../../actions/actionCreators';
import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';
import { Mosaic, MosaicWindow, MosaicParent } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import PreviewPanel from 'containers/PreviewPanel';
import { Device } from 'components/Simulator';
import EditorPanel, { EditorType } from 'containers/EditorPanel';
import LibraryPanel, { TreeType } from 'containers/LibraryPanel';
import ControlPanel from 'containers/ControlPanel';
import './styles.less';
import './styles.css';

export interface NewLayoutProps { }
export interface StateProps {
  global: GlobalState;
}
export interface DispatchProps {
  setInspectingType: (type: TreeType) => void;
}

// Make a simple extension class to preserve generic type checking in TSX
class ViewIdMosaic extends Mosaic<Panel> { }
interface TitleMap {
  [panelId: string]: {
    title: string,
    component: Function,
  };
}
const TITLE_MAP: TitleMap = {
  libraryPanel: {
    title: 'Library Panel',
    component: (type: TreeType) => <LibraryPanel type={type} />,
  },
  previewPanel: {
    title: 'Preview Panel',
    component: (type: Device) => <PreviewPanel deviceType={type} />,
  },
  editorPanel: {
    title: 'Editor Panel',
    component: (type: EditorType) => <EditorPanel type={type} />,
  },
  controlPanel: {
    title: 'Control Panel',
    component: (type: TreeType) => <ControlPanel />,
  }
};
const initialValue: MosaicParent<Panel> = {
  direction: 'row',
  first: {
    direction: 'column',
    first: {
      direction: 'row',
      first: 'libraryPanel',
      second: 'controlPanel'
    },
    second: 'editorPanel',
  },
  splitPercentage: 30,
  second: 'previewPanel',
};

interface NewLayoutState {
  currentNode: any;
  libraryPanel: ButtonCreatorProps[];
  previewPanel: ButtonCreatorProps[];
  editorPanel: ButtonCreatorProps[];
  controlPanel: ButtonCreatorProps[];
  types: {
    libraryPanel: TreeType,
    editorPanel: EditorType,
    previewPanel: Device,
    controlPanel: any,
  };
}

class NewLayout extends React.Component<NewLayoutProps & StateProps & DispatchProps, NewLayoutState> {
  constructor() {
    super();

    this.state = {
      currentNode: initialValue,
      libraryPanel: libraryButtons,
      previewPanel: previewButtons,
      editorPanel: editorButtons,
      controlPanel: [],
      types: {
        libraryPanel: TreeType.Static,
        editorPanel: EditorType.HTML,
        previewPanel: 0,
        controlPanel: 0,
      }
    };

  }

  componentDidMount() {
    // const eles = document.getElementsByClassName('mosaic-window-body');
    //   for (let i = 0; i < eles.length, i++) {
    //     eles.item(i)
    //   }
  }
  render() {
    return (
      <div style={{ position: 'fixed', width: '100%', top: 50, bottom: 0 }}>

        <ViewIdMosaic
          onChange={(node) => this.setState({ currentNode: node })}
          renderTile={(id: Panel) => {
            return (
              <MosaicWindow
                className="overflow-auto"
                key={id}
                title={TITLE_MAP[id].title}
                toolbarControls={this.buttonCreator(id, this.state[id])}
                draggable={true}
                children={TITLE_MAP[id].component(this.state.types[id])}
              />
            );
          }

          }
          initialValue={this.state.currentNode}

        />
      </div>

    );
  }

  private buttonCreator = (id: Panel, buttons: ButtonCreatorProps[] | undefined) => {
    if (buttons) {
      return buttons.map((button, i) => (
        <button
          key={i}
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          onClick={
            this.handleChange(id, i, button.type)}
          className={classnames(['pt-button pt-minimal', {
            [`pt-icon-${button.iconName}`]: !!button.iconName,
            'window-active-button': button.selected,
          }])}

        >
          {button.text && button.text}
        </button>
      ));
    }
    return [];
  }
  private handleChange = (id: Panel, idx: number, type: any) => {
    return () => {
      if (id === 'libraryPanel') {
        this.props.setInspectingType(type);
      }
      this.setState((p: NewLayoutState) => {
        p[id].forEach((v: ButtonCreatorProps, i: number) => {
          if (i === idx) {
            v.selected = true;
          } else {
            v.selected = false;
          }

        });
        p.types[id] = type;
        return p;
      });
    };
  }
}

type Panel = 'libraryPanel' | 'previewPanel' | 'editorPanel' | 'controlPanel';

const libraryButtons: ButtonCreatorProps[] = [
  { iconName: 'database', selected: true, type: TreeType.Static },
  { iconName: 'layers', selected: false, type: TreeType.Live },
];

const editorButtons: ButtonCreatorProps[] = [
  { text: 'HTML', selected: true, type: EditorType.HTML },
  { text: 'CSS', selected: false, type: EditorType.CSS },
];

const previewButtons: ButtonCreatorProps[] = [
  { iconName: 'desktop', selected: true, type: Device.PC },
  { iconName: 'mobile-phone', selected: false, type: Device.MOBILE },

];

interface ButtonCreatorProps {
  iconName?: string;
  text?: string;
  selected: boolean;
  type?: any;
}

const mapStateToProps = (state: State): StateProps => ({
  global: state.global,
});

const mapDispatchToProps = (dispatch: Dispatch<SetInspectingType>): DispatchProps => ({
  setInspectingType: (type: TreeType) => dispatch(setInspectingType(type)),
});

export default connect<StateProps, DispatchProps, NewLayoutProps>(
  mapStateToProps,
  mapDispatchToProps,
)(NewLayout);
