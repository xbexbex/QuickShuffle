import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { View, Button } from 'react-native';
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
        playlist: PropTypes.string.isRequired,

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
            this.props.dispatch(removePlaylist(playlist.id));
        }
    }

    onButtonPress = () => {
        this.setState({ color: 'blue' });
    }

    render() {
        const { playlist, playlist: { id } } = this.props;
        return (
            <View style={styles.playlistItem}>
                <Button
                    onPress={changeColor}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                >
                    {}
                </Button>
            </View >
        );
    }
}

export default connect()(PlaylistItem);
