// @flow
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

import { connect } from '../../actions';

class QuestionnairePatient extends Component {
  static propTypes = {
    i18n: PropTypes.func,
    locale: PropTypes.string,
    setProperty: PropTypes.func,
    questionnaire: PropTypes.shape({
      patient: PropTypes.string
    })
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
    const { i18n, setProperty, questionnaire } = this.props;
    const currentAnswer = questionnaire.patient || '';

    return (
      <div className="question">
        <p>{i18n('questionnaire-patient-enter')}</p>
        <TextField
          hintText={i18n('questionnaire-patient-input')}
          floatingLabelText={i18n('questionnaire-patient-label')}
          floatingLabelFixed
          defaultValue={currentAnswer}
          onChange={(e, value) => setProperty('patient', value)}
        />
      </div>
    );
  }
}

export default connect(QuestionnairePatient);
