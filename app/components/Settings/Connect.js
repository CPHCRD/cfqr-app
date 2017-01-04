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
import { register, login, saveUserInfo } from '../../api/auth';

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

  updateUserObjectWithLoginInfo(user) {
    const { settings } = this.props;

    return Object.assign({}, settings, {
      uid: user.uid,
      email: user.email,
      lastLogin: new Date().toString()
    });
  }

  loginUser() {
    const { errorLog, loggedIn, loggedOut } = this.props;

    if (this.state.email && this.state.password) {
      login(this.state.email, this.state.password)
        .then(user => this.updateUserObjectWithLoginInfo(user))
        .then(user => updateUser(user))
        .then(saveUserInfo)
        .then(() => {
          loggedIn();
          return true;
        })
        .catch(err => {
          errorLog(err);
          loggedOut();
          this.snackbarOpen(err.message || err);
        });
    }
  }

  registerUser() {
    const { errorLog } = this.props;

    if (this.state.email && this.state.password) {
      register(this.state.email, this.state.password)
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

  render() {
    const { i18n, auth, logged } = this.props;

    return (
      (!auth) ? <AdminLogin /> :
      <div>
        <h3 style={{ color: cyan700 }}>{i18n('settings-connect-title')}</h3>
        <p style={{ display: 'block' }}>{i18n('settings-connect-text')}</p>
        {!logged ? <div>
          <div style={{ marginBottom: '1rem' }}>
            <TextField
              id="user-email"
              floatingLabelText={i18n('settings-email-address')}
              type="email"
              onChange={this.changeEmail.bind(this)}
            />
            <TextField
              id="user-password"
              floatingLabelText={i18n('settings-password')}
              type="password"
              onChange={this.changePassword.bind(this)}
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
          <Snackbar
            open={!!this.state.message}
            message={this.state.message}
            autoHideDuration={3000}
            onRequestClose={this.snackbarClose.bind(this)}
          />
        </div> : 'Logged in.' }
      </div>
    );
  }
}

export default connect(Settings);
