// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from '../../actions';

class QuestionnaireSection extends Component {
  static propTypes = {
    element: PropTypes.shape({
      key: PropTypes.string.isRequired,
      content: PropTypes.array.isRequired
    }).isRequired,
    renderElement: PropTypes.func.isRequired,
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
    const { element, renderElement } = this.props;
    const { key: elementKey, content: elementContent } = element;

    return (
      <div key={elementKey} className="section">
        <hr className="section__divider" />
        {elementContent.map(subElement => renderElement(subElement))}
      </div>
    );
  }
}

export default connect(QuestionnaireSection);
