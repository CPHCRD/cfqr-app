// @flow
import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';

import { connect } from '../../actions';

class QuestionnaireCard extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    question: PropTypes.arrayOf(PropTypes.any).isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    i18n: PropTypes.func,
    locale: PropTypes.string,
    answerQuestion: PropTypes.func
  };

  state = {
    open: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    /* STATEFUL - PURE component
     * The component rendering will be controlled manually.
     */
    if (nextState.open !== this.state.open) {
      return true;
    }
    if (nextProps.locale !== this.props.locale) {
      return true;
    }
    return false;
  }

  handleCardOpen() {
    this.setState({ open: true });
  }

  handleCardClose() {
    this.setState({ open: false });
  }

  render() {
    const {
      type,
      question,
      answers,
      answerQuestion,
      i18n
    } = this.props;

    return (
      <div key={`card-dialog-${type}-${question.id}`} style={{ float: 'right' }}>
        <IconButton
          onTouchTap={this.handleCardOpen.bind(this)}
          iconStyle={{ fontSize: 32 }}
          tooltipPosition="bottom-left"
          tooltip={i18n('questionnaire-open-cards')}
          className={`card__open-button--${type}`}
          style={{
            padding: 0,
            width: '40px',
            height: '40px',
            cursor: 'pointer'
          }}
        >
          <FontIcon className="material-icons">view_week</FontIcon>
        </IconButton>
        <Dialog
          title={i18n(question.key)}
          modal={true}
          open={this.state.open}
          contentStyle={{
            width: '90%',
            maxWidth: 'none',
          }}
        >
          <div className="card__container">
            {answers.map((answerKey, answerValue) =>
              (
                <Paper
                  key={`questionnaire-card-${answerKey}`}
                  className={`card__item card__item--${type}`}
                  onTouchTap={() => {
                    answerQuestion(question.id, answerValue, answerKey);
                    this.handleCardClose();
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {i18n(`${answerKey}`)}
                </Paper>
             ))}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect(QuestionnaireCard);
