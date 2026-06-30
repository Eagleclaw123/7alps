const moment = require('moment-timezone');

// Convert UTC to IST
const convertToIST = (date) => {
  return moment(date).tz('Asia/Kolkata');
};

// Convert IST to UTC for storage
const convertToUTC = (date) => {
  return moment(date).tz('Asia/Kolkata').utc();
};

// Get start of day in IST, return UTC for MongoDB query
const getISTStartOfDay = (date) => {
  return moment(date).tz('Asia/Kolkata').startOf('day').utc().toDate();
};

// Get end of day in IST, return UTC for MongoDB query
const getISTEndOfDay = (date) => {
  return moment(date).tz('Asia/Kolkata').endOf('day').utc().toDate();
};

// Format IST date for display
const formatISTDate = (date) => {
  return moment(date).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
};

module.exports = {
  convertToIST,
  convertToUTC,
  getISTStartOfDay,
  getISTEndOfDay,
  formatISTDate,
};
