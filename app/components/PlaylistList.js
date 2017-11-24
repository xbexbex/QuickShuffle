import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { PlaylistItem } from './PlaylistItem';
import styles from './styles/PlaylistList';
import configureStore from '../store';
import { getPlaylists } from '../actions/PlaylistsActions';

const { store } = configureStore();

class PlaylistList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            abua: 'babua'
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        console.log('abua');
        console.log(this.props.data);
        console.log(this.props.error);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != null) {
            this.setState({
                abua: nextProps.data
            });
        }
    }

    render() {
        return (
            <Text>Abua</Text>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.playlistsLoading,
        error: state.playlistsError,
        data: state.playlistsData
    };
}

export default connect(mapStateToProps)(PlaylistList);
