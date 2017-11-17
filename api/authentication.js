import axios from 'axios';

axios.defaults.baseURL = 'https://accounts.spotify.com/api/token';
const clientId = 'b3b70556b61b49ad8c0c68a2946b2fd8';
const redirectUri = 'http://localhost:12345/sshuffle';
const queryString = require('query-string');
const key = 'basic ' + 'YjNiNzA1NTZiNjFiNDlhZDhjMGM2OGEyOTQ2YjJmZDg6MDg4MWJmZDRiYWE0NGM2NmI5YzhjMGY4NzZjYjNiMzU='

class AuthenticationApi {

    async checkIfValidKeyExists() {
        try {
            const refreshToken = await AsyncStorage.getItem('@localStore:refreshtoken');
            if (value !== null) {
                const { data } = await axios.post('', {'headers':{ 
                    'Authorization': this.key,} 
                }, {
                    grant_type: 'refresh_token',
                    refresh_token : refreshToken
                })
                return data.access_token;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    getUrlForManualAuth() {
        const parsed = queryString.parse();
        parsed.client_id = clientId;
        parsed.response_type = 'code';
        parsed.redirect_uri = redirectUri;
        parsed.scope = 'playlist-modify-private playlist-modify-public playlist-read-private';
        const url = 'https://accounts.spotify.com/authorize/?' + queryString.stringify(parsed);
        return url;
    }

    getTokens(authKey) {
        return null;
    }
}

export {
    AuthenticationApi
}