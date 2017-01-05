// @flow
import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey600 } from 'material-ui/styles/colors';

import { connect } from '../actions';
import Menu from '../components/Menu';
import {
  updateUser,
  findOneIntoDatabase,
  INFO_OBJECT_ID
} from '../api/database';
import {
  firebaseAuth,
  updateLoginInfo,
  saveUserInfo
} from '../api/auth';

/* Mui elements */
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: blueGrey600
  },
});

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    loadDatabase: PropTypes.func,
    errorLog: PropTypes.func,
    loggedIn: PropTypes.func,
    loggedOut: PropTypes.func
  };

  componentDidMount() {
    const { loadDatabase, loggedIn, loggedOut, errorLog } = this.props;
    loadDatabase();

    firebaseAuth().onAuthStateChanged(authInfo => {
      if (authInfo) {
        // automatic login
        findOneIntoDatabase({ _id: INFO_OBJECT_ID })
          .then(user => {
            if (!user) {
              return updateUser();
            }
            return user;
          })
          .then(user => updateLoginInfo(user))
          .then(user => updateUser(user))
          .then(user => saveUserInfo(user))
          .then(user => {
            loggedIn(user);
            return true;
          })
          .catch(err => {
            loggedOut();
            errorLog(err);
          });
      } else {
        // logout
        findOneIntoDatabase({ _id: INFO_OBJECT_ID })
          .then(user => {
            if (!user) {
              return updateUser();
            }
            return Object.assign({}, user, {
              token: ''
            });
          })
          .then(user => updateLoginInfo(user))
          .then(user => updateUser(user))
          .then(user => {
            loggedOut(user);
            return true;
          })
          .catch(err => {
            errorLog(err);
          });
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Menu />
          <div className="page">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(App);
