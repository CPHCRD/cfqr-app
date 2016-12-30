// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from '../actions';

class AboutPage extends Component {

  static propTypes = {
    i18n: PropTypes.func
  };

  render() {
    const { i18n } = this.props;

    return (
      <article>
        <h2>{ i18n('about-title') }</h2>
        <p>{ i18n('about-description') }</p>
        {process.env.isWeb ?
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

export default connect(AboutPage);
