import axios from 'axios';
import * as ActionTypes from './ActionTypes';
import queryString from 'query-string';

const redirectUri = 'http://localhost:12345/sshuffle';
const key = 'Basic ' + 'YjNiNzA1NTZiNjFiNDlhZDhjMGM2OGEyOTQ2YjJmZDg6MDg4MWJmZDRiYWE0NGM2NmI5YzhjMGY4NzZjYjNiMzU='
const axiosConfig = {
    headers: {
        'Authorization': key,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

export function getAccessToken(refreshToken) {
    return dispatch => {
        dispatch(userResponsePending());
        return axios.post('https://accounts.spotify.com/api/token', queryString.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }), axiosConfig)
            .then(response => {
                dispatch(accessTokenSuccess(response.data, 'accessTokenSuccess'));
            })
            .catch(error => {
                console.log(error);
                dispatch(userResponseError(error.response, 'accessTokenError'));
            });
    };
}

export function getTokens(authCode) {
    return dispatch => {
        dispatch(userResponsePending());
        return axios.post('https://accounts.spotify.com/api/token', queryString.stringify({
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: redirectUri
        }), axiosConfig)
            .then(response => {
                dispatch(tokensSuccess(response.data, 'tokensSuccess'));
            })
            .catch(error => {
                dispatch(userResponseError(error.response, 'tokensError'));
            });
    };
}

export function getUserId(accessToken) {
    console.log(accessToken);
    return dispatch => {
        const bear = 'Bearer ' + accessToken;
        const axConfig = {
            headers: { 'Authorization': bear }
        };
        dispatch(userResponsePending());
        return axios.get('https://api.spotify.com/v1/me', axConfig)
            .then(response => {
                dispatch(userIdSuccess(response.data, 'userIdSuccess'));
            })
            .catch(error => {
                dispatch(userResponseError(error.response, 'userIdError'));
            });
    };
}

export function setAuthCode(authCode, authState) {
    return {
        type: ActionTypes.SET_AUTH_CODE,
        authCode: authCode,
        authState: authState
    };
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
    userId: data.id,
    authState: authState
});

export const accessTokenSuccess = (data, authState) => ({
    type: ActionTypes.ACCESS_TOKEN_SUCCESS,
    accessToken: data.access_token,
    authState: authState
});
