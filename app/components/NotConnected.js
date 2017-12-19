// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {
  red400
} from 'material-ui/styles/colors';

import { connect } from '../actions';

class NotConnected extends Component {
  static propTypes = {
    config: PropTypes.shape({
      routes: PropTypes.object
    }),
    settings: PropTypes.shape({
      email: PropTypes.string
    }),
    database: PropTypes.shape({
      loaded: PropTypes.bool
    }),
    i18n: PropTypes.func
  };

  render() {
    const {
      config, i18n, settings, database
    } = this.props;
    const { routes } = config;

    if (!database.loaded || settings.email) {
      return (<div />);
    }

    return (
      <div>
        <Chip
          style={{ margin: '1rem 0' }}
          backgroundColor={red400}
        >
          <Avatar
            backgroundColor={red400}
            icon={
              <FontIcon className="material-icons">
              error_outline
              </FontIcon>
            }
          />
          <Link
            className="no-print"
            to={routes.settings.url}
            style={{ textDecoration: 'none', cursor: 'pointer', color: 'white' }}
          >
            {i18n('device-not-connected')}
          </Link>
        </Chip>
        <Link
          className="no-print"
          to={routes.settings.url}
          style={{ textDecoration: 'none', cursor: 'pointer', color: red400 }}
        >
          {i18n('device-not-connected-message')}
        </Link>
      </div>
    );
  }
}

export default connect(NotConnected);
