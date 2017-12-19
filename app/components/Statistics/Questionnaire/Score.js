// @flow
import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import { connect } from '../../../actions';
import { calculateScore } from '../../../utils/questionnaire';

class StatisticsQuestionnaireScore extends Component {
  static propTypes = {
    i18n: PropTypes.func,
    questionnaireData: PropTypes.instanceOf(Object)
  };

  render() {
    const { i18n, questionnaireData } = this.props;
    const scores = calculateScore(questionnaireData);
    return (
      <List>
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
              {Object.keys(scores).map(key => (
                <TableRow key={key}>
                  <TableRowColumn>{key}</TableRowColumn>
                  <TableRowColumn>{scores[key]}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ListItem>
      </List>
    );
  }
}

export default connect(StatisticsQuestionnaireScore);
