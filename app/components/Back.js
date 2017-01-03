// @flow
import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import { connect } from '../actions';

class Back extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    style: PropTypes.instanceOf(Object)
  };

  render() {
    const { i18n } = this.props;

    return (
      <IconButton
        tooltip={i18n('back')}
        onTouchTap={() => { window.history.back(); }}
        style={this.props.style}
      >
        <FontIcon className="material-icons">arrow_back</FontIcon>
      </IconButton>
    );
  }
}

export default connect(Back);
