const express = require('express');
const pg = require('pg');
const secrets = require('./secrets.json');

const app = express();

const pgClient = new pg.Client({
  database: secrets.database,
  user: secrets.user,
  password: secrets.password
})

async function setupApp() {
  await pgClient.connect();

  // REST Naming Convention:
  // list resource:     GET  /resourceName.    GET /messages
  app.get('/messages', function(req, res) {
    pgClient.query('SELECT * FROM messages;').then(function(result) {
      const messages = result.rows;
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.send(messages);
    });
  });
  
  const port = 3001;
  app.listen(port, function() {
    console.log(`Server is running at http://localhost:${port}`)
  });
}

setupApp();
