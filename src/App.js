
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class PostCast extends React.Component {
  render() {
    return(
      <div>
        <img width="75" src={this.props.imageUrl} />
        <div style={{display: 'inline-block', marginLeft: "10"}}>
          <div style={{fontWeight: 'bolder', fontSize: "1.2em"}}> {this.props.name}</div>
          <div> {this.props.author}</div>
        </div>
      </div>
    )
  }
}

class PostCastList extends React.Component {
  render() {
    return (
      <div>
        {this.props.postCasts.map(postcast => <PostCast {...postcast}/>)}
      </div>
    )
  }

}


class App extends React.Component {
  constructor(props) {
    super(props)



  }
  componentDidMount() {
    console.log("did mount")
    this.postCastFetch();
  }
  postCastFetch = () => {
     var tempArray = []
     axios.get("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
      .then(data => {
        let entryData = data.data.feed.entry
        entryData.forEach(element => {
          let name = element.title.label
          let author = element['im:artist'].label
          let image = element['im:image'][1].label
          let postCast = {'imageUrl': image, 'name': name, 'author': author}
          tempArray.push(postCast)
        })
        this.setState(({
          postCasts : tempArray
        }))
      })
      .catch(err => console.log(err))
  }
  state = {
    postCasts: [
    ]
  }

  render() {
    return (
      <div>
        <PostCastList postCasts={this.state.postCasts}/>
      </div>
    )
  }
}




export default App;
