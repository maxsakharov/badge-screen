import React, { Component } from 'react';
import './App.css';
import geo from 'geolocation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      currentBadgeUrl: 'https://s3.amazonaws.com/badge-files-dev/badge-image/default',
      BADGE_API_URL: 'https://ziclu0yj8h.execute-api.us-east-1.amazonaws.com/honda1',
      geolocation: geo,

    };
  }

  sendLocation(context) {
    context.setState((prevState, props) => {
    context.state.geolocation.getCurrentPosition(function (err, position) {
      fetch(`${context.state.BADGE_API_URL}/location-proxy`, {
        method: 'post',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        })
      })
     })
    });
  }

  imageFetchTick(context) {
    return fetch(`${context.state.BADGE_API_URL}/dashboard-proxy`)
      .then((response) => response.json())
      .then((responseJson) => {
        context.setState({
          currentBadgeUrl: responseJson.location,//context.state.currentBadgeUrl.replace(/\d*.png/gi, (Math.floor(Math.random() * 2) + 1) + '.png')  //responseJson.response.url,
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
      <div className="badgeApp">
        <img src={this.state.currentBadgeUrl} className="badgeApp-badge" alt="logo" />
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(this.sendLocation, 3000, this);
    this.interval = setInterval(this.imageFetchTick, 5 * 1000, this);
  }
}

export default App;
