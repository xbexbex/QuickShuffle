import { AsyncStorage } from 'react-native';
import axios from 'axios';

axios.defaults.baseURL = 'https://accounts.spotify.com/api/token';
const clientId = 'b3b70556b61b49ad8c0c68a2946b2fd8';
const redirectUri = 'http://localhost:12345/sshuffle';
const queryString = require('query-string');
const key = 'Basic ' + 'YjNiNzA1NTZiNjFiNDlhZDhjMGM2OGEyOTQ2YjJmZDg6MDg4MWJmZDRiYWE0NGM2NmI5YzhjMGY4NzZjYjNiMzU='
const axiosConfig = {
    headers: {
        'Authorization': key,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};


class AuthenticationApi {

    async checkIfValidKeyExists() {
        try {
            const refreshToken = await AsyncStorage.getItem('@localStore:refreshtoken');
            if (value) {
                const { data } = await axios.post('', {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                }, axiosConfig);
                return data.access_token;
            } else {
                return 1;
            }
            return null
        } catch (error) {
            return null;
        }
    }

    getUrlForManualAuth() {
        const parsed = queryString.parse();
        parsed.client_id = clientId;
        parsed.response_type = 'code';
        parsed.redirect_uri = 'http://localhost:12345/sshuffle';
        parsed.scope = 'playlist-modify-private playlist-modify-public playlist-read-private user-read-private';
        const url = 'https://accounts.spotify.com/authorize/?' + queryString.stringify(parsed);
        return url;
    }

    async getTokens(authKey) {
        try {
            let accessToken;
            const data = await axios.post('', queryString.stringify({
                grant_type: 'authorization_code',
                code: authKey,
                redirect_uri: redirectUri
            }), axiosConfig);
            AsyncStorage.setItem('@localStore:refreshtoken', data.data.refresh_token);
            return data.data.access_token;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export {
    AuthenticationApi
}