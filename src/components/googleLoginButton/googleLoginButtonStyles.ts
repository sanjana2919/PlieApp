import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    googleLogo: {
        width: wp(6),
        height: undefined,
        aspectRatio: 1,
        marginHorizontal: wp(4)
    },

})