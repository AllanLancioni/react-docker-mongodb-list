import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './views/Home/Home';
import ClientList from './views/Client/ClientList';
import ClientForm from './views/Client/ClientForm';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
              <Route exact path="/clients" component={ClientList} />
              <Route exact path="/clients/new" component={ClientForm} />
              <Route exact path="/clients/:id" component={ClientForm} />
            </Switch>

          </div>
        </Provider>
      </ThemeProvider>
    </Router>
  );
}

