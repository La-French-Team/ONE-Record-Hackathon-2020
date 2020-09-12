import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { About, Shipment, Login, Overview } from './pages';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[500],
    },
    contrastThreshold: 3,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/shipments/:id'>
            <Shipment />
          </Route>
          <Route path='/:type/overview'>
            <Overview />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
