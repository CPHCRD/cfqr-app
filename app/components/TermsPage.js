// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from '../actions';

class TermsPage extends Component {

  static propTypes = {
    i18n: PropTypes.func
  };

  render() {
    const { i18n } = this.props;
    const termsList = i18n('terms-list');
    return (
      <article>
        <h2>{ i18n('terms-title') }</h2>
        <p>{ i18n('terms-description') }</p>
        <ul>
          {termsList.map((term, key) => <li key={key}>{term}</li>)}
        </ul>
      </article>
    );
  }
}

export default connect(TermsPage);
