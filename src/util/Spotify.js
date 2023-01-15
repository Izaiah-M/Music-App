const clientID = "4fff23c99ab74f8aa1b7fd4fdbac92a8";
const redirectUri = "https://jamajamm.netlify.app/";
let accessToken;

window.onload = () => {
  Spotify.getAccessToken();
};

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    // check for access tocken match
    // window.location.href shows the url of the website you currently on
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      //   to help clear the paramaters and allow us to get a new access token when the old one expires
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=playlist-modify-public&redirect_uri=${redirectUri}
        `;
      return (window.location = accessUrl);
    }
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // console.log(response.json());
      const jsonResponse = await response.json();
      const tracks = jsonResponse.tracks;

      const items = tracks.items;
      console.log(items);

      const result = items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));

      return result;
    } catch (error) {
      console.log(error);
    }
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com//v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },
};

export default Spotify;
