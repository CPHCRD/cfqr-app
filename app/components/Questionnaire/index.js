// @flow
import React, { PureComponent, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';

import { connect } from '../../actions';
import { formatQuestionnaire, findMissingAnswers } from '../../utils/questionnaire';
import { insertIntoDatabase } from '../../api/database';

import QuestionnaireType from './Type';
import QuestionnaireText from './Text';
import QuestionnaireIntroduction from './Introduction';
import QuestionnaireDatePicker from './DatePicker';
import QuestionnaireQuestion from './Question';
import QuestionnaireGroup from './Group';
import QuestionnaireSection from './Section';
import QuestionnairePatient from './Patient';

class Questionnaire extends PureComponent {

  static propTypes = {
    cfqrData: PropTypes.shape({
      elements: PropTypes.object
    }),
    config: PropTypes.shape({
      routes: PropTypes.object
    }),
    errorLog: PropTypes.func,
    setQuestionnaireStep: PropTypes.func,
    resetQuestionnaire: PropTypes.func,
    i18n: PropTypes.func,
    locale: PropTypes.string,
    counter: PropTypes.shape({
      step: PropTypes.number
    }).isRequired,
    questionnaire: PropTypes.shape({
      type: PropTypes.string
    })
  };

  state = {
    abortDialog: false,
    missingAnswers: false,
    resultId: ''
  };

  shouldComponentUpdate(nextProps, nextState) {
    /* STATEFUL - PURE component
     * The component rendering will be controlled manually.
     */
    if (nextState.resultId !== this.state.resultId) {
      return true;
    }
    if (nextState.abortDialog !== this.state.abortDialog) {
      return true;
    }
    if (nextState.missingAnswers !== this.state.missingAnswers) {
      return true;
    }
    if (nextProps.counter !== this.props.counter) {
      return true;
    }
    if (nextProps.locale !== this.props.locale) {
      return true;
    }
    return false;
  }

  handleFinish = () => {
    const { questionnaire, errorLog } = this.props;
    if (questionnaire.valid) {
      const doc = formatQuestionnaire(questionnaire);
      insertIntoDatabase(doc)
        .then(result => {
          this.setState({ resultId: result._id });
          return true;
        }).catch(err => {
          errorLog(err);
        });
    } else {
      const missingAnswers = findMissingAnswers(questionnaire) || [];
      if (missingAnswers.length > 0) {
        const missingQuestion = document.getElementById(missingAnswers[0]);
        if (missingQuestion) {
          const screenPosition = missingQuestion.getBoundingClientRect();
          window.scrollTo(0, window.scrollY + screenPosition.top);
        }
      }
      this.setState({
        missingAnswers: true
      });
    }
  }

  snackbarClose(attribute) {
    this.setState({
      [attribute]: false
    });
  }

  showAbortDialog() {
    this.setState({
      abortDialog: true
    });
  }

  hideAbortDialog() {
    this.setState({
      abortDialog: false
    });
  }

  viewResults() {
    hashHistory.push(`/statistics/questionnaire/${this.state.resultId}`);
  }

  renderElement(element) {
    const { type: elementType, key: elementKey } = element;

    switch (elementType) {
      case 'introduction':
        return <QuestionnaireIntroduction key={`qst-element-${elementKey}`} element={element} />;
      case 'date-input':
        return <QuestionnaireDatePicker key={`qst-element-${elementKey}`} element={element} />;
      case 'question':
        return <QuestionnaireQuestion key={`qst-element-${elementKey}`} element={element} />;
      case 'group':
        return <QuestionnaireGroup key={`qst-element-${elementKey}`} element={element} />;
      case 'section':
        return (<QuestionnaireSection
          key={`qst-element-${elementKey}`}
          element={element}
          renderElement={this.renderElement}
        />);
      case 'text':
        return <QuestionnaireText key={`qst-element-${elementKey}`} element={element} />;
      default:
        return '';
    }
  }

  render() {
    const { i18n, config, cfqrData, questionnaire,
      counter, setQuestionnaireStep, resetQuestionnaire } = this.props;
    const { step } = counter;
    const { routes } = config;
    const { type } = questionnaire;
    let elements = [];
    if (type) {
      elements = cfqrData.elements[type];
    }
    const patientId = questionnaire['patient-id'] ? questionnaire['patient-id'] : i18n('questionnaire-select-patient');
    const questionnaireType = type ? i18n(type) : i18n('questionnaire-select-questionnaire');

    return (
      <div style={{ maxWidth: '105%', margin: '0 -5%' }}>
        <Stepper activeStep={step} orientation="vertical">
          <Step>
            <StepLabel>{patientId}</StepLabel>
            <StepContent>
              <div className="step__content">
                <QuestionnairePatient />
              </div>
              <RaisedButton
                label="Next"
                disableTouchRipple
                disableFocusRipple
                primary
                onTouchTap={() => setQuestionnaireStep(1)}
                className="step__buttons-left"
              />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>{questionnaireType}</StepLabel>
            <StepContent>
              <div className="step__content">
                <QuestionnaireType />
              </div>
              <div className="step__buttons">
                <RaisedButton
                  label="Start"
                  disableTouchRipple
                  disableFocusRipple
                  primary
                  onTouchTap={() => setQuestionnaireStep(2)}
                  className="step__buttons-left"
                />
                <FlatButton
                  label="Back"
                  disableTouchRipple
                  disableFocusRipple
                  onTouchTap={() => setQuestionnaireStep(0)}
                />
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>{i18n('questionnaire-select-answer')}</StepLabel>
            <StepContent>
              <div className="step__content">
                {elements.map(element => this.renderElement(element))}
              </div>
              <div className="step__buttons">
                <RaisedButton
                  label="Finish"
                  disableTouchRipple
                  disableFocusRipple
                  primary
                  onTouchTap={this.handleFinish}
                  className="step__buttons-left"
                />
                <RaisedButton
                  label={i18n('abort')}
                  className="step__buttons-right"
                  onTouchTap={this.showAbortDialog.bind(this)}
                />
              </div>
            </StepContent>
          </Step>
        </Stepper>
        <Snackbar
          open={this.state.missingAnswers}
          message={i18n('questionnaire-error-missing-answer')}
          autoHideDuration={3000}
          onRequestClose={this.snackbarClose.bind(this, 'missingAnswers')}
        />
        <Dialog
          title={i18n('questionnaire-select-done')}
          actions={[
            <RaisedButton
              label={i18n('questionnaire-view-results-button')}
              secondary
              style={{ margin: '0 0.5rem 1rem 0' }}
              onTouchTap={() => this.viewResults()}
            />,
            <RaisedButton
              containerElement={<Link to={routes.home.url}>{i18n('home-button-back')}</Link>}
              label={i18n('home-button-back')}
              style={{ margin: '0 0.5rem 1rem 0' }}
            />
          ]}
          modal
          open={!!this.state.resultId}
        >
          {i18n('questionnaire-text-done')}
        </Dialog>
        <Dialog
          title={i18n('questionnaire-abort-title')}
          actions={[
            <RaisedButton
              label={i18n('cancel')}
              secondary
              style={{ margin: '0 0.5rem 1rem 0' }}
              onTouchTap={this.hideAbortDialog.bind(this)}
            />,
            <RaisedButton
              label={i18n('abort')}
              style={{ margin: '0 0.5rem 1rem 0' }}
              onTouchTap={() => {
                resetQuestionnaire();
                this.setState({
                  abortDialog: false
                });
              }}
            />
          ]}
          modal
          open={!!this.state.abortDialog}
        >
          {i18n('questionnaire-abort-text')}
        </Dialog>
      </div>
    );
  }
}

export default connect(Questionnaire);
