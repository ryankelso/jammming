import React from 'react';
import './App.css';
import SearchBar from './../SearchBar/SearchBar.js';
import SearchResults from './../SearchResults/SearchResults.js';
import Playlist from './../Playlist/Playlist.js';
import Spotify from './../../util/Spotify.js';

let playlistTracks = [];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {searchResults: [], playlistName: 'New Playlist', playlistTracks: []};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    // Since there is no login button, get an access token or redirect to login
    // with Spotify when App mounts
    Spotify.getAccessToken();
  }

  addTrack(track) {
    // If the input track does not exist in the playlistTracks array, then add the track
    // to playlistTracks and update the app component playlistTracks state.
    // The track id comes from the Spotify API.
    // array.some() checks whether at least one element passes the test
    playlistTracks = this.state.playlistTracks;
    if (!this.state.playlistTracks.some(playlistTrack => track.id === playlistTrack.id)) {
      playlistTracks.push(track);
      this.setState({playlistTracks: playlistTracks});
    }
  }

  removeTrack(track) {
    // Check each playlist track and return ones that don't match the unput track
    playlistTracks = this.state.playlistTracks.filter(function(playlistTrack) {
      return playlistTrack.id !== track.id;
    });
    this.setState({playlistTracks: playlistTracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);

    Spotify.savePlaylist(this.state.playlistName, trackURIs)
      .then(success => {
        if (success === false || !success) {
          console.log('save playlist failed');
        }
        else {
          console.log('save playlist success');
          this.setState({searchResults: []});
          this.updatePlaylistName('New Playlist');
        }
      });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
