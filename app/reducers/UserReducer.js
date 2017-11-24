import * as Actions from '../actions/ActionTypes';

const INITIAL_STATE = {
    isLoading: true,
    refreshToken: undefined,
    accessToken: undefined,
    userId: undefined,
    error: undefined,
    authCode: undefined,
    authState: undefined
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Actions.USER_RESPONSE_PENDING:
            return Object.assign({}, state, {
                userLoading: true
            });
        case Actions.USER_RESPONSE_ERROR:
            return Object.assign({}, state, {
                userLoading: false,
                userError: action.error,
                authState: action.authState
            });
        case Actions.TOKENS_SUCCESS:
            return Object.assign({}, state, {
                userLoading: false,
                refreshToken: action.refreshToken,
                accessToken: action.accessToken,
                authState: action.authState
            });
        case Actions.ACCESS_TOKEN_SUCCESS:
            return Object.assign({}, state, {
                userLoading: false,
                accessToken: action.accessToken,
                authState: action.authState
            });
        case Actions.USER_ID_SUCCESS:
            return Object.assign({}, state, {
                userLoading: false,
                userId: action.userId,
                authState: action.authState
            });
        case Actions.SET_AUTH_CODE:
            return Object.assign({}, state, {
                authCode: action.authCode,
                authState: action.authState
            });
        default:
            return state;
    }
};

export default userReducer;
