const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();

// Parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
  console.log(`INCOMING ${req.method} from ${req.originalUrl}`);
  next();
});

// Send out static files
app.use(express.static('public'));

// Get request for song data
app.get('/songs/:song', (req, res) => {
  const { songId } = req.body;
  let data = {};
  db.getSong(songId)
    .then((song) => {
      data = { song };
      return db.getSoundProfile(songId);
    })
    .then((songProfile) => {
      data.songProfile = songProfile;
      return db.getComments(songId);
    })
    .then((comments) => {
      data.comments = comments;
      res.status(202).send(JSON.stringify(data));
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      res.status(404).send(err);
    });
});

app.listen(process.env.PORT || 3000);
