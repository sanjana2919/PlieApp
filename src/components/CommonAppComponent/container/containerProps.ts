import { ImageSourcePropType, ViewStyle } from "react-native"

export interface containerProps {
    children?: any
    conStyle?: ViewStyle
    scrollConStyle?: ViewStyle
    nonScrollConStyle?: ViewStyle
    isScrollView?: boolean
    isNavbarVisible?: boolean
    navbarTitle?: string
    isBackButton?: boolean
    isOfflineAccesible?: boolean
    onBackAction?: () => Promise<void>
    customRightIcon?: ImageSourcePropType
    rightIconOnPress?: () => void
    scrollOnRefresh?: () => Promise<void>
    customLeftIcon?: ImageSourcePropType
    leftIconOnPress?: () => void
    popScreenCount?: number
}