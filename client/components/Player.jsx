import React from 'react';
import SongDisplay from './SongDisplay.jsx';
import SongTracker from './SongTracker.jsx';
import helpers from '../helpers/playerHelpers.js';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: { album_imageUrl: '' },
      comments: [],
      songProfile: { profile: [] },
      artists: new Set(),
      playing: false,
      playtime: 0,
      nSongs: 100,
    };

    this.getSongData = this.getSongData.bind(this);
    this.getSongProfile = this.getSongProfile.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getArtists = this.getArtists.bind(this);
    this.handleAlbumClick = this.handleAlbumClick.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  componentDidMount() {
    const { nSongs } = this.state;
    const songId = Math.floor(Math.random() * nSongs) + 1;
    this.getSongData(songId)
      .then(() => this.getSongProfile(songId))
      .then(() => this.getComments(songId))
      .then(() => {
        const { artists } = this.state;
        this.getArtists(artists);
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  getSongData(id) {
    const url = `/songs/${id}`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const { artists } = this.state;
        artists.add(res.data.artist_id);
        this.setState({ song: res.data, artists });
      });
  }

  getSongProfile(id) {
    const url = `/songProfiles/${id}`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const songProfile = res.data;
        songProfile.profile = helpers.createSongBar(res.data.profile, res.data.height);
        this.setState({ songProfile });
      });
  }

  getComments(id) {
    const url = `/comments?song=${id}`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const { artists } = this.state;
        res.data.forEach(comment => artists.add(comment.artist_id));
        this.setState({ comments: res.data, artists });
      });
  }

  getArtists(ids) {
    let idString = '';
    ids.forEach((id) => { idString += `${id},`; });
    idString = idString.substring(0, idString.length - 2);
    const url = `/artists?id=${idString}`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const { song } = this.state;
        song.artist = res.data.find(artist => artist.id === song.artist_id).name;
        this.setState({ artists: res.data });
      });
  }

  handleAlbumClick(type) {
    window.alert(`On click, this would send you to the ${type} page`);
  }

  handleInfoClick(info) {
    console.log('This info was clicked!', info);
  }

  handlePlayClick() {
    const { playing } = this.state;
    console.log('Now playing is ', playing);
    this.setState({ playing: !playing });
  }

  render() {
    const {
      song, playing, playtime, songProfile, comments,
    } = this.state;

    return (
      <div
        className={`player-background-${song.background_color}`}
        id="player-all"
      >
        <SongDisplay
          song={song}
          playing={playing}
          handleAlbumClick={this.handleAlbumClick}
          handleInfoClick={this.handleInfoClick}
          handlePlayClick={this.handlePlayClick}
        />
        <SongTracker
          songProfile={songProfile}
          playtime={playtime}
          comments={comments}
          handleScan={() => {}}
          handleReplyComment={() => {}}
        />
      </div>
    );
  }
}

export default Player;
