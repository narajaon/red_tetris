const express = require('./express');
const socket = require('./socket');

module.exports = {
  socket,
  express,
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV || 'test',
    get url() {
      return `http://${this.host}:${this.port}`;
    },
  },
};