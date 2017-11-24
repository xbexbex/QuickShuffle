import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, /* persistCombineReducers, */ persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
//import { createLogger } from 'redux-logger';
import playlistsReducer from '../reducers/PlaylistsReducer';
import userReducer from '../reducers/UserReducer';

const playlistsConf = {
    key: 'playlistsReducer',
    storage: AsyncStorage,
    blacklist: ['playlistsError']
};

const userConf = {
    key: 'userReducer',
    storage: AsyncStorage,
    blacklist: ['userError', 'authState']
};

/* const config = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['error']
}; */


const reducers = combineReducers({
    playlistsReducer: persistReducer(playlistsConf, playlistsReducer),
    userReducer: persistReducer(userConf, userReducer)
});

/* const reducers = persistCombineReducers(config, {
    playlistsReducer: playlistsReducer,
    userReducer: userReducer
}); */

const rootReducers = (state, action) => {
    return reducers(state, action);
};

//const logger = createLogger();

export default function configureStore() {
    const store = createStore(
        rootReducers,
        undefined,
        compose(
            applyMiddleware(
                thunk, 
//                logger
            ))
    );
    const persistor = persistStore(store);

    return { persistor, store };
}
