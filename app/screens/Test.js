import React, { Component } from 'react';
import { View, Text, Button, KeyboardAvoidingView, WebView } from 'react-native';
import { PlaylistApi } from '../../../api/data';
import { AuthenticationApi } from '../../../api/authentication';
import { LoadingScreen } from '../../commons';
import { PlaylistList } from './components';
import styles from './styles/HomeScreen';

const playlistApi = new PlaylistApi();
const authenticationApi = new AuthenticationApi();
const webView = new WebView();

export default class HomeScreen extends Component {
    static defaultProps = {
        playlistApi,
        authenticationApi,
        webView
    }

    state = {
        loading: false,
        manualAuth: false,
        errors: 0,
        authKey: null,
        fetchErrorMessage: null,
        fetching: false,
        playlists: []
    }

    async returnFromWebView(key) {
        if (key) {
            this.setState({ loading: true,
                manualAuth: false });
            const accessToken = await this.props.authenticationApi.getTokens(key);
            if (accessToken) {
                this.setState({ 
                    loading: false,
                    authKey: accessToken
                });
                this.fetchPlaylists();
            } else {
                const errorPlus = this.state.errors + 1;
                this.setState({
                    loading: false,
                    errors: errorPlus,
                    manualAuth: true
                });
            }
        } else {
            this.setState({ manualAuth: true });
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        setTimeout(() => this.setState({ loading: false }), 2000);
        this.checkIfValidKeys();
    }

    
    async checkIfValidKeys() {
        const response = await this.props.authenticationApi.checkIfValidKeyExists();
        if (response) {
            this.setState({
                authKey: response,
                errors: 0,
                manualAuth: false
            });
        } else if (response == 1) {
            const errorPlus = this.state.errors + 1;
            this.setState({
                errors: errorPlus,
                manualAuth: true
            });
        } else {
            this.setState({
                authKey: null,
                manualAuth: true
            });
        }
    }

    async fetchPlaylists() {
        this.setState({
            fetching: true
        });
        const data = await this.props.playlistApi.fetchPlaylists(this.state.authKey);
        if (data) {
            this.setState({ 
                errors: 0,
                playlists: data.playlists,
                fetchErrorMessage: null
            });
            return true;
        } else {
            const errorPlus = this.state.errors + 1;
            this.setState({
                fetchErrorMessage: 'Could not fetch playlists',
                errors: errorPlus
            });
            return false;
        }
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
            this.returnFromWebView(null);
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
                    ref={webview => { this.props.webView = webview; }}
                    source={{uri: this.props.authenticationApi.getUrlForManualAuth()}}
                    style={styles.webView}
                    scalesPageToFit
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    returnFromWebView={this.returnFromWebView}
                    javaScriptEnabledAndroid
                    backButtonEnabled
                />
            );
        } else if (this.state.errors > 1) {
            return (
            <View style={styles.root}>
                <View style={styles.topContainer}>
                    <Text>Error connecting to Spotify</Text>
                    <Button
                        onPress={this.onRetryButtonPress}
                        setParentState={newState=>this.setState(newState)}
                        title="Try again"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
            )
        } else {
            return (
                <View style={styles.root}>
                    <View style={styles.topContainer}>
                        <Text>QuickShuffle</Text>
                        {!this.state.fetchErrorMessage ? 
                            <Text>
                                {this.state.fetchErrorMessage}
                            </Text> 
                        : null }
                        <Button
                            onPress={this.onRefreshButtonPress.bind(this)}
                            fetchPlaylists={this.fetchPlaylists}
                            title="Refresh playlists"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                    <View style={styles.bottomContainer}>
                        <PlaylistList playlists={this.state.playlists} />
                    </View>
                </View>
            );
        }
    }
}
