import React from 'react';
import localforage from 'localforage';
import Router from 'react-router-dom/BrowserRouter';
import { Route, Redirect } from 'react-router-dom';
import format from 'date-fns/format';
import styled from 'styled-components';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import fakeData from './FAKE_DATA';
import Calendar from './calendar';
import { DayForm } from './day-form';
import { entries, loadData } from './dux';

let store = createStore(entries);

const Empty = ({ children }) => children;

const Routes = () => (
  <Empty>
    <Route
      path="/"
      exact
      render={() => <Redirect to={`/${format(new Date(), 'YYYY-MM-DD')}`} />}
    />
    <Route
      path="/:dayKey"
      render={({ match, locaton }) => (
        <Container>
          <Calendar dayKey={match.params.dayKey} />
          <DayForm />
          <Box />
        </Container>
      )}
    />
  </Empty>
);

class App extends React.Component {
  state = {
    data: null,
    err: null,
  };

  componentWillMount() {
    localforage
      .getItem('data')
      .then(data => this.props.dispatch(loadData(data || fakeData.entries)))
      .catch(err => this.setState({ err }));
  }

  render() {
    const { err, data } = this.state;

    if (err) {
      return <pre>{err.message}</pre>;
    }

    return (
      <Router>
        <div>
          <Routes />
          <div>{JSON.stringify(data)}</div>
        </div>
      </Router>
    );
  }
}

const ConnectedApp = connect()(App);

function AppWrapper() {
  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  );
}

export default AppWrapper;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
  height: 100vh;
`;

const Box = styled.div`
  background: red;
`;
