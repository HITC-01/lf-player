const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const queryAll = require('./routes');

const app = express();

// Parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`INCOMING ${req.method} from ${req.originalUrl}`);
  next();
});

// Send out static files
app.use(express.static(path.join(__dirname, '../public')));

// Get request for song or profile or comments
app.get('/songs/:song', queryAll);
app.get('/songs/:song/songProfile', queryAll);
app.get('/songs/:song/comments', queryAll);

app.listen(process.env.PORT || 3004);
