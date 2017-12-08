import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = EStyleSheet.create({
    default: {
        height: 30,
        width: SCREEN_WIDTH * 0.9,
        marginVertical: '1.5%',
        backgroundColor: 'gray'
    },
    selected: {
        height: 30,
        width: SCREEN_WIDTH * 0.9,
        marginVertical: '1.5%',
        backgroundColor: 'red'
    }
});

export default styles;
