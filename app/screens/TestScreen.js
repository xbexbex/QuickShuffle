import React, { Component } from 'react';
import { View, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import WebLogIn from '../components/WebLogIn';
import styles from './styles/TestScreen';
import icon from '../assets/images/icon.png';
import { PlaylistList } from '../components/PlaylistList';
import { AntonText } from '../components/StyledText';
import { STATUS_BAR_HEIGHT } from '../constants';
import { setAuthCode } from '../actions/UserActions';


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
            height: Platform.OS === 'android' ? 200 + STATUS_BAR_HEIGHT : 200,
            backgroundColor: 'green'
        },
        headerTitleStyle: {
            marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
            backgroundColor: 'red'
        },
        headerLeft:
            <Image
                source={icon}
                style={styles.imageStyle}
            />
    });

    componentDidMount() {
        this.props.dispatch(setAuthCode('adfgzdgfagdfs'));
        console.log('abua');
        console.log(this.props.error);
        console.log('log:' + this.props.authCode);
        console.log(this.props.refreshToken);
        console.log(this.props.accessToken);
    }

    componentWillReceiveProps(props) {
        console.log("lmao");
        console.log(props.error);
        console.log(props.authCode);
        console.log(props.refreshToken);
        console.log(props.accessToken);
        
    }

    render() {
        if (this.props.authCode === undefined || this.props.refreshToken === undefined) {
            return (
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    <WebLogIn />
                </KeyboardAvoidingView>
            );
        }
        return (
            <PlaylistList />
        );
    }
}

export default connect(mapStateToProps)(TestScreen);

                        /*<PlaylistItem
                            post={post}
                            onOpen={this.openMovie}
                            key={index}
                        />)} */
