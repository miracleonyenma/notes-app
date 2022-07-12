// helper to get and display date
const showDateTime = (value, { withTime = false, timeOnly = false } = {}) => {
  let date = new Date(value).toDateString();
  let time = new Date(value).toLocaleTimeString();
  console.log({ value, date, time });

  if (withTime) return `${date} | ${time}`;
  else if (timeOnly) return `${time}`;
  return `${date}`;
};

export { showDateTime };
