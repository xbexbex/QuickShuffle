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
                console.log(response);
                dispatch(playlistsActionSuccess(response.data.items));
            })
            .catch(error => {
                console.log(error.response);
                dispatch(playlistsActionError(error));
            });
    };
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

