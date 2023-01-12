const clientID = "4fff23c99ab74f8aa1b7fd4fdbac92a8";
const redirectUri = "http://localhost:3000";
let accessToken;

const Spotify = {
  getAccessTocken() {
    if (accessToken) {
      return accessToken;
    }

    // check for access tocken match
    // window.location.href shows the url of the website you currently on
    const accessTokenMatch = window.location.href.match(
      "/access_token=([^&]*)"
    );
    const expiresInMatch = Window.location.href.match("/expires_in=([^&]*)/");

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      //   to help clear the paramaters and allow us to get a new access token when the old one expires
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}
        `;
    }
  },
};

export default Spotify;
