import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getColors } from "../../../utility/colors";
import { ThemeMode } from "../../../context/ThemeContext";
export const eventListingScreenStyle = (mode: ThemeMode) => {
    const colors = getColors(mode);

    return StyleSheet.create({
        container: {
            borderRadius: 12,
            padding: 12,
            elevation: 2,
        },
        header: {
            paddingHorizontal: 16,
            paddingVertical: 12,
        },
            hello: {
            fontSize: 22,
            fontWeight: "600",
        },
        subtitle: {
            color: "#777",
            marginTop: 4,
        },
        card: {
            flexDirection: "row",
            backgroundColor: "#fff",
            marginHorizontal: 16,
            marginVertical: 8,
            borderRadius: 12,
            padding: 12,
            elevation: 2,
        },
        tagShareRow: {
        flexDirection: 'row',
        alignItems: 'center',
        },
        shareIcon: {
         marginLeft: 8,
        },
        image: {
            width: 70,
            height: 70,
            borderRadius: 10,
        },
        cardContent: {
            flex: 1,
            marginLeft: 12,
        },
        title: {
            fontSize: 15,
            fontWeight: "600",
        },
        date: {
            fontSize: 12,
            color: "#4CAF50",
            marginTop: 2,
        },
        location: {
            fontSize: 12,
            color: "#777",
            marginTop: 2,
        },
        tagRow: {
            flexDirection: "row",
            marginTop: 6,
        },
        tag: {
            backgroundColor: "#f2f2f2",
            borderRadius: 12,
            paddingHorizontal: 8,
            paddingVertical: 4,
            marginRight: 6,
            marginTop: 4,
        },
        tagText: {
            fontSize: 11,
            color: "#555",
        },
        actions: {
            justifyContent: "space-between",
            alignItems: "center",
        },
        share: {
            fontSize: 16,
            color: "#999",
        },
        heart: {
            fontSize: 18,
            color: "#b1a6a6ff",
        },
        heartActive: {
            color: "#2ecc71",
        },
        tabBar: {
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 10,
            borderTopWidth: 1,
            borderColor: "#eee",
        },
        tabItem: {
            fontSize: 20,
            color: "#999",
        },
        tabActive: {
            color: "#000",
        },
       
    });
};