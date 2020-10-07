import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Route, Redirect, Switch } from 'react-router-dom';
import config from './config';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import './App.css';
import Search from './components/search';

const client = new ApolloClient({
  uri: config.baseUrl,
  request: async (operation) => {
    const token = window.localStorage.getItem('token');
    operation.setContext({
      headers: {
        Authorization: token || '',
      },
    });
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/" component={Search}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    </ApolloProvider>
  );
}

export default App;
