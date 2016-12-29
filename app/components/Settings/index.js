// @flow
import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';

import { connect } from '../../actions';
import AdminLogin from '../Login';
import SettingsChangePassword from './ChangePassword';
import SettingsToggleAnalytics from './ToggleAnalytics';
import SettingsToggleStatistics from './ToggleStatistics';

class Settings extends Component {

  static propTypes = {
    auth: PropTypes.bool
  };

  render() {
    const { auth } = this.props;

    return (
      (!auth) ? <AdminLogin /> :
      <div>
        <Paper className="settings__block" children={<SettingsChangePassword />} zDepth={2} />
        <Paper className="settings__block" children={<SettingsToggleAnalytics />} zDepth={2} />
        <Paper className="settings__block" children={<SettingsToggleStatistics />} zDepth={2} />
      </div>
    );
  }
}

export default connect(Settings);
