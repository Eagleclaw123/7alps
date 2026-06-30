exports.getISTDate = function getISTDate(date) {
  const utcDate = new Date(date);
  const offset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  return new Date(utcDate.getTime() + offset);
};
