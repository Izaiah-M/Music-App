import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
  render() {
    const playlistName = this.props.playlistName;
    const playlistTracks = this.props.playlistTracks;

    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} />
        <TrackList tracks={playlistTracks} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
