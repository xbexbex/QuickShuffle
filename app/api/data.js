import axios from 'axios';
import { AsyncStorage } from 'react-native';

axios.defaults.baseURL = 'https://api.spotify.com/v1';
let userId;

class PlaylistApi {

    async fetchPlaylists(accessToken) {
        console.log(accessToken);
        const userId = await this.getUserId(accessToken);
        if (!userId) {
            return 1;
        }
        const axConfig = {
            headers: {Authorization: 'Bearer ${accessToken}'}
        };
        console.log('doin stuff');
        const data = await axios.get('/users/${userId}/playlists', axConfig);
        console.log(data);
        console.log('this far');
        return data.playlists;
    }

    async getUserId(accessToken) {
        if (!this.userId) {
            const storageId = await AsyncStorage.getItem('@localStore:userid');
            if (storageId) {
                this.userId = storageId;
            } else {
                const axConfig = {
                    headers: { Authorization: 'Bearer ${accessToken}' }
                };
                const data = await axios.get('/me', axConfig);
                console.log(data);
                console.log(data.data);
                const newUserId = data.data.id;
                console.log('dankman: ' + newUserId);
                if (newUserId) {
                    this.userId = newUserId;
                    AsyncStorage.setItem('@localStore:userid', this.userId);
                }
            }
        }
        return this.userId;
    }
}

export {
    PlaylistApi
};
