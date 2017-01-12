// @flow
import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';

import { connect } from '../../actions';
import AdminLogin from '../Login';
import SetttingsConnect from './Connect';
import SettingsChangePassphrase from './ChangePassphrase';
import SettingsToggleAnalytics from './ToggleAnalytics';

class Settings extends Component {

  static propTypes = {
    auth: PropTypes.bool
  };

  render() {
    const { auth } = this.props;

    if (!auth) {
      return (<AdminLogin />);
    }

    return (
      <div>
        <Paper className="settings__block" children={<SetttingsConnect />} zDepth={2} />
        <Paper className="settings__block" children={<SettingsChangePassphrase />} zDepth={2} />
        <Paper className="settings__block" children={<SettingsToggleAnalytics />} zDepth={2} />
      </div>
    );
  }
}

export default connect(Settings);
