const URL = "https://s3.amazonaws.com/freecodecamp/drums/";

const Sounds = {
  Q : "Heater-1",
  W : "Kick_n_Hat",
  E : "Chord_1",
  A : "Heater-6",
  S : "punchy_kick_1",
  D : "Brk_Snr",
  Z : "Dry_Ohh",
  X : "Heater-3",
  C : "Dsc_Oh"
};

const keyCodes = {
  81 : 'Q',
  87 : 'W',
  69 : 'E',
  65 : 'A',
  83 : 'S',
  68 : 'D',
  90 : 'Z',
  88 : 'X',
  67 : 'C'
};



function Display(props) {
  return (
    <div id="display">{props.currentSoundText}</div>
  )
}

function Drumpad(props) {
  return (
    <div className="drum-pad" id={props.soundFile} onClick={props.clickplayer}>
      {props.name}
      <audio className="clip" id={props.name} src={props.soundFile} type="audio/mp3"> </audio>
      </div>
  )
}



// MAIN COMPONENT
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSoundId: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playSound = this.playSound.bind(this);
  };
  
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  };
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  };
  playSound() {
    document.getElementById(this.state.currentSoundId).play();
  };
  
  handleKeyPress(e) {
    const key = keyCodes[e.keyCode];
    const validity = Object.keys(Sounds).includes(key);
    this.setState({
      currentSoundId: (validity) ? key : ''
    });
  };
  
  handleClick(e) {
    this.setState({
      currentSoundId: e.target.children[0].id
    });
  };
  
  render() {
    let displayMessage = '';
    if (this.state.currentSoundId) {
      displayMessage = Sounds[this.state.currentSoundId];
      this.playSound();
    };    
    return(
      <div id="drum-machine">
        <Display currentSoundText={displayMessage} /> <br />
        <div id="container">
          {Object.keys(Sounds).map((key) => {
            return (
              <Drumpad name={key} soundFile={URL + Sounds[key] + ".mp3"} clickplayer={this.handleClick} key={key} />
            )
          })}
        </div>
      </div> 
    );
  }
}

   
        
 ReactDOM.render(<App />, document.getElementById('app'));