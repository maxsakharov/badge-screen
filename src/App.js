import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      currentBadgeUrl: 'https://s3-us-west-2.amazonaws.com/honda-badge-images/parking-permit-1.png',
      CURRENT_BADGE_RETRIEVE_URL: 'https://server.test-cors.org/server?id=1714196&enable=true&status=200&credentials=false',
    };
  }

  timeTick(context) {
    context.setState((prevState, props) => {
      return {secondsElapsed: context.state.secondsElapsed + 1};
    });
  }

  imageFetchTick(context) {
    return fetch(context.state.CURRENT_BADGE_RETRIEVE_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        context.setState({
          currentBadgeUrl: context.state.currentBadgeUrl.replace(/\d*.png/gi, (Math.floor(Math.random() * 2) + 1) + '.png')  //responseJson.response.url,
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={this.state.currentBadgeUrl} className="App-logo" alt="logo" />
          <h1 className="App-title">THIS IS PAAARKING!!!</h1>
          <h2>{this.state.secondsElapsed}</h2>
        </header>
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(this.timeTick, 1000, this);
    this.interval = setInterval(this.imageFetchTick, 2 * 1000, this);
  }
}

export default App;
