import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '$white',
        alignItems: 'center'
    },

    topContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '$black',
        alignItems: 'center'
    },

    bottomContainer: {
        flex: 0.5,
        justifyContent: 'center',
        backgroundColor: '$black',
        alignItems: 'center'
    },

    webView: {
        marginTop: '15%'
    }
});

export default styles;