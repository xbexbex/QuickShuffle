import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles/PlaylistList';

class PlaylistItem extends Component {
    static propTypes = {
        playlist: PropTypes.object.isRequired
    }

    render() {
        const { playlist, playlist: { id } } = this.props;
        return (
            <View style={styles.playlistItem}>
                <Text>{id}</Text>
            </View>
        );
    }
}

export default connect()(PlaylistItem);
