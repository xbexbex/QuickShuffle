import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '$black'
    },

    title: {
        color: '$white',
        fontSize: 25
    },

    titleContainer: {
        flex: 0.1,
        paddingHorizontal: '2.5%',
        paddingVertical: '2.5%'
    },

    playlistItem: {
        height: 30,
        width: 175,
        marginVertical: '1.5%',
        backgroundColor: '$white'
    },

    playlistItemName: {
        position: 'absolute',
        top: '2%',
        left: '2.5%'
    }
});

export default styles;