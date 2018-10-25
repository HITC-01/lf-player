import React from 'react';
import SongDisplay from './SongDisplay.jsx';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: { title: '', albumImageUrl: '' },
      comments: [{}],
      soundProfile: { width: '' },
      artists: {},
      playing: false,
      nSongs: 100,
    };

    this.handleAlbumClick = this.handleAlbumClick.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  componentDidMount() {
    const { nSongs } = this.state;
    const songId = Math.random() * nSongs;
    const url = `/songs/${songId}`;
    // fetch(url, { method: 'GET' })
    //   .then((data) => {
    //     this.setState({ song: data.song });
    //   })
    //   .catch(err => console.log(`Error: ${err}`));
  }

  handleAlbumClick() {
    console.log('Album was clicked!');
  }

  handleInfoClick(info) {
    console.log('This info was clicked!', info);
  }

  handlePlayClick() {
    const { playing } = this.state;
    console.log('Now playing is ', playing);
  }

  render() {
    const { song, playing } = this.state;
    return (
      <div id="player-btn">
        <SongDisplay
          id="player-display"
          song={song}
          playing={playing}
          handleAlbumClick={this.handleAlbumClick}
          handleInfoClick={this.handleInfoClick}
          handlePlayClick={this.handlePlayClick}
        />
        <button id="player-play-button" type="button">Play</button>
      </div>
    );
  }
}

export default Player;
