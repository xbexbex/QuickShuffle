import * as Actions from '../actions/ActionTypes';

const INITIAL_STATE = {
    isLoading: true,
    playlists: {},
    selectedPlaylists: [],
    error: undefined
};

const playlistsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Actions.ADD_SELECTED_PLAYLIST:
            playlists = state.selectedPlaylists;
            playlists.push(action.playlistId);
            return Object.assign({}, state, {
                selectedPlaylists: playlists
            });
        case Actions.REMOVE_SELECTED_PLAYLIST:
            const index = array.indexOf(action.playlistId);
            playlists = state.selectedPlaylists;
            playlists.splice(index, 1);
            return Object.assign({}, state, {
                selectedPlaylists: playlists
            });
        case Actions.PLAYLISTS_PENDING:
            return Object.assign({}, state, {
                playlistsLoading: true
            });
        case Actions.PLAYLISTS_ERROR:
            return Object.assign({}, state, {
                playlistsLoading: false,
                playlistsError: action.error
            });
        case Actions.PLAYLISTS_SUCCESS:
            return Object.assign({}, state, {
                playlistsLoading: false,
                playlists: action.playlists
            });
        default:
            return state;
    }
};

export default playlistsReducer;
