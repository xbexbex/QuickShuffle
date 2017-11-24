import { AppLoading, Asset, Font } from 'expo';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import configureStore from './app/store';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { PersistGate } from 'redux-persist/es/integration/react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from './app/styling/Colors';
import TestScreen from './app/screens/TestScreen';
import AboutScreen from './app/screens/AboutScreen';

EStyleSheet.build(Colors);
const { persistor, store } = configureStore();

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
  };

  _loadResourcesAsync = async () => {
    store.dispatch({ type: 'GET_PLAYLISTS' });
    return Promise.all([
      Asset.loadAsync([
        require('./app/assets/images/icon.png'),
      ]),
      Font.loadAsync({
        'anton': require('./app/assets/fonts/Anton-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
  
  render() {
    const MainNavigator = StackNavigator({
      Main: {
        screen: TestScreen
      },
      About: {
        screen: AboutScreen
      }
    });

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <PersistGate
          loading={<ActivityIndicator />}
          persistor={persistor}
        >
          <MainNavigator />
        </ PersistGate>
      </Provider >
    );
  }
}
