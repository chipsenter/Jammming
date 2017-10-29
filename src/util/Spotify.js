const CLIENT_ID = 'a6a6f5fe1a6e4ddf9992e1444045483d';
const REDIRECT_URI = 'http://jamming_jfl.surge.sh/';        //http://jamming_jfl.surge.sh/
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
          accessToken = accessTokenMatch[1];
          const expiresIn = Number(expiresInMatch[1]);
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
          return accessToken;
        } 
        else {
          console.log("NO TOKEN, REDIRECTING!!!")
          const accessURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
          window.location = accessURL;
        }
    },
    search(term) {
        accessToken = Spotify.getAccessToken();
        const fetchURL = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const headers = {headers: {Authorization: `Bearer  ${accessToken}`}};
        return fetch(fetchURL, headers).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            if (jsonResponse.tracks.items) {
              return jsonResponse.tracks.items.map(track => {
                return {
                  id: track.id,
                  name: track.name,
                  artist: track.artists[0].name,
                  album: track.album.name,
                  uri: track.uri,
                };
              })
            } else return [];
          });
      },
      
    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs) return;
        const accessToken = Spotify.getAccessToken();
        console.log(`accessToken: ${accessToken}`);
        const headers = {Authorization: `Bearer ${accessToken}`};
        const createPlaylistHeaders = {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: name}) 
        };
        const addTracksHeaders = {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({'uris': trackURIs}) 
        };
        let userID;
        let playlistID;
        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
          userID = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, createPlaylistHeaders)
            .then(response => response.json())
            .then(jsonResponse => {
              console.log(jsonResponse)
              playlistID = jsonResponse.id;
              //console.log(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`);
              //console.log(JSON.stringify(addTracksHeaders));
              return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, addTracksHeaders)
            });
        });
      }
};


export default Spotify;