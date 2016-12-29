// @flow
import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import { connect } from '../../actions';

const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false
};

class StatisticsTable extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    rows: PropTypes.instanceOf(Array),
    locale: PropTypes.string
  };

  onRowClick(rowNumber) {
    if (!rowNumber) {
      return false;
    }
    const { rows } = this.props;
    hashHistory.push(`/statistics/questionnaire/${rows[rowNumber]._id}`);
  }

  render() {
    const { i18n, locale, rows } = this.props;
    return (
      <Table
        onRowSelection={this.onRowClick.bind(this)}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
            <TableHeaderColumn>Patient</TableHeaderColumn>
            <TableHeaderColumn>Score</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {rows.map((row, i) => <TableRow
            key={`statistics-table-row-${i}`}
            style={{ cursor: 'pointer' }}
          >
            <TableRowColumn>
              {new global.Intl
                .DateTimeFormat(locale, dateOptions)
                .format(row.createdAt)}
            </TableRowColumn>
            <TableRowColumn>{i18n(row.type)}</TableRowColumn>
            <TableRowColumn>{row.patient}</TableRowColumn>
            <TableRowColumn>???</TableRowColumn>
          </TableRow>)}
        </TableBody>
      </Table>
    );
  }
}

export default connect(StatisticsTable);
