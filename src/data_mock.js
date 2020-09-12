export const events = [
  {
    level: 'warning',
    title: 'Temperature delayed',
    timestamp: Date.parse('2020-09-12T11:55:00Z'),
    details: null,
  },
  {
    level: 'info',
    title: 'Departure from CGC',
    timestamp: Date.parse('2020-09-12T12:33:51Z'),
    details: null,
  },
  {
    level: 'error',
    title: 'Temperature exceeded',
    timestamp: Date.parse('2020-09-12T15:24:45Z'),
    details: {
      value: 21.3,
      threshold: 21,
    },
  },
];
