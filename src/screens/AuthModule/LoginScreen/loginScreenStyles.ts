import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getColors } from "../../../utility/colors";
import { ThemeMode } from "../../../context/ThemeContext";
export const loginScreenStyles = (mode: ThemeMode) => {
    const colors = getColors(mode);

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:'#dcdcdc',
        },
        scrollContent: {
            flexGrow: 1,
            paddingHorizontal: wp(5),
            paddingBottom: hp(4),
            // backgroundColor:'#fff'
        },
        header: {
            flex:1,
            alignItems: 'center',
            // marginBottom: hp(6),
            paddingVertical:40
            
        },
        logo: {
            aspectRatio: 1,
            height: hp(12),
            width: undefined,
            tintColor: colors.text,
            marginBottom:hp(10)
        },
        form: {
            flex: 1,
        },
        rememberForgotContainer: {
            marginBottom: hp(2),
        },
        rememberMeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        checkbox: {
            width: wp(4),
            height: wp(4),
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: wp(1),
            marginRight: wp(2),
            justifyContent: 'center',
            alignItems: 'center',
        },
        checkboxChecked: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },
        checkboxInner: {
            width: wp(2),
            height: wp(2),
            backgroundColor: colors.white,
            borderRadius: wp(0.5),
        },
        loginButton: {
            height: hp(6.5),
            backgroundColor: colors.primary,
            borderRadius: wp(3),
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: hp(3),
        },
        loginButtonDisabled: {
            opacity: 0.6,
        },
        divider: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: hp(3),
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: colors.border,
        },
        dividerText: {
            marginHorizontal: wp(4),
            color: colors.subtitle,
        },
        googleButton: {
            marginHorizontal: 0,
        },
        signupContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },


        animatedText: {
            fontSize: 28,
            letterSpacing: 0.5,
            fontWeight: '400',
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
            alignItems: 'center',
        },
        bottomSheet: {
            // height: Platform.OS === 'android' ? hp(30) : hp(35),
            width: '100%',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: hp(3),
            borderTopRightRadius: hp(3),
            backgroundColor: colors.background
        },
        googleButtonCon: {
            marginTop: hp(2),
            marginHorizontal: wp(2),
        },
        appNameImg:{
            alignItems:'flex-start',
            width:25,
            height:25
        },
        socialRow: {
            flexDirection: "row",
            justifyContent: "space-evenly",
        },
        socialButton: {
            backgroundColor: "#fff",
            padding: 14,
            borderRadius: 10,
            elevation: 2,
        },
        socialIcon: {
            width: 24,
            height: 24,
            resizeMode: "contain",
        },
    });
};