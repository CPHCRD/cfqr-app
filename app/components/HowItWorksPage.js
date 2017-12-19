/* eslint-disable react/jsx-closing-tag-location */
// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from '../actions';

import appConfig from '../config/app.json';

class HowItWorksPage extends Component {
  static propTypes = {
    i18n: PropTypes.func
  };

  render() {
    const { i18n } = this.props;

    return (
      <article>
        <h2>{i18n('how-it-works-title')}</h2>
        <p>{i18n('how-it-works-description')}</p>

        <p>{i18n('how-it-works-description-1')}</p>
        <p>
          {i18n('how-it-works-description-2-a')} <a
            target="_blank"
            rel="noopener noreferrer"
            href={`mailto:${appConfig['cfqr-email']}`}
          >
            {appConfig['cfqr-email']}
          </a>. {i18n('how-it-works-description-2-b')} <a
            target="_blank"
            rel="noopener noreferrer"
            href={`mailto:${appConfig['qst-email']}`}
          >
            {appConfig['qst-email']}
          </a>. {i18n('how-it-works-description-2-c')} <a
            target="_blank"
            rel="noopener noreferrer"
            href={appConfig['cfqr-github']}
          >
            Github
          </a>.
        </p>
        <p>{i18n('how-it-works-description-3')}</p>
        {process.env.isWeb === 'web' ?
          <div>
            <a href="https://www.netlify.com">
              <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" alt="netlify-logo" />
            </a>
          </div> : ''
        }
      </article>
    );
  }
}

export default connect(HowItWorksPage);
