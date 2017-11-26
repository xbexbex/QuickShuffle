import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { PlaylistItem } from './PlaylistItem';
import styles from './styles/PlaylistList';
import configureStore from '../store';
import { getPlaylists } from '../actions/PlaylistsActions';
import { LoadingScreen } from '../components/LoadingScreen';

function mapStateToProps(state) {
    return {
        accessToken: state.userReducer.accessToken,
        refreshToken: state.userReducer.refreshToken,
        error: state.userReducer.userError,
        authState: state.userReducer.authState,
        playlists: state.playlistsReducer.playlists,
        selectedPlaylists: state.playlistsReducer.selectedPlaylists
    };
}

class PlaylistList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewState: 'loading'
        };
    }

    componentDidMount() {
        getPlaylists(this.props.accessToken);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != null) {
            this.setState({
                abua: nextProps.data
            });
        }
    }

    render() {
        if (this.state.viewState === 'loading') {
            return (
                <LoadingScreen />
            );
        }
        return (
            <View>
                {
                    this.props.playlists.map((playlist) => {
                        return (<PlaylistItem 
                            playlist={playlist}>
                        </PlaylistItem>);
                    })
                }
            </View>
        )
    }
}

export default connect(mapStateToProps)(PlaylistList);
