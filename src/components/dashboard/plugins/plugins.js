import React from 'react';
import { Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

const pluginDependencies = [
  { name: 'Toolbar' }
];

export class ToolbarButton extends React.PureComponent {
  render() {
    return (
      <Plugin name="ToolbarButton" dependencies={pluginDependencies}>
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          {this.props.button}
        </Template>
      </Plugin>
    );
  }
}

export class ToolbarDropdown extends React.PureComponent {
  render() {
    return (
      <Plugin name="ToolbarDropdown" dependencies={pluginDependencies}>
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          {this.props.dropdown}
        </Template>
      </Plugin>
    );
  }
}