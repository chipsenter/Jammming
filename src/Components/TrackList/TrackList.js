import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        console.log(this.props);
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

export default TrackList;
