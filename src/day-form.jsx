import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const calcColor = val => {
  const start = 120 - Math.ceil(val / 11 * 120);
  const end = 120 - Math.ceil((val + 1) / 11 * 120);
  return `linear-gradient(to right, hsl(${start}, 100%, 50%), hsl(${
    end
  }, 100%, 50%))`;
};

export class DayForm extends React.Component {
  render() {
    return (
      <Container>
        <Meter>
          <Segment color={calcColor(0)}>0</Segment>
          <Segment color={calcColor(1)}>1</Segment>
          <Segment color={calcColor(2)}>2</Segment>
          <Segment color={calcColor(3)}>3</Segment>
          <Segment color={calcColor(4)}>4</Segment>
          <Segment color={calcColor(5)}>5</Segment>
          <Segment color={calcColor(6)}>6</Segment>
          <Segment color={calcColor(7)}>7</Segment>
          <Segment color={calcColor(8)}>8</Segment>
          <Segment color={calcColor(9)}>9</Segment>
          <Segment color={calcColor(10)}>10</Segment>
        </Meter>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Meter = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  box-shadow: inset 2px 2px 16px 1px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
`;

const Segment = styled.div`
  display: flex;
  flex-grow: 1;
  cursor: pointer;
  height: 30px;
  justify-content: center;
  color: #333;
  align-items: center;
  font-weight: bold;
  font-size: 0.75em;
  border-top: 1px solid #666;
  borde-left: 1px solid #666;
  border-bottom: 1px solid #666;
  box-shadow: ${props => (props.active ? 'inset 0 0 10px #333' : 'none')};
  background: ${props => props.color};

  &:first-child {
    border-radius: 15px 0 0 15px;
  }

  &:last-child {
    border-right: 1px solid #666;
    border-radius: 0 15px 15px 0;
  }

  &: hover {
    box-shadow: inset 0 0 10px #666;
  }
`;
