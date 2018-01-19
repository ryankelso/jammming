import React from 'react';
import './App.css';
import SearchBar from './../SearchBar/SearchBar.js';
import SearchResults from './../SearchResults/SearchResults.js';
import Playlist from './../Playlist/Playlist.js';

// Hard code a static list of tracks for building the basic structure of the app
const track1 = {
  name: 'I and Love and You',
  artist: 'The Avett Brothers',
  album: 'I and Love and You',
  id: '0'
};
const track2 = {
  name: 'And It Spread',
  artist: 'The Avett Brothers',
  album: 'I and Love and You',
  id: '1'
};
const track3 = {
  name: 'Ten Thousand Words',
  artist: 'The Avett Brothers',
  album: 'I and Love and You',
  id: '2'
};
const track4 = {
  name: 'Kick Drum Heart',
  artist: 'The Avett Brothers',
  album: 'I and Love and You',
  id: '3'
};

const tracks = [
  track1,
  track2,
  track3,
  track4
];

const playlistName = 'Rockin Avett Tunes';

const playlistTrack1 = {
  name: 'Kick Drum Heart',
  artist: 'The Avett Brothers',
  album: 'I and Love and You',
  id: '3'
};

const playlistTrack2 = {
  name: 'Paranoia in B-Flat Major',
  artist: 'The Avett Brothers',
  album: 'Emotionalism',
  id: '4'
};

const playlistTrack3 = {
  name: 'And It Spread',
  artist: 'The Avett Brothers',
  album: 'I and Love and You',
  id: '1'
};

// Changed from const to let so App.removeTrack() would work
let playlistTracks = [
  playlistTrack1,
  playlistTrack2,
  playlistTrack3
];

class App extends React.Component {
  constructor(props) {
    super(props);
    // Later, a new method will set searchResults state to a response from Spotify API
    this.state = {searchResults: tracks/*[]*/, playlistName: playlistName, playlistTracks: playlistTracks};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    // If the input track does not exist in the playlistTracks array, then add the track
    // to playlistTracks and update the app's playlistTracks state.
    // The track id will come from the Spotify API.
    // array.some() checks whether at least one element passes the test
    if (!this.state.playlistTracks.some(playlistTrack => track.id === playlistTrack.id)) {
      playlistTracks.push(track);
      this.setState({playlistTracks: playlistTracks});
    }
  }

  removeTrack(track) {
    // Check each playlist track and return ones that don't match the unput track
    playlistTracks = playlistTracks.filter(function(playlistTrack) {
      return playlistTrack.id !== track.id;
    });
    this.setState({playlistTracks: playlistTracks});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
