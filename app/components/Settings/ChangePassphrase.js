// @flow
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { cyan700 } from 'material-ui/styles/colors';

import { connect } from '../../actions';

const INITIAL_STATE = {
  open: false,
  passphrase: '',
  repeatPassphrase: ''
};

class SettingsChangePassphrase extends Component {
  static propTypes = {
    i18n: PropTypes.func,
    changePassphrase: PropTypes.func
  };

  state = INITIAL_STATE;

  componentDidUpdate() {
    const { changePassphrase } = this.props;

    const match = this.checkPassphrase();
    if (match && this.state.open) {
      changePassphrase(this.state.passphrase);
      this.resetState();
    }
  }

  resetState() {
    this.setState(INITIAL_STATE);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  checkPassphrase() {
    if (this.state.passphrase === this.state.repeatPassphrase) {
      if (this.state.passphrase.length < 1) {
        return false;
      }
      return true;
    }
    return false;
  }

  changePassphrase(value) {
    const newState = { passphrase: value };
    this.setState(newState);
  }

  repeatChangePassphrase(value) {
    const newState = { repeatPassphrase: value };
    this.setState(newState);
  }

  render() {
    const { i18n } = this.props;
    return (
      <div className="settings__section">
        <h3 style={{ color: cyan700 }}>{i18n('auth-settings-passphrase')}</h3>
        <p style={{ display: 'block' }}>{i18n('auth-settings-passphrase-text')}</p>
        <FlatButton
          label={i18n('auth-settings-passphrase-button')}
          secondary
          icon={<FontIcon className="material-icons">vpn_key</FontIcon>}
          onTouchTap={this.handleOpen}
          style={{ marginBottom: '1.5rem', cursor: 'pointer' }}
        />
        <Dialog
          title={i18n('auth-admin-passphrase')}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>{i18n('auth-admin-enter-passphrase')}</p>
          <TextField
            hintText={i18n('auth-admin-passphrase')}
            type="password"
            autoFocus
            onChange={(e, value) => this.changePassphrase(value)}
          />
          <p>{i18n('auth-admin-enter-passphrase-again')}</p>
          <TextField
            hintText={i18n('auth-admin-passphrase')}
            type="password"
            onChange={(e, value) => this.repeatChangePassphrase(value)}
          />
        </Dialog>
      </div>
    );
  }
}

export default connect(SettingsChangePassphrase);
