// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import { connect } from '../actions';

class HomePage extends Component {

  static propTypes = {
    config: PropTypes.shape({
      routes: PropTypes.object
    }),
    i18n: PropTypes.func
  };

  render() {
    const { config, i18n } = this.props;
    const { routes } = config;

    return (
      <article>
        <h2>{ i18n('home-title') }</h2>
        <p>{ i18n('home-description') }</p>
        <RaisedButton
          containerElement={<Link to={routes.questionnaire.url}>{i18n('home-button-start')}</Link>}
          label={i18n('home-button-start')}
          secondary
          style={{ margin: '1rem 0' }}
          icon={<FontIcon className="muidocs-icon-custom-github" />}
        />
      </article>
    );
  }

}

export default connect(HomePage);
