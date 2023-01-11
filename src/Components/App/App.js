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
    };
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
            <SearchResults SearchResults={this.state.SearchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}
