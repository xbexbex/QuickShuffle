import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import styles from './styles/LoadingScreen';

class LoadingScreen extends Component {

    render() {
        return (
            <View style={styles.root}>
                <ActivityIndicator
                    size="large"
                />
            </View>
        );
    }
}

export default LoadingScreen;
