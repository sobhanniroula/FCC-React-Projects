const quotes = [
  {
  quote: "One cannot collect all the beautiful shells on the beach. One can collect only a few, and they are more beautiful if they are few.",
  author: "Anne Morrow Lindbergh"
},
  {
  quote: "You can't expect to hit the jackpot if you don't put a few nickels in the machine.",
  author: "Flip Wilson"
},
  {
  quote: "I look in the mirror and see a few scars, but I like myself.",
  author: "Steven Adler"
},
  {
  quote: "Love all, trust a few, do wrong to none",
  author: "William Shakespeare"
},
  {
  quote: "Music has healing power. It has the ability to take people out of themselves for a few hours.",
  author: "Elton John"
},
  {
  quote: "I don't fear death so much as I fear its prologues: loneliness, decrepitude, pain, debilitation, depression, senility. After a few years of those, I imagine death presents like a holiday at the beach.",
  author: "Mary Roach"
},
  {
  quote: "Leave your ego at the door every morning, and just do some truly great work. Few things will make you feel better than a job brilliantly done.",
  author: "Robin S. Sharma"
},
  {
  quote: "True happiness arises, in the first place, from the enjoyment of one's self, and in the next, from the friendship and conversation of a few select companions.",
  author: "Joseph Addison"
},
  {
  quote: "There are very few really stark black and white stories.",
  author: "Jim Lehrer"
},
  {
  quote: "The atomic bomb made the prospect of future war unendurable. It has led us up those last few steps to the mountain pass; and beyond there is a different country.",
  author: "J. Robert Oppenheimer"
}               
];

const Text = (props) => {
  return <div id="text">{props.text}</div>;
};

const Author = (props) => {
  return <div id="author">{props.text}</div>;
};

const Tweet = (props) => {
  return (
    <a id="tweet-quote" className="button" href={"https://twitter.com/intent/tweet".concat(props.tweet)} target="_blank"><i className="fab fa-twitter" />Tweet this quote</a>
  );
};

class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    this.props.handleClick();
  };
  
  render() {
    return (
      <button onClick={this.handleClick} type="button" id="new-quote">New Quote</button>
    );
  }
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quote: this.props.quote,
      author: this.props.author
    };
  }
  
  handleClick = () => {
    let index = Math.floor(Math.random() * quotes.length);
    this.setState({
      quote: quotes[index].quote,
      author: quotes[index].author
    });
  };
  
  render() {
    return (
      <div id="quote-box">
        <blockquote>
          <Text text={this.state.quote} />  
          <cite> <Author text={this.state.author} /> </cite>
        </blockquote> 
        
        <Tweet />
        
        <Button handleClick={this.handleClick}></Button>
      </div>
    );
  }
}

class Quote extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <QuoteBox 
        quote="Love all, trust a few, do wrong to none" 
        author="Willam Shakespeare" 
        />
    );
  }
}

ReactDOM.render(<Quote />, document.getElementById("app"));

