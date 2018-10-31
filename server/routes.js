const db = require('../database/controllers');

module.exports = (req, res) => {
  const { song } = req.params;
  let requestEnd = req.originalUrl.split('/');
  requestEnd = requestEnd[requestEnd.length - 1];
  let dbQuery = db.getSong;
  if (requestEnd === 'comments') {
    dbQuery = db.getComments;
  } else if (requestEnd === 'songProfile') {
    dbQuery = db.getSoundProfile;
  }

  dbQuery(song)
    .then((dbFind) => {
      const returnData = (requestEnd === 'comments') ? dbFind : dbFind[0];
      res.status(200).send(JSON.stringify({ data: returnData }));
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to DB: ${err}`);
    });
};
