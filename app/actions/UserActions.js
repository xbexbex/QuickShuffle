import { connect } from 'react-redux';
import axios from 'react-native-axios';
import * as ActionTypes from './ActionTypes';
import queryString from 'query-string';

axios.defaults.baseURL = 'https://accounts.spotify.com/api/token';
const redirectUri = 'http://localhost:12345/sshuffle';
const key = 'Basic ' + 'YjNiNzA1NTZiNjFiNDlhZDhjMGM2OGEyOTQ2YjJmZDg6MDg4MWJmZDRiYWE0NGM2NmI5YzhjMGY4NzZjYjNiMzU='
const axiosConfig = {
    headers: {
        'Authorization': key,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

export function callUserService() {
    return dispatch => {
        dispatch(userResponsePending());
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            dispatch(refreshTokenSuccess(response.data));
        })
        .catch(error => {
            dispatch(userResponseError(error));
        });
    };
}

export function getAccessToken(refreshToken) {
    return dispatch => {
        dispatch(userResponsePending());
        return axios.post('', {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }, axiosConfig)
        .then(response => {
            dispatch(accessTokenSuccess(response.data));
        })
        .catch(error => {
            dispatch(userResponseError(error));
        });
    };
}

export function getTokens(authCode) {
    return dispatch => {
        if (!authCode) {
            return dispatch(userResponseError('Authentication unsuccessful'));
        }
        dispatch(setAuthCode(authCode));
        console.log(authCode);
        dispatch(userResponsePending());
        return axios.post('', queryString.stringify({
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: redirectUri
        }), axiosConfig)
        .then(response => {
            dispatch(tokensSuccess(response.data));
        })
        .catch(error => {
            dispatch(userResponseError(error, 'tokensError'));
        });
    };
}

export function setAuthCode(authCode, authState) {
    return {
        type: ActionTypes.SET_AUTH_CODE,
        authCode: authCode,
        authState: authState
    }
}

export const userResponsePending = () => ({
    type: ActionTypes.USER_RESPONSE_PENDING
});

export const userResponseError = (error, authState) => ({
    type: ActionTypes.USER_RESPONSE_ERROR,
    userError: error,
    authState: authState
});

export const tokensSuccess = (data, authState) => ({
    type: ActionTypes.TOKENS_SUCCESS,
    refreshToken: data.refresh_token,
    accessToken: data.access_token,
    authState: authState
});

export const userIdSuccess = (data, authState) => ({
    type: ActionTypes.USER_ID_SUCCESS,
    userId: data.refresh_token,
    authState: authState
});

export const accessTokenSuccess = (data, authState) => ({
    type: ActionTypes.REFRESH_TOKEN_SUCCESS,
    accessToken: data.access_token,
    authState: authState
});
