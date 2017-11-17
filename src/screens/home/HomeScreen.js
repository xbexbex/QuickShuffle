import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PlaylistApi } from '../../../api/data';
import { AuthenticationApi } from '../../../api/authentication';
import { LoadingScreen } from '../../commons'
import { PlaylistList } from './components';
import { WebView } from 'react-native';
import styles from './styles/HomeScreen';

const playlistApi = new PlaylistApi();
const authenticationApi = new AuthenticationApi();
const webView = new WebView();

class HomeScreen extends Component {
    static defaultProps = {
        playlistApi,
        authenticationApi
    }

    state = {
        loading: false,
        manualAuth: false,
        playlists: []
    }

    async returnFromWebView(key) {
        if (key == '1') {
            this.setState({ manualAuth: true });
        } else {
            this.setState({ loading: true,
            manualAuth: false });
            const accessToken = await this.props.authenticationApi.getTokens(key);
            this.setState({ loading: true });
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        setTimeout(() => this.setState({ loading: false }), 2000);
        this._checkIfValidKeys();
    }

    
    async _checkIfValidKeys() {
        const response = await this.props.authenticationApi.checkIfValidKeyExists();
        if (response == false) {
            this.setState({
                manualAuth: true
            });
        } else {
            this.authKey = response;
            this.setState({
                manualAuth: false
            });
        }
    }

    async fetchPlaylists() {
        const data = await this.props.playlistApi.fetchPlaylists();
        this.setState({ playlists: data.playlists });
    }

    _onNavigationStateChange(e){
        const url = e.url;
        if (url.includes('sshuffle') && url.includes('code=')) {
            let authCode;
            if (url.includes('&')) {
                authCode = url.substring(url.lastIndexOf("=") + 1, url.lastIndexOf('&'));
            } else {
                authCode = url.substring(url.lastIndexOf("=") + 1);
            }
            this.returnFromWebView(authCode);
        } else if (url.includes('sshuffle')) {
            this.returnFromWebView('1');
        }
        this.setState({
            canGoBack: e.canGoBack
        });
    }

    render() {
        if (this.state.loading) {
            return <LoadingScreen />;
        } else if (this.state.manualAuth) {
            return (
            <WebView
                ref={webview => { this.webView = webview; }}
                source={{uri: this.props.authenticationApi.getUrlForManualAuth()}}
                style={styles.webView}
                scalesPageToFit={true}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                returnFromWebView={this.returnFromWebView}
                javaScriptEnabledAndroid={true}
                backButtonEnabled={true}
            />
            );
        } else {
            return (
                <View style={styles.root}>
                    <View style={styles.topContainer}>
                        <Text>QuickShuffle</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <PlaylistList playlists={this.state.playlists} />
                    </View>
                </View>
            );
        }
    }
}
export default HomeScreen;