const React = require('react');

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

module.exports = Player;
