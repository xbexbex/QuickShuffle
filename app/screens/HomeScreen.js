import React, { Component } from 'react';
import { View, Text, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import WebLogIn from '../components/WebLogIn';
import styles from './styles/TestScreen';
import icon from '../assets/images/icon.png';
import PlaylistList from '../components/PlaylistList';
import { AntonText } from '../components/StyledText';
import LoadingScreen from '../components/LoadingScreen';
import { STATUS_BAR_HEIGHT } from '../constants';
import { getTokens, getAccessToken, getUserId } from '../actions/UserActions';
import { getPlaylists } from '../actions/PlaylistsActions';

function mapStateToProps(state) {
    return {
        authCode: state.userReducer.authCode,
        accessToken: state.userReducer.accessToken,
        userId: state.userReducer.userId,
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
        if (this.props.refreshToken !== null) {
            this.props.dispatch(getAccessToken(this.props.refreshToken));
        } else if (this.props.authCode !== null) {
            this.props.dispatch(getTokens(this.props.authCode));
        } else {
            this.setState({ viewState: 'web' });
        }
    }

    componentWillReceiveProps(props) {
        if (props !== null && props.authState !== this.props.authState) {
            this.checkProps(props);
        }
    }

    checkProps(props) {
        console.log(props.authState);
        switch (props.authState) {
            case 'authCodeSuccess':
                this.props.dispatch(getTokens(props.authCode));
                this.setState({ viewState: 'loading' });
                break;
            case 'tokensSuccess':
                this.props.dispatch(getUserId(props.accessToken));
                break;
            case 'userIdSuccess':
                this.setState({ viewState: 'playlists' });
                break;
            case 'accessTokenSuccess':
                if (props.userId === null) {
                    this.props.dispatch(getUserId(props.accessToken));
                } else {
                    this.setState({ viewState: 'playlists' });
                }
                break;
            case null:
                this.setState({ viewState: 'web' });
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
                this.setState({ viewState: 'error' });
        }
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
               {this.props.error} 
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
