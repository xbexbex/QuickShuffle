import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles/PlaylistList';

const PlaylistList = ({ playlists }) => (
    <View style={styles.root}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>My Playlists></Text>
        </View>
        <View style={styles.contentContainer}>
            <ScrollView vertical>
                {playlists.map((playlist, i) => (
                    <View key={i} style={styles.playlistItem}>
                        <Text style={styles.playlistItemName}>
                            {playlist.name}
                        </Text>
                    </View>
                 ))}
            </ScrollView>
        </View>
    </View>
);

export default PlaylistList;