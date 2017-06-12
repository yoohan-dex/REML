import * as React from 'react';
import * as classnames from 'classnames';
import { CollapsibleList, Position, MenuItem, Classes, IMenuItemProps } from '@blueprintjs/core';

export interface LiveBreadcrumbsProps {
}

class LiveBreadcrumbs extends React.Component<LiveBreadcrumbsProps, any> {
  render() {
    return (
      <CollapsibleList
        className={Classes.BREADCRUMBS}
        visibleItemCount={2}
        dropdownTarget={<span className={Classes.BREADCRUMBS_COLLAPSED} />}
        dropdownProps={{ position: Position.TOP_LEFT }}
        renderVisibleItem={this.renderBreadcrumb}
      >
        <MenuItem iconName="folder-close" text="All files" href="#" />
        <MenuItem iconName="folder-close" text="Users" href="#" />
        <MenuItem iconName="folder-close" text="Jane Person" href="#" />
        <MenuItem iconName="folder-close" text="My documents" href="#" />
        <MenuItem iconName="folder-close" text="Classy dayjob" href="#" />
        <MenuItem iconName="document" text="How to crush it" />
      </CollapsibleList>
    );
  }

  protected renderBreadcrumb(props: IMenuItemProps) {
    if (props.href) {
      return <a className={Classes.BREADCRUMB}>{props.text}</a>;
    } else {
      return <span className={classnames([Classes.BREADCRUMB, Classes.BREADCRUMB_CURRENT])}>{props.text}</span>;
    }
  }
}


export default LiveBreadcrumbs;
