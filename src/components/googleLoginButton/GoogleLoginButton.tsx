import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, use } from 'react';
import { GoogleLoginButtonProps } from './GoogleLoginButtonProps';
import googleLoginButtonStyles from './googleLoginButtonStyles';
import images from '../../assets/images/images';
import { useThemeMode } from '../../context/ThemeContext';
import { getColors } from '../../utility/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AEText from '../CommonAppComponent/AETextInput/AEText';

const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({
  conStyle,
  onPress,
}) => {
  const mode = useThemeMode();
  const colors = getColors(mode);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[googleLoginButtonStyles.container, conStyle]}
    >
      <Image
        source={images.googleLoginLogo}
        style={googleLoginButtonStyles.googleLogo}
      />
      <AEText style={{ color: colors.reverseText, fontSize: wp(5) }}>
        Continue with Google
      </AEText>
    </TouchableOpacity>
  );
};

export default GoogleLoginButton;
