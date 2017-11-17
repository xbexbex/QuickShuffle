import { AppLoading } from 'expo';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet'
import Colors from './styling/Colors'
import { HomeScreen } from './src/screens'
/* import { cachedFonts } from './helpers'; */

EStyleSheet.build(Colors);

export default class App extends React.Component {

  state = {
    fontLoaded: true,
  }

 /*  componentDidMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    const fontAssets = cachedFont([{
      anton: require('./assets/fonts/Anton-Regular.ttf')
    }]);
    await Promise.all(fontAssets);
    this.setState({
      fontLoaded: true
    })
  } */

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return <HomeScreen />;
    }
  }
}