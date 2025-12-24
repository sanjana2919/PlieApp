import { View, Text, Image, Dimensions } from 'react-native';
import React, { FC, useEffect } from 'react';
import { SplashScreenProps } from './SplashScreenProps';
import splashScreenStyles from './splashScreenStyles';
import { useThemeMode } from '../../context/ThemeContext';
import NavigationService from '../../navigation/NavigationService';
import { screen } from '../../utility/screens';
import images from '../../assets/images/images';

const SplashScreen: FC<SplashScreenProps> = () => {
  const mode = useThemeMode();
  const style = splashScreenStyles(mode);

  useEffect(() => {
    hideSplash();
  }, []);

  const hideSplash = () => {
    setTimeout(() => {
      NavigationService.replace(screen.login);
    }, 2000);
  };

  return (
    <View style={[style.container]}>
      <Image source={images.AppName}
      style={style.gif}/>
    </View>
  );
};

export default SplashScreen;
