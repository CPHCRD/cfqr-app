// @flow
import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {
  grey50,
  blue900,
  pink300,
} from 'material-ui/styles/colors';

import { connect } from '../../actions';

import { format as dateFormat } from '../../config/date.json';

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
                .DateTimeFormat(locale, dateFormat.full)
                .format(row.createdAt)}
            </TableRowColumn>
            <TableRowColumn>{i18n(row.type)}</TableRowColumn>
            <TableRowColumn>
              <Avatar
                icon={<FontIcon className="material-icons">
                  {row.type === 'qst-child-parent' ? 'people' : 'person'}
                </FontIcon>}
                color={grey50}
                size={20}
                backgroundColor={row.gender === 1 ? pink300 : blue900}
              /> {row.patient}
            </TableRowColumn>
          </TableRow>)}
        </TableBody>
      </Table>
    );
  }
}

export default connect(StatisticsTable);
