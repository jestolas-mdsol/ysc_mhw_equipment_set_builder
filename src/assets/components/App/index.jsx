import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Helmet } from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { compose, withState, withHandlers, setDisplayName, componentFromProp, lifecycle, withProps } from 'recompose'

import Header from '../Header';
import Footer from '../../components/Footer';
import styles from './style';

/* eslint jsx-a11y/no-static-element-interactions: 0 */
// Needed for onTouchTap - http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const faviconPath = require('../../images/favicon-32x32.png');

const enhance = compose(
  setDisplayName('App'),
);

const App = ({ children }) => (
  <MuiThemeProvider>
    <div className={styles.app}>
      <Helmet>
        <link rel="icon" href={faviconPath} type="image/x-icon" />
      </Helmet>
      <Header />
      {React.Children.map(children, child => React.cloneElement(child))}
      <Footer />
    </div>
  </MuiThemeProvider>
);

export default enhance(App);
