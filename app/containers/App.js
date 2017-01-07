// @flow
import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey600 } from 'material-ui/styles/colors';

import { connect } from '../actions';
import Menu from '../components/Menu';
import {
  getUser,
  updateUser
} from '../api/database';
import {
  firebaseAuth
} from '../api/auth';
import {
  saveRemoteUserInfo,
  getRemoteUserInfo,
  getNewQuestionnaires,
  saveNewQuestionnaires
} from '../api/backup';

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
        getUser()
          .then(user => getRemoteUserInfo(user))
          .then(user => updateUser(user))
          .then(user => saveRemoteUserInfo(user))
          .then(user => {
            loggedIn(user);
            return true;
          })
          .then(() => getNewQuestionnaires())
          .then(() => saveNewQuestionnaires())
          .catch(err => {
            loggedOut();
            errorLog(err);
          });
      } else {
        // logout
        getUser()
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
