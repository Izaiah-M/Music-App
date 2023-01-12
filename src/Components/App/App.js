import "./App.css";
import React from "react";
import { Playlist } from "../Playlist/Playlist";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [
        {
          id: 1,
          name: "Bless Me",
          artist: "Maverick City",
          album: "2022",
        },
        {
          id: 2,
          name: "Hands in it",
          artist: "Mike",
          album: "Hands",
        },
        {
          id: 3,
          name: "Joy",
          artist: "Tauren Wells",
          album: "Joy",
        },
      ],
      playlistName: "Mine",
      playlistTracks: [
        {
          id: 4,
          name: "Bless Me",
          artist: "Maverick City",
          album: "2022",
        },
        {
          id: 5,
          name: "Hands in it",
          artist: "Mike",
          album: "Hands",
        },
        {
          id: 6,
          name: "Joy",
          artist: "Tauren Wells",
          album: "Joy",
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  // Adds track to a playlist
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  // removes track from a playlist
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  // updates playlist name
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  // Saves the playlist to a users account
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              SearchResults={this.state.SearchResults}
              onAdd={this.addTrack}
            />
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
