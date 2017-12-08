import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getPlaylist, addSelectedPlaylist, removeSelectedPlaylist, removePlaylist } from '../actions/PlaylistsActions';
import styles from './styles/PlaylistItem';

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
            loading: true,
            isSelected: false
        };
    }

    componentDidMount() {
        this.getPlaylist();
    }

    async getPlaylist() {
        const playlist = getPlaylist(this.props.accessToken, this.props.userId, this.props.playlist.id);
        if (playlist !== null) {
            this.setState({
                viewState: 'show'
            });
        } else {
            this.props.dispatch(removePlaylist(this.props.playlist.id));
        }
    }

    onPress = () => {
        if (this.state.isSelected) {
            this.setState({
                isSelected: false
            });
            this.props.dispatch(removeSelectedPlaylist(this.props.playlist));
        } else {
            this.setState({
                isSelected: true
            });
            this.props.dispatch(addSelectedPlaylist(this.props.playlist));
        }
    }

    render() {
        const { playlist, playlist: { id } } = this.props;
        if (this.state.isSelected) {
            return (
                <TouchableOpacity
                    onPress={this.onPress}
                >
                    <View style={styles.selected}>
                        <Text
                            style={styles.selectedText}
                        >
                            {id}
                        </Text>
                    </View >
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                onPress={this.onPress}
            >
                <View style={styles.default}>
                    <Text
                        style={styles.defaultText}
                    >
                        {id}
                    </Text>
                </View >
            </TouchableOpacity>
        );
    }
}

export default connect(mapStateToProps)(PlaylistItem);
