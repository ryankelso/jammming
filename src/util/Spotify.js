let accessToken = '';
let expiresIn
const clientId = 'ac9e81ffc1724c7b82eeca5d92c3c994';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken
    }
    else {
      // Parse the URL to see if it contains the just-aquired token,
      // but it's not set to the variable yet
      accessToken = window.location.href.match(/access_token=([^&]*)/);
      expiresIn = window.location.href.match(/expires_in=([^&]*)/);

      if (accessToken) {
        //  these lines for resetting the url should happen after the conditional statements evaluate?
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        console.log(accessToken);
        return accessToken
      }

      // Finally, if the access token variable is not set, and is not
      // in the URL, then redirect the user to the spotify authorize
      // URL to get a login and get a token
      else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      }




    }
  }
};

export default Spotify;
