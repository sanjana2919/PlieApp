import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ThemeMode } from "../../../context/ThemeContext";
import { getColors } from "../../../utility/colors";
export const forgotPasswordScreenStyles = (mode: ThemeMode) => {
    const colors = getColors(mode);

    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: wp(5),
            paddingBottom: hp(4),
            justifyContent: 'center',
        },
        header: {
            alignItems: 'center',
            marginBottom: hp(6),
        },
        logo: {
            aspectRatio: 1,
            height: hp(12),
            width: undefined,
            tintColor: colors.text,
        },
        subtitle: {
            marginTop: hp(1),
        },
        form: {
            flex: 1,
        },
        helpText: {
            color: colors.subtitle,
            marginTop: hp(-1),
            marginBottom: hp(3),
            textAlign: 'center',
        },
        sendButton: {
            marginBottom: hp(2),
        },
        backButton: {
            // Additional styles if needed
        },
    });
};