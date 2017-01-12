import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import { connect } from '../actions';

class Restore extends Component {
  static propTypes = {
    i18n: PropTypes.func,
    Action: PropTypes.func
  };

  render() {
    const { i18n, Action } = this.props;

    return (
      <div>
        <h3>{i18n('deleted-element')}</h3>
        <FlatButton
          onTouchTap={Action}
          label={i18n('restore-element')}
          labelPosition="before"
          style={{ color: 'green' }}
          icon={<FontIcon className="material-icons" color="green">restore</FontIcon>}
        />
      </div>
    );
  }
}

export default connect(Restore);
