import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { View, Text, Button, ActivityIndicator, TouchableHighlight } from 'react-native';
import { getPlaylist, addSelectedPlaylist, removeSelectedPlaylist, removePlaylist } from '../actions/PlaylistsActions';
import styles from './styles/PlaylistList';

function mapStateToProps(state) {
    return {
        accessToken: state.userReducer.accessToken,
        userId: state.userReducer.userId,
        error: state.playlistsReducer.playlistsError
    };
}

class PlaylistItem extends Component {
    static propTypes = {
        playlist: PropTypes.object.isRequired,

    }

    constructor(props) {
        super(props);
        this.state = {
            viewState: 'loading',
            color: 'white'
        };
    }

    componentDidMount() {
        this.getPlaylist();
    }

    async getPlaylist() {
        playlist = getPlaylist(this.props.accessToken, this.props.userId, this.props.playlist.id);
        if (playlist !== null) {
            this.setState({
                viewState: 'show'
            });
        } else {
            this.props.dispatch(removePlaylist(this.props.playlist.id));
        }
    }

    changeColor = () => {
        this.setState({ color: 'blue' });
    }

    render() {
        const { playlist, playlist: { id } } = this.props;
        return (
            <TouchableHighlight
                onPress={this.changeColor}
            >
                <View style={styles.playlistItem}>
                    <Text
                        style={{ color: 'white' }}
                    >
                        {id}
                    </Text>
                </View >
            </TouchableHighlight>
        );
    }
}

export default connect(mapStateToProps)(PlaylistItem);
