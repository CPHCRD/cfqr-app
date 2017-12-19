// @flow
import React, { Component, PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { connect } from '../../actions';

class QuestionnaireType extends Component {
  static propTypes = {
    cfqrData: PropTypes.shape({
      elements: PropTypes.object
    }).isRequired,
    i18n: PropTypes.func,
    locale: PropTypes.string,
    changeQuestionnaire: PropTypes.func,
    questionnaire: PropTypes.shape({})
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
    const {
      i18n, cfqrData, questionnaire, changeQuestionnaire
    } = this.props;
    const { elements } = cfqrData;

    return (
      <div>
        <RadioButtonGroup name="qst-choice" defaultSelected={questionnaire.type} style={{ padding: '1rem 0' }}>
          {Object.keys(elements).map(elementKey => (<RadioButton
            name="qst-choice"
            key={`qst-choice-${elementKey}`}
            style={{ padding: '0.5rem 0', cursor: 'pointer' }}
            value={elementKey}
            label={
              <span>
                <strong>{i18n(`${elementKey}`)}</strong>
                <i style={{ display: 'block' }}>{i18n(`${elementKey}-description`)}</i>
              </span>
            }
            onTouchTap={() => changeQuestionnaire(elementKey)}
          />))}
        </RadioButtonGroup>
      </div>
    );
  }
}

export default connect(QuestionnaireType);
