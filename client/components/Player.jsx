import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="player-btn">
        <button id="play" type="button">Play</button>
      </div>
    );
  }
}

export default Player;
