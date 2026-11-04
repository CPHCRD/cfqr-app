import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from '../actions';

import Settings from './Settings';

class SettingsPage extends Component {
  static propTypes = {
    i18n: PropTypes.func
  };

  render() {
    const { i18n } = this.props;

    return (
      <article>
        <h2>{ i18n('settings-title') }</h2>
        <Settings />
      </article>
    );
  }
}

export default connect(SettingsPage);
