// @flow
import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';

import { connect } from '../../../actions';

const style = {
  padding: '0.5rem',
  whiteSpace: 'normal',
  textOverflow: 'initial'
};

class StatisticsQuestionnaireAnswers extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    cfqrData: PropTypes.shape({
      scores: PropTypes.object
    }),
    questionnaireData: PropTypes.instanceOf(Object)
  };

  // const answerKey = `${type}-${key}`;

  render() {
    const { i18n, questionnaireData, cfqrData } = this.props;
    const { type } = questionnaireData;
    const questionsScores = cfqrData.scores[type];
    return (<List>
      <Subheader>{i18n('statistics-questionnaire-answers')}</Subheader>
      <ListItem
        className="statistics__element"
        disabled={true}
        style={{ padding: 0 }}
      >
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>question</TableHeaderColumn>
              <TableHeaderColumn>answer</TableHeaderColumn>
              <TableHeaderColumn>score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {Object.keys(questionnaireData).map(key => {
              if (key === 'answers') {
                const answers = questionnaireData[key];
                return Object.keys(answers).map(answerKey => {
                  const questionKey = `${type}-${answerKey}`;
                  const questionType = questionsScores[answerKey] ? questionsScores[answerKey].type : '';
                  return (<TableRow key={answerKey}>
                    <TableRowColumn style={style}>{i18n(questionKey)}</TableRowColumn>
                    <TableRowColumn style={style}>{i18n(answers[answerKey])}</TableRowColumn>
                    <TableRowColumn style={style}>{
                      i18n(`statistics-questionnaire-type-${questionType}`)}</TableRowColumn>
                    <TableRowColumn style={style}>{questionnaireData.scores[answerKey]}</TableRowColumn>
                  </TableRow>);
                });
              }
              return '';
            })}
          </TableBody>
        </Table>
      </ListItem>
    </List>);
  }
}

export default connect(StatisticsQuestionnaireAnswers);
