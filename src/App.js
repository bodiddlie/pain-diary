import React from 'react';
import localforage from 'localforage';
import Router from 'react-router-dom/BrowserRouter';
import { Route, Redirect } from 'react-router-dom';
import format from 'date-fns/format';
import styled from 'styled-components';

import fakeData from './FAKE_DATA';
import { Calendar } from './calendar';

const Empty = ({ children }) => children;

const Routes = ({ calculateColor }) => (
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
          <Calendar
            dayKey={match.params.dayKey}
            calculateColor={calculateColor}
          />
          <Box>{match.params.dayKey}</Box>
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
      .then(data => this.setState({ data: data ? data : fakeData }))
      .catch(err => this.setState({ err }));
  }

  calculateColor = day => {
    const dayString = format(day, 'YYYY-MM-DD');
    const transparentColor = 'transparent';
    const colorFn = pain => {
      const startColor = 120 - Math.ceil(pain / 11 * 120);
      return `hsl(${startColor}, 100%, 50%)`;
    };

    const entry = this.state.data.entries.find(e => e.date === dayString);
    if (entry) return colorFn(entry.painLevel);
    return transparentColor;
  };

  render() {
    const { err, data } = this.state;

    if (err) {
      return <pre>{err.message}</pre>;
    }

    return !data ? null : (
      <Router>
        <div>
          <Routes calculateColor={this.calculateColor} />
          <div>{JSON.stringify(data)}</div>
        </div>
      </Router>
    );
  }
}

export default App;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
  height: 100vh;
`;

const Box = styled.div`
  background: red;
`;
