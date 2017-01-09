// @flow
import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FileSaver from 'file-saver';
import json2csv from 'json2csv';

import { connect } from '../actions';

class SaveAs extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    style: PropTypes.instanceOf(Object),
    exportData: PropTypes.instanceOf(Object),
    fileName: PropTypes.string
  };

  saveAs() {
    const { exportData, fileName } = this.props;
    let csvString = json2csv({
      data: exportData.data,
      fields: exportData.fields,
      includeEmptyRows: true
    });
    csvString = csvString.substring(csvString.indexOf('\n') + 1);
    const blob = new Blob([csvString], {
      type: 'text/csv;charset=utf-8'
    });
    FileSaver.saveAs(blob, `${fileName}.csv`);
  }

  render() {
    const { i18n } = this.props;

    return (
      <IconButton tooltip={i18n('export')} onTouchTap={this.saveAs.bind(this)} style={this.props.style}>
        <FontIcon className="material-icons">save</FontIcon>
      </IconButton>
    );
  }
}

export default connect(SaveAs);
