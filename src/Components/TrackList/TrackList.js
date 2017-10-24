import React from 'react';
import './TrackList.css';
import Track from '../Track/Track'

export class TrackList extends React.Components() {
    render(){
         return(
            <div className="TrackList">
                {this.props.tracks.map(track => (
                    <Track
                        track={track}
                        key={track.id} />
                    ))
                }
            </div>
        );
    }
}