// @flow
import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey600 } from 'material-ui/styles/colors';

import { connect } from '../actions';
import Menu from '../components/Menu';

/* Mui elements */
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: blueGrey600
  },
});

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    loadDatabase: PropTypes.func
  };

  componentDidMount() {
    const { loadDatabase } = this.props;
    loadDatabase();
  }

  componentWillReceiveProps(nextProps) {
    const { authenticateDone } = nextProps;
    if (nextProps.settings &&
        !nextProps.auth &&
        nextProps.settings.passphrase === '') {
      authenticateDone(true);
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Menu />
          <div className="page">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(App);
