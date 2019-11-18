const axios = require('axios')
const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false
})
const token = localStorage.getItem('token');

module.exports = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  headers: { Authorization: `Bearer ${token}` }
});
