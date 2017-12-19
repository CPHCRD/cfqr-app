// @flow
import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';

import { connect } from '../../../actions';
import { format as dateFormat } from '../../../config/date.json';
import { MUCUS_QUESTION_ID, getQuestionsInfo } from '../../../utils/questionnaire';

class StatisticsPatientQuestionnaires extends Component {
  static propTypes = {
    i18n: PropTypes.func,
    locale: PropTypes.string,
    cfqrData: PropTypes.shape({
      elements: PropTypes.object
    }),
    questionnairesData: PropTypes.instanceOf(Array)
  };

  onRowClick(rowNumber) {
    if (!rowNumber) {
      return false;
    }
    const { questionnairesData } = this.props;
    hashHistory.push(`/statistics/questionnaire/${questionnairesData[rowNumber]._id}`);
  }

  render() {
    const {
      i18n, locale, questionnairesData, cfqrData
    } = this.props;
    if (!questionnairesData) {
      return (<div />);
    }
    return (
      <List>
        <Subheader>{i18n('statistics-patient-questionnaires')}</Subheader>
        <ListItem
          className="statistics__element"
          disabled={true}
          style={{ padding: 0 }}
        >
          <Table
            onRowSelection={this.onRowClick.bind(this)}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>{i18n('date')}</TableHeaderColumn>
                <TableHeaderColumn>{i18n('type')}</TableHeaderColumn>
                <TableHeaderColumn>{i18n('statistics-patient-mucus')}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {questionnairesData.map((row, i) => {
                const mucusAnswer = row[MUCUS_QUESTION_ID];
                let mucusText = '';
                if (typeof mucusAnswer !== 'undefined') {
                  const qstType = row.type;
                  const questionsInfo = getQuestionsInfo(cfqrData.elements[qstType]);
                  const qstData = questionsInfo[MUCUS_QUESTION_ID]; // eslint-disable-line
                  if (qstData) {
                    mucusText = i18n(qstData.answers[mucusAnswer]);
                  }
                }
                return (
                  <TableRow
                    key={`statistics-table-row-${i}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableRowColumn>
                      {new global.Intl
                        .DateTimeFormat(locale, dateFormat.full)
                        .format(new Date(row.createdAt))}
                    </TableRowColumn>
                    <TableRowColumn>{i18n(row.type)}</TableRowColumn>
                    <TableRowColumn>{mucusText}</TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ListItem>
      </List>
    );
  }
}

export default connect(StatisticsPatientQuestionnaires);
