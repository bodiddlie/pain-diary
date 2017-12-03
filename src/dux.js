export const SET_DATE = 'Set Date';
export const REMOVE_DATE = 'Remove Date';
export const LOAD_DATA = 'Load Data';

export function setDate({ date, painLevel, notes }) {
  return { type: SET_DATE, date, painLevel, notes };
}

export function removeDate(date) {
  return { type: REMOVE_DATE, date };
}

export function loadData(data) {
  console.log(data);
  return { type: LOAD_DATA, data };
}

export function entries(state = [], action) {
  switch (action.type) {
    case SET_DATE: {
      const { type, ...entry } = action;
      return [...state, entry];
    }
    case REMOVE_DATE: {
      const { date } = action;
      return state.filter(e => e.date !== date);
    }
    case LOAD_DATA: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}
