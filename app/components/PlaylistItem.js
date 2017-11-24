import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styles from './styles/PlaylistList';

class PlaylistItem extends Component {
    static propTypes = {
        playlist: PropTypes.object.isRequired
    }

    render() {
        const { playlist, playlist: { title } } = this.props;
        return (
            <View style={styles.playlistItem}>
                <Text>{title}</Text>
            </View>
        );
    }
}

export default connect()(PlaylistItem);
