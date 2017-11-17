import axios from 'axios';

axios.defaults.baseURL = 'https://api.spotify.com/v1/users/';
let accessToken;
let userId;

class PlaylistApi {

    async fetchPlaylists() {
        const { data } = await axios.get('${this.userId}/playlists', { 'headers': { 'Authorization': this.accessToken } });
        return data.playlists;
    }

    async setAccessToken(accessToken) {
        this.accessToken = 'Bearer ' + accessToken;
    }

    async setUserId(userId) {
        this.userId = userId;
    }
}

export {
    PlaylistApi
};
