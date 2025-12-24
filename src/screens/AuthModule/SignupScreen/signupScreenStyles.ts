import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getColors } from "../../../utility/colors";
import { ThemeMode } from "../../../context/ThemeContext";

export const signupScreenStyles = (mode: ThemeMode) => {
    const colors = getColors(mode);

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollContent: {
            flex: 1,
            paddingHorizontal: wp(5),
            // paddingTop: hp(8),
            paddingBottom: hp(4),
            backgroundColor: colors.background,
        },
        header: {
            alignItems: 'center',
            marginBottom: hp(4),
        },
        logo: {
            aspectRatio: 1,
            height: hp(12),
            width: undefined,
            tintColor: colors.text,
        },
        title: {
            fontSize: 28,
            fontWeight: '700',
            color: colors.text,
            marginBottom: hp(1),
        },
        subtitle: {
            fontSize: 16,
            color: colors.subtitle,
            textAlign: 'center',
        },
        form: {
            flex: 1,
        },
        nameRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        halfInput: {
            flex: 0.48,
        },
        signupButton: {
            height: 50,
            backgroundColor: colors.primary,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp(2),
            marginBottom: hp(2),
        },
        signupButtonDisabled: {
            opacity: 0.6,
        },
        signupButtonText: {
            color: colors.buttonText,
            fontSize: 16,
            fontWeight: '600',
        },
        divider: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: hp(1),
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: colors.border,
        },
        dividerText: {
            marginHorizontal: wp(4),
            color: colors.subtitle,
            fontSize: 14,
            fontWeight: '500',
        },
        googleButton: {
            marginHorizontal: 0,
        },
    });
};