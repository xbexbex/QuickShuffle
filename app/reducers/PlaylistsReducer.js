import * as Actions from '../actions/ActionTypes';

const INITIAL_STATE = {
    isLoading: true,
    data: {},
    error: undefined
};

const playlistsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
                data: action.data[1]
            });
        default:
            return state;
    }
};

export default playlistsReducer;