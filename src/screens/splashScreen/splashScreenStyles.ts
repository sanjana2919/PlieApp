import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { ThemeMode } from '../../context/ThemeContext';
import { getColors } from '../../utility/colors';

const splashScreenStyles = (mode: ThemeMode) => {
    const colors = getColors(mode)
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background
        },
        gif: {
            width: wp(100),
            height: hp(100),
            backgroundColor: colors.background
        }
    });
}

export default splashScreenStyles;