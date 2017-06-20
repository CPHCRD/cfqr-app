// @flow
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { cyan700 } from 'material-ui/styles/colors';

import { connect } from '../actions';

class AdminLogin extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    auth: PropTypes.bool,
    authenticate: PropTypes.func
  };

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { i18n, auth, authenticate } = this.props;

    const authContent = auth ?
      <div /> :
      (<div>
        <i style={{ color: cyan700, display: 'block' }}>{i18n('auth-required')}</i>
        <FlatButton
          label={i18n('auth-button')}
          secondary
          icon={<FontIcon className="material-icons">vpn_key</FontIcon>}
          onTouchTap={this.handleOpen}
          style={{ margin: '1rem 0', cursor: 'pointer' }}
        />
        <Dialog
          title={i18n('auth-admin-login')}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>{i18n('auth-admin-enter-password')}</p>
          <TextField
            hintText={i18n('auth-admin-password')}
            type="password"
            autoFocus
            onChange={(e, value) => authenticate(value)}
          />
        </Dialog>
      </div>);

    return (authContent);
  }
}

export default connect(AdminLogin);
