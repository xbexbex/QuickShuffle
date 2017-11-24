import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';
import styles from './styles/TestScreen';
import store from '../store';
import { STATUS_BAR_HEIGHT } from '../constants';

export default class AboutScreen extends Component {
    static navigationOption = () => ({
        title: 'Playlists',
        headerStyle: {
            height: Platform.OS === 'android' ? 100 + STATUS_BAR_HEIGHT : 100,
            backgroundColor: 'red'
        },
        headerTitleStyle: {
            marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
            backgroundColor: 'green'
        },
        headerLeft: <View>I</View>
    });

    render() {
        return (
            <View style={styles.root}>
                <Text>Lol</Text>
                {/* PlaylistModal */}
                {/* Content */}
            </View>
        );
    }
}
