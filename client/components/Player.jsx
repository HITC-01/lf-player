class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: {},
      comments: [],
      soundProfile: {},
      artists: {},
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id="player-btn">
        <button id="player-play-button" type="button">Play</button>
      </div>
    );
  }
}

module.exports = Player;
