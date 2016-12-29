// @flow
import React, { Component, PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';
import { cyan700 } from 'material-ui/styles/colors';

import { connect } from '../../actions';

class SettingsToggleStatistics extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    settings: PropTypes.shape({
      usage: PropTypes.bool
    }),
    toggleStatistics: PropTypes.func
  };

  render() {
    const { i18n, settings, toggleStatistics } = this.props;
    const { usage } = settings;
    return (
      <div className="settings__section">
        <h3 style={{ color: cyan700 }}>{i18n('auth-settings-statistics')}</h3>
        <strong style={{ display: 'block' }}>{i18n('auth-settings-statistics-intro')}</strong>
        <p style={{ display: 'block' }}>{i18n('auth-settings-statistics-text')}</p>
        <Toggle
          label={i18n('auth-settings-statistics-button')}
          style={{ marginBottom: '1.5rem' }}
          defaultToggled={usage}
          onToggle={(e, value) => toggleStatistics(value)}
        />
      </div>
    );
  }
}

export default connect(SettingsToggleStatistics);
