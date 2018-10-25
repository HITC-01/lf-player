const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const querystring = require('querystring');

const db = require('../database');

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

// Get request for song data
app.get('/songs/:song', (req, res) => {
  const { song } = req.body;
  db.getSong(song)
    .then((songData) => {
      res.status(202).send(JSON.stringify({ data: songData }));
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.get('/songs/:song', (req, res) => {
  const { song } = req.body;
  db.getSoundProfile(song)
    .then((songProfile) => {
      res.status(200).send(JSON.stringify({ data: songProfile }));
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.get('/comments?song=songId', (req, res) => {
  const { songId } = req.body;
  db.getComments(songId)
    .then((comments) => {
      res.status(200).send(JSON.stringify({ data: comments }));
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.get('/artists', (req, res) => {
  const query = querystring.parse(req.originalUrl);
  console.log('this is my query', query);
  const { songId } = req.body;
  db.getComments(songId)
    .then((comments) => {
      res.status(200).send(JSON.stringify({ data: comments }));
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.listen(process.env.PORT || 3004);
