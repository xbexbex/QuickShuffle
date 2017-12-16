import axios from 'axios';
import * as ActionTypes from './ActionTypes';

axios.defaults.baseURL = 'https://api.spotify.com/v1';


export function getPlaylists(accessToken, userId) {
    return dispatch => {
        const bear = 'Bearer ' + accessToken;
        const axConfig = {
            headers: { 'Authorization': bear }
        };
        dispatch(playlistsActionPending());
        const url = '/users/' + userId + '/playlists';
        return axios.get(url, axConfig)
            .then(response => {
                dispatch(playlistsActionSuccess(response.data.items));
            })
            .catch(error => {
                dispatch(playlistsActionError(error));
            });
    };
}

export function getPlaylist(accessToken, userId, playlistId) {
    return dispatch => {
        const bear = 'Bearer ' + accessToken;
        const axConfig = {
            headers: { 'Authorization': bear }
        };
        const url = '/users/' + userId + '/playlists/' + playlistId;
        return axios.get(url, axConfig)
            .then(response => {
                console.log(response.data);
                dispatch(playlistsActionSuccess(response.data));
            })
            .catch(error => {
                console.log(error.response);
                dispatch(playlistsActionError(error));
            });
    };
}

function changePlaylistName(accessToken, userId, playlistId, playlistName) {
    const bear = 'Bearer ' + accessToken;
    const axConfig = {
        headers: {
            'Authorization': bear,
            'Content-Type': 'application/json'
        }
    };
    const url = '/users/' + userId + '/playlists/' + playlistId;
    return axios.put(url, axConfig, {
        name: playlistName
    })
        .then(response => {
            return true;
        })
        .catch(error => {
            console.log(error.response);
            return false;
        });
}

function createPlaylist(accessToken, userId, playlistName, playlistData) {
    const bear = 'Bearer ' + accessToken;
    const axConfig = {
        headers: {
            'Authorization': bear,
            'Content-Type': 'application/json'
        }
    };
    const url = '/users/' + userId + '/playlists';
    return axios.post(url, axConfig, {
        name: playlistName,
        public: false
    })
        .then(response => {
            return true;
        })
        .catch(error => {
            console.log(error.response);
            return false;
        });
}

function removeSongsFromPlaylist(accessToken, userId, playlistId, playlistTrackPositions, playlistSnapshotId) {
    const bear = 'Bearer ' + accessToken;
    const axConfig = {
        headers: {
            'Authorization': bear,
            'Content-Type': 'application/json'
        }
    };
    const url = '/users/' + userId + '/playlists/' + playlistId + '/tracks';
    return axios.post(url, axConfig, {
        positions: playlistTrackPositions,
        snapshot_id: playlistSnapshotId
    })
        .then(response => {
            return true;
        })
        .catch(error => {
            console.log(error.response);
            return false;
        });
}

function addSongsToPlaylist(accessToken, userId, playlistId, playlistUris, insertPosition) {
    const bear = 'Bearer ' + accessToken;
    const axConfig = {
        headers: {
            'Authorization': bear,
            'Content-Type': 'application/json'
        }
    };
    const url = '/users/' + userId + '/playlists/' + playlistId + '/tracks';
    return axios.post(url, axConfig, {
        uris: playlistUris,
        position: inserPosition
    })
        .then(response => {
            return true;
        })
        .catch(error => {
            console.log(error.response);
            return false;
        });
}

function shufflePlaylist(accessToken, userId, playlistId) {
    const playlist = getPlaylist(accessToken, userId, playlistId);
    const trackStuff =
}

export function ShufflePlaylists(accessToken, userId, playlists) {
    return dispatch => {
        dispatch(playlistsActionPending);
        try {
            playlists.map((playlist) => {
                shufflePlaylist(accessToken, userId, playlist.id)
            });
            return dispatch(playlistsActionSuccess);
        } catch (error) {
            return dispatch(playlistsActionError);
        }
    }

}

export const playlistsActionPending = () => ({
    type: ActionTypes.PLAYLISTS_PENDING
});

export const playlistsActionError = (error) => ({
    type: ActionTypes.PLAYLISTS_ERROR,
    playlistsError: error
});

export const playlistsActionSuccess = (data) => ({
    type: ActionTypes.PLAYLISTS_SUCCESS,
    playlists: data
});

export const addSelectedPlaylist = (data) => ({
    type: ActionTypes.ADD_SELECTED_PLAYLIST,
    playlistId: data
});

export const removeSelectedPlaylist = (data) => ({
    type: ActionTypes.REMOVE_SELECTED_PLAYLIST,
    playlistId: data
});

export const removePlaylist = (data) => ({
    type: ActionTypes.REMOVE_PLAYLIST,
    playlistId: data
});
