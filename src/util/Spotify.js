let accessToken = '';
let expiresIn;
const clientId = 'ac9e81ffc1724c7b82eeca5d92c3c994';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getParameterByName(name) {
    var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },
  getAccessToken() {
    if (accessToken) {
      console.log("Access token already set: " + accessToken);
      return accessToken
    }
    else {
      // Try parsing the url to set the access token and expire time
      accessToken = this.getParameterByName('access_token');
      expiresIn = this.getParameterByName('expires_in');

      if (accessToken) {
        // Expire the token after set time, remove it from the browser url
        console.log("Access token is now set from the response url: " + accessToken);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      }

      // Finally, if the access token variable is not set, and is not in the URL,
      // then redirect the user to the spotify authorize URL to login and get a token
      else {
        console.log("Needs to request an access token from Spotify.");
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      }
    }
  },

  async search(searchTerm) {
    let currentAccessToken = this.getAccessToken();
    try {
      let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {headers: {Authorization: `Bearer ${currentAccessToken}`}});
      if (response.ok) {
        let jsonResponse = await response.json();
        if (jsonResponse.tracks.items) {
          return jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          });
        }
      }
      throw new Error('Request Failed!');
    } catch (error) {
      console.log(error);
    }
  },
  // name of the playlist, and array of track URI's
  async savePlaylist(playlistName, trackUris) {
    let currentAccessToken = this.getAccessToken();
    let authorizationHeader = {Authorization: `Bearer ${currentAccessToken}`};
    let contentTypeHeader = {'Content-Type': 'application/json'};
    //let headers = {headers: {Authorization: `Bearer ${currentAccessToken}`}};
    let userId = '';
    let playlistId = '';
    if (playlistName && trackUris) {
      console.log(playlistName + ", " + trackUris);
      try {
        let response = await fetch('https://api.spotify.com/v1/me', {headers: authorizationHeader});
        if (response.ok) {
          let jsonResponse = await response.json();
          console.log(jsonResponse);
          userId = jsonResponse.id;
          try {

            console.log('user id? : ' + userId);
            let playlistIdResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
              {
                method: 'POST',
                body: {name: playlistName},
                headers: {Authorization: `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json'}
            });
            if (playlistIdResponse.ok) {
              let jsonPlaylistIdResponse = await playlistIdResponse.json();
              playlistId = jsonPlaylistIdResponse.id;
              console.log(playlistId);
              // one more try/catch
            }
            return; // remove and return in the final try catch
          } catch (error) {
            console.log(error);
          }
            //console.log(jsonResponse);
        }
        //throw new Error('Request to get user id failed.');
        console.log('throw some dumb error?');
      } catch (error) {
        console.log(error);
      }
      //console.log(userId);
      // still inside the first if, insert another try here for the next request
      /*try {
        // save a new playlist and set the response id to playlistID (new variable)
        let response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            method: 'POST',
            body: {},
            headers: {headers: authorizationHeader, contentTypeHeader}
        });
        throw new Error('Request to create new playlist failed.');
      } catch (error) {
        console.log(error);
      }*/

    }
  }

  /*search(searchTerm) {
    this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {headers: {Authorization: `Bearer ${accessToken}`}})
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, function(networkError) {
      console.log(networkError.message);
    })
    .then(function(jsonResponse) {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        });
      }
    });
  }*/
};

export default Spotify;
