// @flow
import React, { PureComponent, PropTypes } from 'react';
import { connect } from '../../actions';

class QuestionnaireText extends PureComponent {

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
      <div key={elementKey}>
        <p>{i18n(elementKey)}</p>
      </div>
    );
  }
}

export default connect(QuestionnaireText);
