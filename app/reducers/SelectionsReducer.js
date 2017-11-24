const INITIAL_STATE = {
    selectedPlaylistIds: []
};

export const playlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SELECT_PLAYLIST_INDEX':
            return {
                ...state,
                selectedPlaylistIds: [...state.selectedPlaylistIds, action.payload]
            };
        default:
            return state;
    }
};
