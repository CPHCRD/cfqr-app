// @flow
import React, { Component, PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';
import { cyan700 } from 'material-ui/styles/colors';

import { connect } from '../../actions';

class SettingsToggleAnalytics extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    settings: PropTypes.shape({
      analytics: PropTypes.bool
    }),
    toggleAnalytics: PropTypes.func
  };

  render() {
    const { i18n, settings, toggleAnalytics } = this.props;
    const { analytics } = settings;
    return (
      <div className="settings__section">
        <h3 style={{ color: cyan700 }}>{i18n('auth-settings-analytics')}</h3>
        <strong style={{ display: 'block' }}>{i18n('auth-settings-analytics-intro')}</strong>
        <p style={{ display: 'block' }}>{i18n('auth-settings-analytics-text')}</p>
        <Toggle
          label={i18n('auth-settings-analytics-button')}
          style={{ marginBottom: '1.5rem' }}
          defaultToggled={analytics}
          onToggle={(e, value) => toggleAnalytics(value)}
        />
      </div>
    );
  }
}

export default connect(SettingsToggleAnalytics);
