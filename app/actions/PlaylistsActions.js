import { connect } from 'react-redux';
import axios from 'react-native-axios';
import * as ActionTypes from './ActionTypes';

export function getPlaylists(accessToken) {
    return dispatch => {
        dispatch(playlistsActionPending());
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                dispatch(playlistsActionSuccess(response.data));
            })
            .catch(error => {
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
    playlistsData: data
});

