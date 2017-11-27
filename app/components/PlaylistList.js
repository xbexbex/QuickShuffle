import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PlaylistItem from './PlaylistItem';
import styles from './styles/PlaylistList';
import configureStore from '../store';
import { getPlaylists } from '../actions/PlaylistsActions';
import LoadingScreen from '../components/LoadingScreen';

function mapStateToProps(state) {
    return {
        accessToken: state.userReducer.accessToken,
        userId: state.userReducer.userId,
        error: state.playlistsReducer.playlistsError,
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
        this.props.dispatch(getPlaylists(this.props.accessToken, this.props.userId));
    }

    componentWillReceiveProps(props) {
        if (props !== null) {
            if (props.playlists !== null) {
                this.setState({
                    viewState: 'playlists'
                });
            }
        }
    }

    render() {
        if (this.state.viewState === 'loading') {
            return (
                <LoadingScreen />
            );
        }
        return (
            <ScrollView>
                {this.props.playlists.map((playlist, i) => {
                    return (
                        <PlaylistItem
                            key={i}
                            playlist={playlist}
                        />
                    );
                })}
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(PlaylistList);
