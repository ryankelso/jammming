import React from 'react';
import './App.css';
import SearchBar from './../SearchBar/SearchBar.js';
import SearchResults from './../SearchResults/SearchResults.js';
import Playlist from './../Playlist/Playlist.js';

// Hard code a static list of tracks for building the basic structure of the app
const track1 = {
  name: 'I and Love and You',
  artist: 'The Avett Brothers',
  album: 'I and Love and You'
};
const track2 = {
  name: 'And It Spread',
  artist: 'The Avett Brothers',
  album: 'I and Love and You'
};
const track3 = {
  name: 'Ten Thousand Words',
  artist: 'The Avett Brothers',
  album: 'I and Love and You'
};
const track4 = {
  name: 'Kick Drum Heart',
  artist: 'The Avett Brothers',
  album: 'I and Love and You'
};

const tracks = [
  track1,
  track2,
  track3,
  track4
];

class App extends React.Component {
  constructor(props) {
    super(props);
    // later, a new method will set searchResults state to a response from Spotify API
    this.state = {searchResults: tracks/*[]*/};
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
