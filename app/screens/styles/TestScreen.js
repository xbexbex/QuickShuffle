import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    container: {
        flex: 1
    },

    subView: {
        flex: 1,
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
        flex: 1
    },

    keyboardView: {
        flex: 1
    },

    imageStyle: {
        marginTop: 20,
        marginLeft: 10,
        width: 40,
        height: 40
    }
});

export default styles;
