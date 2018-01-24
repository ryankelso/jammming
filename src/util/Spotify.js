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
    try {
      let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {headers: {Authorization: `Bearer ${accessToken}`}});
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
