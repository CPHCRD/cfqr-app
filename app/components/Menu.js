// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

import { connect } from '../actions';

class Menu extends Component {

  static propTypes = {
    config: PropTypes.shape({
      i18n: PropTypes.object
    }),
    i18n: PropTypes.func,
    changeLocale: PropTypes.func,
    locale: PropTypes.string,
    auth: PropTypes.bool,
    signOut: PropTypes.func,
    settings: PropTypes.shape({
      passphrase: PropTypes.string
    })
  };

  state = {
    open: false
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    const { config, i18n, changeLocale, locale, auth, signOut } = this.props;
    const { availableLocales } = config.i18n;
    const menuItems = config.routes;

    return (
      <header>
        <AppBar
          title={i18n('site-title')}
          iconElementLeft={
            <IconButton onTouchTap={this.handleToggle} style={{ cursor: 'pointer' }}>
              <FontIcon className="material-icons">menu</FontIcon>
            </IconButton>
          }
          iconElementRight={
            <aside>
              <DropDownMenu
                underlineStyle={{ border: 'none' }}
                labelStyle={{ fontSize: '2rem', lineHeight: '150%', top: '0.3rem' }}
                iconStyle={{ top: '0', height: '100%', lineHeight: '100%' }}
                value={locale}
                onChange={(event, index, value) => changeLocale(value)}
              >
                {Object.keys(availableLocales).map(localeKey => {
                  const localeData = availableLocales[localeKey];
                  return (<MenuItem
                    key={`language-menu-option-${localeKey}`}
                    value={localeKey}
                    label={localeData.flag}
                    primaryText={localeData.name}
                  />);
                })}
              </DropDownMenu>
            </aside>
            }
        />
        <Drawer
          docked={false}
          width={320}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <AppBar onTouchTap={this.handleToggle} style={{ marginBottom: '1rem', cursor: 'pointer' }} />
          {Object.keys(menuItems).map((key) => {
            const menuItem = menuItems[key];
            if (menuItem === true) {
              return <Divider key={`${key}-menu-item`} />;
            }
            const menuItemName = i18n(`${key}-menu-text`);
            return (<MenuItem
              key={`${key}-menu-item`}
              containerElement={<Link to={menuItem.url}>{menuItemName}</Link>}
              primaryText={menuItemName}
              leftIcon={
                <FontIcon className="material-icons">{menuItem.icon}</FontIcon>
              }
              onTouchTap={this.handleClose}
              style={{ cursor: 'pointer' }}
            />);
          })}
          {
            (auth && this.props.settings.passphrase) ?
              <MenuItem
                primaryText={i18n('auth-sign-out')}
                leftIcon={
                  <FontIcon className="material-icons">lock</FontIcon>
            }
                onTouchTap={() => signOut()}
                style={{ cursor: 'pointer' }}
              /> : ''
          }
        </Drawer>
      </header>
    );
  }
}

export default connect(Menu);
