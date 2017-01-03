// @flow
import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

class Print extends Component {

  static propTypes = {
    style: PropTypes.instanceOf(Object)
  };

  render() {
    return (<FlatButton
      onTouchTap={() => { window.print(); }}
      secondary={true}
      icon={<FontIcon className="material-icons">print</FontIcon>}
      style={this.props.style}
    />);
  }
}

export default Print;
