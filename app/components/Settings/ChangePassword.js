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
  password: '',
  repeatPassword: ''
};

class SettingsChangePassword extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    changePassword: PropTypes.func
  };

  state = INITIAL_STATE;

  componentDidUpdate() {
    const { changePassword } = this.props;

    const match = this.checkPasswords();
    if (match && this.state.open) {
      changePassword(this.state.password);
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

  changePassword(value) {
    const newState = { password: value };
    this.setState(newState);
  }

  repeatChangePassword(value) {
    const newState = { repeatPassword: value };
    this.setState(newState);
  }

  checkPasswords() {
    if (this.state.password === this.state.repeatPassword) {
      if (this.state.password.length < 1) {
        return false;
      }
      return true;
    }
    return false;
  }

  render() {
    const { i18n } = this.props;
    return (
      <div className="settings__section">
        <h3 style={{ color: cyan700 }}>{i18n('auth-settings-password')}</h3>
        <p style={{ display: 'block' }}>{i18n('auth-settings-password-text')}</p>
        <FlatButton
          label={i18n('auth-settings-password-button')}
          secondary
          icon={<FontIcon className="material-icons">vpn_key</FontIcon>}
          onTouchTap={this.handleOpen}
          style={{ marginBottom: '1.5rem' }}
        />
        <Dialog
          title={i18n('auth-admin-password')}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>{i18n('auth-admin-enter-password')}</p>
          <TextField
            hintText={i18n('auth-admin-password')}
            type="password"
            autoFocus
            onChange={(e, value) => this.changePassword(value)}
          />
          <p>{i18n('auth-admin-enter-password-again')}</p>
          <TextField
            hintText={i18n('auth-admin-password')}
            type="password"
            onChange={(e, value) => this.repeatChangePassword(value)}
          />
        </Dialog>
      </div>
    );
  }
}

export default connect(SettingsChangePassword);
