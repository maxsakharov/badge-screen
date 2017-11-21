import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://s3-us-west-2.amazonaws.com/honda-badge-images/parking-permit-example.png" className="App-logo" alt="logo" />
          <h1 className="App-title">THIS IS PAAARKING!!!</h1>
        </header>
      </div>
    );
  }


  componentDidMount() {
    // return fetch('https://facebook.github.io/react-native/movies.json')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //     this.setState({
    //       isLoading: false,
    //       dataSource: ds.cloneWithRows(responseJson.movies),
    //     }, function() {
    //       // do something with new state
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }
}

export default App;
