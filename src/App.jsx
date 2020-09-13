import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { About, Shipment, Login, Overview } from './pages';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import settingsStore from 'stores/settingsStore';

const theme = computed(() => createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[500],
    },
    contrastThreshold: 3,
    type: settingsStore.darkTheme ? 'dark' : 'light'
  },
}));

const App = observer(() => {
  return (
    <ThemeProvider theme={theme.get()}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path='/:userType/shipments/:id'>
            <Shipment />
          </Route>
          <Route path='/:userType/overview'>
            <Overview />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/overview'>
            <Overview />
          </Route>
          <Route path='/'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
})

export default App;
