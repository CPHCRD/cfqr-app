// @flow
import React, { Component, PropTypes } from 'react';
import { cyan700 } from 'material-ui/styles/colors';

import { connect } from '../../actions';

class QuestionnaireIntroduction extends Component {
  static propTypes = {
    element: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired,
    i18n: PropTypes.func,
    locale: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    /* STATEFUL - PURE component
     * The component rendering will be controlled manually.
     */
    if (nextProps.locale !== this.props.locale) {
      return true;
    }
    return false;
  }

  render() {
    const { element, i18n } = this.props;
    const { key: elementKey } = element;
    return (
      <div key={elementKey} style={{ marginTop: '1rem', color: cyan700 }}>
        <p>
          <strong>{i18n(elementKey)}</strong>
        </p>
      </div>
    );
  }
}

export default connect(QuestionnaireIntroduction);
