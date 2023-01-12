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
      window.location = accessUrl;
    }
  },
  async search(term) {
    const accessTokn = Spotify.getAccessTocken();
    const baseUrl = "https://api.spotify.com";
    const endPoint = `/v1/search?type=track&q=${term}`;
    const urlToFetch = `${baseUrl}${endPoint}`;

    try {
      const response = await fetch(urlToFetch, {
        headers: { Authorization: `Bearer ${accessTokn}` },
      });

      if (response.ok) {
        const jsonResponse = await response.json();

        if (!jsonResponse.tracks) {
          return [];
        }

        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artist[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },
};

export default Spotify;
