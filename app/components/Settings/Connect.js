// @flow
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { cyan700 } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

import { connect } from '../../actions';
import AdminLogin from '../Login';

import { updateUser } from '../../api/database';
import { register, login, logout, verify, resetPassword } from '../../api/auth';
import { updateLoginInfo, saveRemoteUserInfo, getNewQuestionnaires, saveNewQuestionnaires } from '../../api/backup';

class Settings extends Component {

  static propTypes = {
    errorLog: PropTypes.func,
    i18n: PropTypes.func,
    auth: PropTypes.bool,
    logged: PropTypes.bool,
    loggedIn: PropTypes.func,
    loggedOut: PropTypes.func,
    settings: PropTypes.shape({
      email: PropTypes.string
    })
  };

  state = {
    email: this.props.settings.email,
    password: '',
    message: ''
  };

  snackbarOpen(message) {
    this.setState({ message });
  }

  snackbarClose() {
    this.setState({ message: '' });
  }

  changeEmail(e, value) {
    this.setState({ email: value });
  }

  changePassword(e, value) {
    this.setState({ password: value });
  }

  loginUser() {
    const { errorLog, loggedIn, loggedOut, settings: userInfo } = this.props;

    if (this.state.email && this.state.password) {
      login(this.state.email, this.state.password)
        .then(() => updateLoginInfo(userInfo))
        .then(user => updateUser(user))
        .then(user => saveRemoteUserInfo(user))
        .then(user => {
          loggedIn(user);
          return true;
        })
        .then(() => getNewQuestionnaires())
        .then(() => saveNewQuestionnaires())
        .catch(err => {
          errorLog(err);
          loggedOut();
          this.snackbarOpen(err.message || err);
        });
    }
  }

  logoutUser() {
    const { errorLog } = this.props;

    logout()
      .then(() => true)
      .catch(err => {
        errorLog(err);
        this.snackbarOpen(err.message || err);
      });
  }

  registerUser() {
    const { errorLog } = this.props;

    if (this.state.email && this.state.password) {
      register(this.state.email, this.state.password)
        .then(() => verify())
        .then(() => {
          this.loginUser();
          return true;
        })
        .catch(err => {
          errorLog(err);
          this.snackbarOpen(err.message || err);
        });
    }
  }

  resetUserPassword() {
    const { errorLog, i18n } = this.props;

    if (this.state.email) {
      resetPassword(this.state.email)
        .then(() => {
          this.snackbarOpen(i18n('settings-email-sent'));
          return true;
        })
        .catch(err => {
          errorLog(err);
          this.snackbarOpen(err.message || err);
        });
    } else {
      this.snackbarOpen(i18n('settings-insert-email'));
    }
  }

  render() {
    const { i18n, auth, logged, settings } = this.props;
    const { email = '' } = settings;

    if (!auth) {
      return (<AdminLogin />);
    }

    return (
      <div>
        <h3 style={{ color: cyan700 }}>{i18n('settings-connect-title')}</h3>
        <p style={{ display: 'block', marginBottom: '-0.5rem' }}>{i18n('settings-connect-text')}</p>
        {!logged ? <div>
          <div style={{ marginBottom: '1rem' }}>
            <TextField
              id="user-email"
              floatingLabelText={i18n('settings-email-address')}
              type="email"
              defaultValue={email}
              onChange={this.changeEmail.bind(this)}
              style={{ maxWidth: '100%', display: 'block' }}
            />
            <TextField
              id="user-password"
              floatingLabelText={i18n('settings-password')}
              type="password"
              onChange={this.changePassword.bind(this)}
              style={{ maxWidth: '100%', display: 'block', marginTop: '-1rem' }}
            />
          </div>
          <RaisedButton
            label={i18n('settings-login')}
            labelPosition="before"
            primary={true}
            icon={<FontIcon className="material-icons">vpn_key</FontIcon>}
            style={{ margin: '0 0.5rem 1rem 0' }}
            onTouchTap={this.loginUser.bind(this)}
          />
          <FlatButton
            labelPosition="before"
            label={i18n('settings-register')}
            style={{ margin: '0 0.5rem 1rem 0' }}
            icon={<FontIcon className="material-icons">edit</FontIcon>}
            onTouchTap={this.registerUser.bind(this)}
          />
          <FlatButton
            labelPosition="before"
            label={i18n('settings-reset-password')}
            style={{ margin: '0 0.5rem 1rem 0' }}
            onTouchTap={this.resetUserPassword.bind(this)}
          />
          <Snackbar
            open={!!this.state.message}
            message={this.state.message}
            autoHideDuration={3000}
            onRequestClose={this.snackbarClose.bind(this)}
          />
        </div> : <div>
          <p style={{ marginTop: '1rem', color: cyan700 }}>{i18n('settings-connected')}</p>
          <FlatButton
            labelPosition="before"
            label={i18n('settings-logout')}
            style={{ margin: '0 0.5rem 1rem 0' }}
            icon={<FontIcon className="material-icons">exit_to_app</FontIcon>}
            onTouchTap={this.logoutUser.bind(this)}
          />
        </div> }
      </div>
    );
  }
}

export default connect(Settings);
