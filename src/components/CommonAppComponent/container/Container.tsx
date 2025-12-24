import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ImageSourcePropType,
  RefreshControl,
  BackHandler,
} from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { containerProps } from './containerProps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import NavigationService from '../../../navigation/NavigationService';
import { APP_NAME } from '../../../utility/stringConstants';
import { ThemeMode, useThemeMode } from '../../../context/ThemeContext';
import { getColors } from '../../../utility/colors';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import images from '../../../assets/images/images';
import AEText from '../AETextInput/AEText';

const Container: FC<containerProps> = ({
  children,
  conStyle,
  isScrollView = true,
  isNavbarVisible = false,
  navbarTitle,
  isBackButton,
  scrollConStyle,
  nonScrollConStyle,
  isOfflineAccesible = false,
  onBackAction,
  customRightIcon,
  rightIconOnPress,
  scrollOnRefresh,
  customLeftIcon,
  leftIconOnPress,
  popScreenCount = 1,
}) => {
  const insets = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [serverAvailiblity, setServerAvailiblity] = useState(true);
  const mode = useThemeMode();
  const colors = getColors(mode);
  const containerStyle = createStyles(mode);

  // Handle Android back button
  useEffect(() => {
    if (onBackAction && Platform.OS === 'android' && popScreenCount > 1) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleAndroidBackPress,
      );

      return () => backHandler.remove();
    }
  }, [onBackAction, popScreenCount]);

  const handleAndroidBackPress = useCallback((): boolean => {
    if (onBackAction) {
      onBackAction();
      NavigationService.pop(popScreenCount);
      return true; // Prevent default back behavior
    }
    return false; // Allow default back behavior
  }, [onBackAction, popScreenCount]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isAccesible = state.isInternetReachable === true;
      setIsOnline(isAccesible);
    });

    // Initial check
    NetInfo.fetch().then(state => {
      setIsOnline(state.isInternetReachable === true);
    });

    return () => {
      unsubscribe(); // Cleanup on unmount
    };
  }, []);

  const handleLogout = () => {
    Alert.alert(APP_NAME, 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
        },
      },
    ]);
  };

  // Render Methods
  const renderContent = () => {
    return isScrollView ? (
      <ScrollView
        contentContainerStyle={[containerStyle.scrollContent, scrollConStyle]}
        showsVerticalScrollIndicator={false}
        bounces={scrollOnRefresh ? true : false}
        refreshControl={
          scrollOnRefresh && (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await scrollOnRefresh();
                setRefreshing(false);
              }}
              colors={[colors.text]}
              tintColor={colors.text}
            />
          )
        }
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    ) : (
      <View style={[containerStyle.nonScrollContent, nonScrollConStyle]}>
        {children}
      </View>
    );
  };

  const renderNavbarRightIcon = (
    icon: ImageSourcePropType,
    onPress: () => void,
  ) => {
    return (
      <Pressable
        onPress={onPress}
        style={{
          alignSelf: 'flex-end',
          padding: hp(1),
          borderRadius: hp(100),
          backgroundColor: colors.text,
        }}
      >
        <Image
          source={icon}
          style={[containerStyle.header_backButton, { tintColor: 'white' }]}
        />
      </Pressable>
    );
  };

  const renderNavbarLeftIcon = (
    icon: ImageSourcePropType,
    onPress?: () => void,
  ) => {
    return (
      <Pressable
        onPress={onPress}
        style={{
          alignSelf: 'flex-start',
          padding: hp(1),
          borderRadius: hp(100),
          backgroundColor: colors.text,
        }}
      >
        <Image
          source={icon}
          style={[containerStyle.header_backButton, { tintColor: 'white' }]}
        />
      </Pressable>
    );
  };

  const renderServerUnavailable = () => {
    return (
      <></>
    );
  };

  return (
    <View style={containerStyle.fullScreen}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={mode == 'dark' ? 'light-content' : 'dark-content'}
      />
      <View
        style={[
          containerStyle.background,
          conStyle,
        ]}
      >
        {/* Android-specific padding to account for status bar */}
        <View style={dynamicStyles.contentWrapper(insets.top)}>
          <SafeAreaView style={containerStyle.safeArea}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
              style={containerStyle.keyboardAvoidingView}
            >
              {isNavbarVisible && (
                <View style={containerStyle.header_container}>
                  <View style={containerStyle.header_sideContainer}>
                    {NavigationService.canGoBack() && isBackButton ? (
                      <Pressable
                        onPress={async () => {
                          if (onBackAction) {
                            await onBackAction();
                          }
                          NavigationService.pop(popScreenCount);
                        }}
                        style={{
                          alignSelf: 'flex-start',
                          padding: hp(1),
                        }}
                      >
                        <Image
                          source={images.back_button_icon}
                          style={containerStyle.header_backButton}
                        />
                      </Pressable>
                    ) : (
                      customLeftIcon &&
                      renderNavbarLeftIcon(customLeftIcon, leftIconOnPress)
                    )}
                  </View>
                  <View style={containerStyle.header_centerContainer}>
                    <AEText
                      numberOfLines={1}
                      weight="bold"
                      style={containerStyle.header_titleText}
                    >
                      {navbarTitle ?? ' '}
                    </AEText>
                  </View>
                  <View style={containerStyle.header_sideContainer}>
                  </View>
                </View>
              )}

              {isOfflineAccesible ? (
                serverAvailiblity ? (
                  renderContent()
                ) : (
                  renderServerUnavailable()
                )
              ) : isOnline ? (
                serverAvailiblity ? (
                  renderContent()
                ) : (
                  renderServerUnavailable()
                )
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={images.no_internet_art}
                    style={{
                      resizeMode: 'contain',
                      aspectRatio: 1,
                      width: '80%',
                      height: undefined,
                    }}
                  />
                </View>
              )}
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

const dynamicStyles = {
  contentWrapper: (paddingTop: number = 0) => ({
    flex: 1,
  }),
};

const createStyles = (theme: ThemeMode) => {
  const color = getColors(theme);
  return StyleSheet.create({
    fullScreen: {
      flex: 1,
    },
    background: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    nonScrollContent: {
      flex: 1,
    },
    header_container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: hp(1.5),
      marginBottom: hp(2),
    },
    header_sideContainer: {
      width: '20%',
      padding: hp(0.5),
    },
    header_centerContainer: {
      width: '60%',
      alignItems: 'center',
    },
    header_backButton: {
      aspectRatio: 1,
      height: wp(5),
      width: undefined,
      resizeMode: 'contain',
      tintColor: color.text,
    },
    header_titleText: {
      fontSize: wp(5),
      textAlign: 'center',
    },
  });
};

export default Container;
