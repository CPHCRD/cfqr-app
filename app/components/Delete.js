import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import { connect } from '../actions';

class Delete extends Component {
  static propTypes = {
    i18n: PropTypes.func,
    Action: PropTypes.func
  };

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { i18n, Action } = this.props;

    const actions = [
      <FlatButton
        label={i18n('cancel')}
        onTouchTap={this.handleClose}
        style={{ cursor: 'pointer' }}
      />,
      <FlatButton
        label={i18n('delete')}
        style={{ color: 'red', cursor: 'pointer' }}
        onTouchTap={Action}
      />,
    ];

    return (
      <div>
        <IconButton
          onTouchTap={this.handleOpen}
          tooltip={i18n('delete')}
          style={{ float: 'right', cursor: 'pointer' }}
        >
          <FontIcon className="material-icons" color="red">
            delete
          </FontIcon>
        </IconButton>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {i18n('questionnaire-delete-message')}
        </Dialog>
      </div>
    );
  }
}

export default connect(Delete);
