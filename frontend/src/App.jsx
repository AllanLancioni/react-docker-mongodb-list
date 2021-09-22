import React from 'react';
import './App.css';
import Header from './components/Header';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './views/Home/Home';
import BondsList from './views/Bonds/BondsList';
import CustomerList from './views/Customer/CustomerList';
import OrdersList from './views/Order/OrdersList';

const theme = unstable_createMuiStrictModeTheme();


export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <Header></Header>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/customers" component={CustomerList} />
              <Route exact path="/bonds" component={BondsList} />
              <Route exact path="/orders" component={OrdersList} />
              <Redirect path="*" to="/"></Redirect>
            </Switch>

          </div>
        </Provider>
      </ThemeProvider>
    </Router>
  );
}

