import React from 'react';
import styled from 'styled-components';
import startOfMonth from 'date-fns/start_of_month';
import getDay from 'date-fns/get_day';
import getDate from 'date-fns/get_date';
import subDays from 'date-fns/sub_days';
import addDays from 'date-fns/add_days';
import addMonths from 'date-fns/add_months';
import isSameMonth from 'date-fns/is_same_month';
import format from 'date-fns/format';
import getDaysInMonth from 'date-fns/get_days_in_month';
import { Link } from 'react-router-dom';

const generateDays = currentMonth => {
  let days = [];
  const lastMonthDays = getDay(currentMonth);
  let current = subDays(currentMonth, lastMonthDays);

  const startDay = getDay(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);
  const totalDays = startDay + daysInMonth + 1;
  const rows = totalDays / 7 > 5 ? 6 : 5;

  for (let i = 0; i < rows * 7; i++) {
    let day = {
      show: isSameMonth(current, currentMonth),
      date: current,
      key: format(current, 'MMDDYYYY'),
    };
    days.push(day);
    current = addDays(current, 1);
  }

  return { days, rows };
};

export class Calendar extends React.Component {
  state = {
    currentMonth: null,
    days: [],
    rows: 5,
  };

  componentDidMount() {
    this.makeCalendar(this.props.dayKey);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dayKey !== nextProps.dayKey) {
      this.makeCalendar(nextProps.dayKey);
    }
  }

  makeCalendar(dayKey) {
    const currentMonth = startOfMonth(dayKey);
    const { days, rows } = generateDays(currentMonth);

    this.setState({ currentMonth, days, rows });
  }

  render() {
    const { days, rows } = this.state;
    const { dayKey, calculateColor } = this.props;

    return (
      <Container>
        <Month>
          <MonthLink to={`/${format(addMonths(dayKey, -1), 'YYYY-MM-DD')}`}>
            &larr;
          </MonthLink>
          <span>{format(this.state.currentMonth, 'MMMM YYYY')}</span>
          <MonthLink to={`/${format(addMonths(dayKey, 1), 'YYYY-MM-DD')}`}>
            &rarr;
          </MonthLink>
        </Month>
        <Grid rows={rows}>
          <Entry>Sun</Entry>
          <Entry>Mon</Entry>
          <Entry>Tue</Entry>
          <Entry>Wed</Entry>
          <Entry>Thu</Entry>
          <Entry>Fri</Entry>
          <Entry>Sat</Entry>
          {days.map(day => (
            <Day
              key={day.key}
              date={day.date}
              show={day.show}
              color={calculateColor(day.date)}
            />
          ))}
        </Grid>
      </Container>
    );
  }
}

const Day = ({ date, show, color }) => {
  return (
    <DayLink to={`/${format(date, 'YYYY-MM-DD')}`}>
      <span>{getDate(date)}</span>
      <Dot color={color} />
    </DayLink>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const Month = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Grid = styled.div`
  flex: 1;
  max-height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(${props => props.rows + 1}, 1fr);
  grid-gap: 5px;
`;

const Entry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const DayLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

const MonthLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background: ${props => (!!props.color ? props.color : 'transparent')};
  border-radius: 5px;
  border: 0;
`;
