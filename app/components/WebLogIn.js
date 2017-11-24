import React, { Component } from 'react';
import { WebView, Text } from 'react-native';
import { connect } from 'react-redux';
import { LoadingScreen } from './LoadingScreen';
import queryString from 'query-string';
import { getTokens } from '../actions/UserActions';
import styles from './styles/WebLogIn';


function mapStateToProps(state) {
    return {
        isLoading: state.userLoading,
        error: state.userError,
        data: state.userData,
    };
}

class WebLogIn extends Component {

    onNavigationStateChange(e) {
        const url = e.url;
        console.log(url);
        if (url.includes('http://localhost:12345/sshuffle?') && url.includes('code=')) {
            let authCode;
            if (url.includes('&')) {
                authCode = url.substring(url.lastIndexOf('=') + 1, url.lastIndexOf('&'));
            } else {
                authCode = url.substring(url.lastIndexOf('=') + 1);
            }
            this.loginReturn(authCode);
        } else if (url.includes('http://localhost:12345/sshuffle?')) {
            return null;
        }
        this.setState({
            canGoBack: e.canGoBack
        });
    }

    onReceiveError() {
        this.setState({
            url: 'http://spotify.com'
        });
    }

    getUrlForManualAuth() {
        const parsed = queryString.parse();
        parsed.client_id = 'b3b70556b61b49ad8c0c68a2946b2fd8';
        parsed.response_type = 'code';
        parsed.redirect_uri = 'http://localhost:12345/sshuffle';
        parsed.scope = 'playlist-modify-private playlist-modify-public playlist-read-private user-read-private';
        const url = 'https://accounts.spotify.com/authorize/?' + queryString.stringify(parsed);
        return url;
    }

    async loginReturn(authCode) {
        this.props.dispatch(getTokens(authCode, 'authCodeSuccess'));
    }

    render() {
        if (this.props.isLoading) {
            return <LoadingScreen />;
        }
        return (
            <WebView
                source={{ uri: this.getUrlForManualAuth() }}
                style={styles.container}
                scalesPageToFit
                onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                onReceiveError={this.onReceiveError.bind(this)}
                loginReturn={this.loginReturn}
                javaScriptEnabledAndroid
                backButtonEnabled
            />
        );
    }
}

export default connect(mapStateToProps)(WebLogIn);
