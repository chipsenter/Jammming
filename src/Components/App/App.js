import React, {Component} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/PlayList';
import Spotify from '../../util/Spotify';

const newPlaylistName = 'New Playlist';

class App extends Component {
     constructor(props) {
         super(props);
         this.state = {
             searchResults: [],
             searchTerm: '',
             playlistName: newPlaylistName,
             playlistTracks: []
         };
         this.addTrack = this.addTrack.bind(this);
         this.removeTrack = this.removeTrack.bind(this);
         this.updatePlaylistName = this.updatePlaylistName.bind(this);
         this.savePlaylist = this.savePlaylist.bind(this);
         this.search = this.search.bind(this);
     }

    addTrack(track) {
        /*let updatedPlaylistTracks = this.state.playlistTracks.concat(track);
        this.setState({
          playlistTracks: updatedPlaylistTracks
        });*/
        let playlist = this.state.playlistTracks;
        let isInPlaylist = playlist.find(currentTrack => currentTrack.id === track.id);
        if (!isInPlaylist) {
            playlist.push(track);
            this.setState({playlistTracks: playlist});
        }
    }   

    removeTrack(track) {
        let playlistTracks = this.state.playlistTracks;
        let filteredPlaylistTracks = playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id); 
        this.setState({playlistTracks: filteredPlaylistTracks});
    } 

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(track => track.URI)
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
        this.setState({
            searchTerm: '',
            playlistName: '',
            searchResults: []
        })
    }

    search(searchTerm) {
        Spotify.search(searchTerm).then(tracks => {
            console.log(`trackz: ${JSON.stringify(tracks)}`);
            this.setState({searchResults: tracks})
        })
    }       

    render() {
        return (<div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={this.search}
                searchTerm={this.state.searchTerm} />
                <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                    <Playlist 
                        playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName} 
                        onSave={this.savePlaylist}       
                    />
                </div>
            </div>
        </div>);
    }   
}
export default App;