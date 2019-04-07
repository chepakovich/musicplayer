import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongs, fetchCollection } from '../actions';

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      selectedTrackId: '',
      selectedPreviewUrl: '',
      selectedArtworkUrl100: '',
      selectedTrackName: '',
      selectedCollectionId: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.selectSong = this.selectSong.bind(this);
  }

  handleChange(event) {
    const artist = event.target.value;
    const artistQuery = artist.trim().replace(/ /g, "+");
    if (artistQuery.length > 2) {
      this.props.fetchSongs(artistQuery);
    }
    this.setState({ artist });
  }

  selectSong(song) {
    this.props.fetchCollection(song.collectionId);
    this.setState({ 
      selectedTrackId: song.trackId,
      selectedPreviewUrl: song.previewUrl,
      selectedArtworkUrl100: song.artworkUrl100,
      selectedTrackName: song.trackName,
      selectedCollectionId: song.collectionId
    })
  }

  renderList() {
    return this.props.songs.map((song, index) => {
      return (
        <div className={this.state.selectedTrackId == song.trackId ? "item active" : "item"} key={index} onClick={() => this.selectSong(song)}>
          <div className="card">
            <img src={song.artworkUrl60} className="icon" alt={song.trackName}></img>
            <div className="content">
              <div className="title">{song.trackName}</div>
              <div className="artist">{song.artistName}</div>
              <div className="album">{song.collectionName}</div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderCollection() {
    return this.props.collection.map((item, index) => {
      return (
        <div className="item name" key={index}>{item.trackName}</div>
      );
    });
  }
  
  render() {
    return (
      <div className="row">
        <div className="col-1">
          <div className="card">
            <input type="text" placeholder="Search artist" value={this.state.artist} onChange={this.handleChange} />
          </div>
          <div className="list">{this.renderList()}</div>
        </div>
        <div className="col-2">
          <div className="hide">
            <img src={this.state.selectedArtworkUrl100} alt={this.state.selectedTrackName}></img>
          </div>
          <div className="player" style={ this.state.selectedPreviewUrl ? { display: 'block'} : {display: 'none'} } >
            <audio src={this.state.selectedPreviewUrl} controls autoPlay/>
          </div>
          <div className="collection hide">{this.renderCollection()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    songs: state.songs,
    collection: state.collection
  }
};

export default connect(mapStateToProps, { fetchSongs, fetchCollection })(Songs);
