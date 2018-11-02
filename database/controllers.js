const connection = require('./index.js');

module.exports.getSong = (songId) => {
  const select = `
    songs.album,
    songs.album_imageUrl AS albumImageUrl,
    songs.background_color AS backgroundColor,
    songs.duration,
    artists.name AS artistName,
    songs.song_added AS songAdded,
    songs.tag,
    songs.title,
    sound_profiles.height,
    sound_profiles.profile
  `;
  const queryString = `SELECT ${select} FROM songs INNER JOIN artists ON songs.id = ? `
    + ' AND songs.artist_id = artists.id'
    + ' INNER JOIN sound_profiles ON sound_profiles.song_id = songs.id';
  return connection.query(queryString, songId);
};

module.exports.getComments = (songId) => {
  const select = `
    comments.time,
    comments.text,
    artists.name AS artistName,
    artists.artist_imageUrl AS artistImageUrl
  `;
  const queryString = `SELECT ${select} FROM comments INNER JOIN artists ON comments.song_id = ? `
    + ' AND comments.artist_id = artists.id ORDER BY comments.time;';
  return connection.query(queryString, songId);
};
