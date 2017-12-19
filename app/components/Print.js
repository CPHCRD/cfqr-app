// @flow
import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import { connect } from '../actions';

class Print extends Component {
  static propTypes = {
    i18n: PropTypes.func,
    style: PropTypes.instanceOf(Object)
  };

  render() {
    const { i18n } = this.props;

    return (
      <IconButton tooltip={i18n('print')} onTouchTap={() => { window.print(); }} style={this.props.style}>
        <FontIcon className="material-icons">print</FontIcon>
      </IconButton>
    );
  }
}

export default connect(Print);
