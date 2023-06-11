// eslint-disable-next-line import/no-extraneous-dependencies
const moment = require('moment');

// console.log(moment('2023-06-11T16:43:29.612Z').format('LLL'));
const dateFormat = (timestamp) => moment(timestamp).format('LLL');

module.exports = dateFormat;
