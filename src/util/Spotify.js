let accessToken = '';
let expiresIn;
const clientId = 'ac9e81ffc1724c7b82eeca5d92c3c994';
const redirectUri = 'https://rkelso_jammming.surge.sh/';

const Spotify = {
  getParameterByName(name) {
    var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },
  getAccessToken() {
    if (accessToken) {
      // Access token is already set, return it
      return accessToken;
    }
    else {
      // Try parsing the url to set the access token and expire time
      accessToken = this.getParameterByName('access_token');
      expiresIn = this.getParameterByName('expires_in');

      if (accessToken) {
        // Access token is now set from the url
        // Set token to expire after set time, then remove it from the browser url
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      }

      else {
        // Finally, if the access token variable is not set, and is not in the URL,
        // then redirect the user to the spotify authorize URL to login and get a token
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

  async savePlaylist(playlistName, trackUris) {
    let currentAccessToken = this.getAccessToken();
    let userId = '';
    let playlistId = '';

    // If the playlist name or playlist track list are blank, return false to the calling function
    if (!playlistName || trackUris.length === 0) {
      return false;
    }
    // Try getting the user id from Spotify
    try {
      let userIdResponse = await fetch('https://api.spotify.com/v1/me', {headers: {Authorization: `Bearer ${currentAccessToken}`}});

      if (userIdResponse.ok) {
        let jsonUserIdResponse = await userIdResponse.json();
        userId = jsonUserIdResponse.id;
        // Try creating the playlist under the user's Spotify profile
        try {
          let playlistIdResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
              method: 'POST',
              body: JSON.stringify({name: playlistName}),
              headers: {Authorization: `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json'}
          });

          if (playlistIdResponse.ok) {
            let jsonPlaylistIdResponse = await playlistIdResponse.json();
            playlistId = jsonPlaylistIdResponse.id;
            // Try adding the playlist track list to the newly created playlist
            try {
                let playlistAddTracksResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                  {
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris}),
                    headers: {Authorization: `Bearer ${currentAccessToken}`, 'Content-Type': 'application/json'}
                });

                if (playlistAddTracksResponse.ok) {
                  let jsonPlaylistAddTracksResponse = await playlistAddTracksResponse.json();
                  return jsonPlaylistAddTracksResponse;
                }
              throw new Error('Request to add tracks to playlist failed.');
            } catch(error) {
              console.log(error);
              return;
            }
          }
          throw new Error('Request to save new playlist failed.');
        } catch (error) {
          console.log(error);
          return;
        }
      }
      throw new Error('Request to get user id failed.');
    } catch (error) {
      console.log(error);
      return;
    }
  }
};

export default Spotify;
