const express = require('express');
const db = require('../database/controllers');

const router = express.Router();

const queryAll = (req, res) => {
  const { song } = req.params;
  let requestEnd = req.originalUrl.split('/');
  requestEnd = requestEnd[requestEnd.length - 1];
  const dbQuery = (requestEnd === 'comments') ? db.getComments : db.getSong;

  dbQuery(song)
    .then((dbFind) => {
      const returnData = (requestEnd === 'comments') ? dbFind : dbFind[0];
      res.status(200).send(JSON.stringify({ data: returnData }));
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to DB: ${err}`);
    });
};

router.get(['/songs/:song', '/songs/:song/comments'], queryAll);
module.exports = router;
