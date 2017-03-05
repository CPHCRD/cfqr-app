// @flow
import React, { Component, PropTypes } from 'react';
import semverCompare from 'semver-compare';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey600 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';

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
  saveNewQuestionnaires,
  getLatestAppVersion,
} from '../api/backup';
import { appVersion } from '../utils/misc';

const isWebVersion = process.env.isWeb;

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
    loggedOut: PropTypes.func,
    i18n: PropTypes.func,
    config: PropTypes.shape({
      app: PropTypes.shape({})
    })
  };

  state = {
    latestAppVersion: '',
    isUpdated: true,
  }

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
            errorLog(err);
            loggedOut();
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

    getLatestAppVersion()
      .then(latestAppVersion => {
        const isUpdated = (semverCompare(latestAppVersion, appVersion) < 1);
        this.setState({
          isUpdated,
          latestAppVersion,
        });
        return isUpdated;
      })
      .catch(err => {
        errorLog(err);
      });
  }

  render() {
    const { i18n, config } = this.props;
    const { latestAppVersion } = this.state;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Toolbar style={{ display: !this.state.isUpdated && isWebVersion ? 'none' : 'flex' }}>
            <ToolbarGroup firstChild={true}>
              <FontIcon className="material-icons">warning</FontIcon>
              <ToolbarTitle
                style={{ marginLeft: '0.5rem', fontSize: '1rem' }}
                text={`${i18n('new-version')} (${latestAppVersion})`}
              />
              <RaisedButton
                label={i18n('update')}
                href={config.app['cfqr-website']}
                primary={true}
                target="_blank"
              />
            </ToolbarGroup>
          </Toolbar>
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
