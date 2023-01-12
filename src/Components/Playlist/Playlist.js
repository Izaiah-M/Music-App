import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
  render() {
    const playlistTracks = this.props.playlistTracks;
    const remove = this.props.onRemove;

    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} />
        <TrackList tracks={playlistTracks} onRemove={remove} isRemoval={true} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
