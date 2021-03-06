import React, {Component} from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value)
    }

    render(){
        return(
            <div className="Playlist">
            <input 
                id='playlistName'
                onChange={this.handleNameChange}                
                value={this.props.playlistName}/>
            <TrackList 
                tracks={this.props.playlistTracks} 
                onRemove={this.props.onRemove}/>
            <a 
                className="Playlist-save" 
                onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
          </div>
        );
    }
}

export default PlayList;