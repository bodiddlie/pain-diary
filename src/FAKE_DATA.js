import format from 'date-fns/format';

const slug = () =>
  Math.random()
    .toString(32)
    .substring(2, 7);

const today = new Date();
const todayKey = format(today, 'YYYY-MM-DD');

export default {
  entries: [
    { id: slug, date: todayKey, painLevel: 3, notes: 'This is a sample.' },
  ],
};
