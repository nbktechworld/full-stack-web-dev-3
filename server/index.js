const cors = require('cors');
const express = require('express');
const pg = require('pg');
const secrets = require('./secrets.json');

const app = express();

const pgClient = new pg.Client({
  database: secrets.database,
  user: secrets.user,
  password: secrets.password
})

function filterProperties(requestBody) {
  // do your filtering...
  return ({
    body: requestBody.body,
  });
}

function validateProperties(body) {
  // you can also accumulate all errors instead of returning one by one
  // const errors = [];
  // check if valid...
  if (!body.body) {
    return 'Body is missing';
  }
  if (body.body.length > 300) {
    return 'Body should not be more than 300 characters';
  }
  return null;
}

async function setupApp() {
  await pgClient.connect();

  app.use(cors());
  app.use(express.json())

  // REST Naming Convention:
  // list resource:     GET  /resourceName.    GET /messages
  app.get('/messages', function(req, res) {
    pgClient.query('SELECT * FROM messages;').then(function(result) {
      const messages = result.rows;
      res.setHeader('Content-Type', 'application/json')
      res.send(messages);
    });
  });

  app.post('/messages', async function(req, res) {
    // read what the user sent through the request body.
    // filter user input
    const messageBody = filterProperties(req.body);
    // validate user input
    const validationError = validateProperties(messageBody);
    if (validationError) {
      return res.status(422).json({ error: validationError });
    }

    // we dont have auth right now, but lets create a fake user.
    const currentUser = {
      id: 1,
    };

    
    // call on the database to create the record
    const result = await pgClient.query('INSERT INTO messages (id, body, user_id, created_at, updated_at) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *', [messageBody.body, currentUser.id, new Date(), new Date()]);
    
    // make an adapter function to convert from snake to camelCase (or you could also use SQL ALIAS "AS")
    // this also can be isolated to a separate function
    const createdMessage = {
      body: result.rows[0].body,
    };
    
    // send back a response with the created recording, including the id
    return res.send(createdMessage);

  });
  
  const port = 3001;
  app.listen(port, function() {
    console.log(`Server is running at http://localhost:${port}`)
  });
}

setupApp();
