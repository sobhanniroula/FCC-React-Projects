marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

class MarkdownOutput extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
  return(
    <div>
      <h2> MarkDown Output Section </h2> <hr />
    <div dangerouslySetInnerHTML={{__html: marked(this.props.value)}}></div> <hr />
 </div>
  )
}
};

    
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "## This is a markdown previewer \n  ### Please make our own markdowns. \n  #### Your own list: \n  - Apple \n - Ball \n - Cat \n - Dog \n - Elephant \n\n ### Also, write words in **bold** or *italic* \n\n ### Create links like this: [Github](https://github.com/sobhanniroula)"
    };
    this.handleChange = this.handleChange.bind(this);
   }
  
  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  
  render() {
    return (
      <div>
      <div className="container">
        <h2>MarkDown Input Section</h2><hr />
        <textarea id="editor" className="markdown-text" onChange={this.handleChange} value={this.state.value} /> <hr />
      </div>

      <div className="container"  id="preview">
        <MarkdownOutput value={this.state.value} />
      </div>
        </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));