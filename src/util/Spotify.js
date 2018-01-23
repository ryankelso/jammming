let accessToken = '';
const clientId = 'ac9e81ffc1724c7b82eeca5d92c3c994';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  async getAccessToken() {
    if (accessToken) {
      return accessToken
    }
    else {
      try {
        let response = await fetch(`https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`);
        if (response.ok) {
          let jsonResponse = await response.json();
          // do something with jsonResponse...
          // console.log('jsonResponse');
          return jsonResponse;
        }
        throw new Error('Request Failed!');
      }
      catch (error) {
        console.log(error);
      }
    }
  }
};

export default Spotify;
