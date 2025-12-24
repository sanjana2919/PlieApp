import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ThemeMode } from "../../../context/ThemeContext";
import { getColors } from "../../../utility/colors";

export const landingScreenStyles = (mode: ThemeMode) => {
    const colors = getColors(mode)
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background
        },
        animatedText: {
            fontSize: 28,
            letterSpacing: 0.5,
            fontWeight: '600',
            color: colors.text
        },
        circleImage: {
            height: undefined,
            width: wp(10),
            aspectRatio: 1,
            tintColor: colors.text,
        },
        textAndBlockCon: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        bottomSheet: {
            width: '100%',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: hp(3),
            borderTopRightRadius: hp(3),
            backgroundColor: colors.reverseBackground
        },
        googleButtonCon: {
            marginTop: hp(2),
            marginHorizontal: wp(2),
        },
        loginButton: {
            marginHorizontal: hp(2),
            marginTop: hp(2)
        }
    })
}