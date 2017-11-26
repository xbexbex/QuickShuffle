import React, { Component } from 'react';
import { View, Text, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import WebLogIn from '../components/WebLogIn';
import styles from './styles/TestScreen';
import icon from '../assets/images/icon.png';
import { PlaylistList } from '../components/PlaylistList';
import { AntonText } from '../components/StyledText';
import { LoadingScreen } from '../components/LoadingScreen';
import { STATUS_BAR_HEIGHT } from '../constants';
import { getTokens } from '../actions/UserActions';

function mapStateToProps(state) {
    return {
        authCode: state.userReducer.authCode,
        accessToken: state.userReducer.accessToken, 
        refreshToken: state.userReducer.refreshToken, 
        error: state.userReducer.userError, 
        authState: state.userReducer.authState
    };
}

class TestScreen extends Component {

    static navigationOption = () => ({
        title: 'Playlists',
        headerStyle: {
            height: Platform.OS === 'android'
                ? 54 + STATUS_BAR_HEIGHT
                : 54,
            backgroundColor: 'green'
        },
        headerTitleStyle: {
            marginTop: Platform.OS === 'android'
                ? STATUS_BAR_HEIGHT
                : 0,
            backgroundColor: 'red'
        },
        headerLeft: <Image source={icon} style={styles.imageStyle} />
    });

    constructor(props) {
        super(props);
        this.state = {
            viewState: 'loading'
        };
    }

    componentDidMount() {
        console.log('abua');
        console.log(this.props.error);
        console.log('log:' + this.props.authCode);
        console.log(this.props.refreshToken);
        console.log(this.props.accessToken);
    }

    componentWillReceiveProps(props) {
        if (props.authState !== this.props.authState) {
            switch (props.authState) {
                case 'authCodeSuccess':
                    getTokens(props.authCode);
                    this.setState({ viewState: 'loading' });
                    break;
                case 'tokensSuccess':
                    this.setState({ viewState: 'playlists' });
                    break;
                case undefined:
                    this.setState({ viewState: 'web' });
                    break;
                case 'webError':
                    this.setState({ viewState: 'web' });
                    break;
                case 'refreshTokenError':
                    this.setState({ viewState: 'web' });
                    break;
                default:
                    this.setState({ viewState: 'playlists' });
            }
        }
        console.log(props.error);
        console.log(props.authCode);
        console.log(props.refreshToken);
        console.log(props.accessToken);
    }

    render() {
        if (this.state.viewState === 'web') {
            return (
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <WebLogIn />
                </KeyboardAvoidingView>
            );
        } else if (this.state.viewState === 'playlists') {
            return (<PlaylistList />);
        } else if (this.state.viewState === 'loading') {
            return (<LoadingScreen />);
        }
        return (
            <Text>
                Something went wrong
            </Text>
        );
    }
}

export default connect(mapStateToProps)(TestScreen);

/*<PlaylistItem
post={post}
onOpen={this.openMovie}
key={index}
/>)} */
