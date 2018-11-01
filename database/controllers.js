const connection = require('./index.js');

module.exports.getSong = (songId) => {
  const select = `songs.album,
    songs.album_imageUrl,
    songs.background_color,
    songs.duration,
    artists.name AS artist_name,
    songs.song_added,
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
  const queryString = 'SELECT * FROM comments INNER JOIN artists ON comments.song_id = ? '
    + ' AND comments.artist_id = artists.id;';
  return connection.query(queryString, songId);
};
