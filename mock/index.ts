import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import router from './src/router';

const app = express();
app.use(bodyParser.json());

router(app);

const server = http.createServer(app);

server.listen(8848, () => {
  console.log('server running on http://localhost:8848');
});

module.exports = app;
