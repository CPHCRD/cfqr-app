// @flow
import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import { connect } from '../../../actions';

class StatisticsQuestionnaireScore extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    cfqrData: PropTypes.shape({
      scores: PropTypes.object
    }),
    questionnaireData: PropTypes.instanceOf(Object)
  };

  calculateScoreByType() {
    const { questionnaireData, cfqrData } = this.props;
    const { scores, type } = questionnaireData;
    const questionsScores = cfqrData.scores[type];
    if (!questionsScores) {
      return {};
    }

    const scoresByType = {};
    Object.keys(questionsScores).forEach(questionId => {
      const question = questionsScores[questionId];
      const questionType = question.type;
      const score = scores[questionId];

      if (!scoresByType[questionType]) {
        scoresByType[questionType] = {
          total: 0,
          count: 0
        };
      }
      scoresByType[questionType].total += score;
      scoresByType[questionType].count += 1;
    });
    const finalScores = {};
    Object.keys(scoresByType).forEach(scoreTypeKey => {
      const scoreType = scoresByType[scoreTypeKey];
      finalScores[scoreTypeKey] = ((scoreType.total - scoreType.count) / (scoreType.count * 3)) * 100;
      if (isNaN(finalScores[scoreTypeKey])) {
        finalScores[scoreTypeKey] = 0;
      }
      finalScores[scoreTypeKey] = +finalScores[scoreTypeKey].toFixed(2);
    });
    return finalScores;
  }

  render() {
    const { i18n } = this.props;
    const scores = this.calculateScoreByType();
    return (<List>
      <Subheader>{i18n('statistics-questionnaire-score')}</Subheader>
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
              <TableHeaderColumn>category</TableHeaderColumn>
              <TableHeaderColumn>score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {Object.keys(scores).map(key =>
              <TableRow key={key}>
                <TableRowColumn>{key}</TableRowColumn>
                <TableRowColumn>{scores[key]}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ListItem>
    </List>
    );
  }
}

export default connect(StatisticsQuestionnaireScore);
