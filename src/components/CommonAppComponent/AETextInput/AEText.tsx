import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { useThemeMode } from '../../../context/ThemeContext';
import { getColors } from '../../../utility/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'label'
  | 'subtitle';

export type TextWeight =
  | 'normal'
  | 'light'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold';

export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';

interface CustomTextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  align?: TextAlign;
  color?: string;
  size?: number;
  lineHeight?: number;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
  allowFontScaling?: boolean;
}

const AEText: React.FC<CustomTextProps> = ({
  variant = 'body1',
  weight = 'normal',
  align = 'left',
  color,
  size,
  lineHeight,
  style,
  children,
  numberOfLines,
  adjustsFontSizeToFit,
  allowFontScaling = true,
  ...props
}) => {
  const mode = useThemeMode();
  const colors = getColors(mode);

  const styles = createStyles(colors);

  // Get base styles for variant
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'body1':
        return styles.body1;
      case 'body2':
        return styles.body2;
      case 'caption':
        return styles.caption;
      case 'button':
        return styles.button;
      case 'label':
        return styles.label;
      case 'subtitle':
        return styles.subtitle;
      default:
        return styles.body1;
    }
  };

  // Get font weight
  const getFontWeight = (): TextStyle => {
    switch (weight) {
      case 'light':
        return { fontWeight: '300' };
      case 'normal':
        return { fontWeight: '400' };
      case 'medium':
        return { fontWeight: '500' };
      case 'semiBold':
        return { fontWeight: '600' };
      case 'bold':
        return { fontWeight: '700' };
      case 'extraBold':
        return { fontWeight: '800' };
      default:
        return { fontWeight: '400' };
    }
  };

  // Get text color
  const getTextColor = (): TextStyle => {
    if (color) {
      return { color };
    }

    switch (variant) {
      case 'subtitle':
      case 'caption':
        return { color: colors.subtitle || colors.text };
      case 'button':
        return { color: colors.buttonText || colors.text };
      case 'label':
        return { color: colors.label || colors.text };
      default:
        return { color: colors.text };
    }
  };

  const dynamicStyles: StyleProp<TextStyle> = [
    getVariantStyle(),
    getFontWeight(),
    getTextColor(),
    { textAlign: align },
    size ? { fontSize: hp(size) } : {},
    lineHeight ? { lineHeight: hp(lineHeight) } : {},
    style,
  ];

  return (
    <RNText
      style={dynamicStyles}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      allowFontScaling={allowFontScaling}
      {...props}
    >
      {children}
    </RNText>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    // Headers
    h1: {
      fontSize: hp(3.5),
      lineHeight: hp(4.2),
      fontWeight: '700',
      color: colors.text,
    },
    h2: {
      fontSize: hp(3),
      lineHeight: hp(3.6),
      fontWeight: '700',
      color: colors.text,
    },
    h3: {
      fontSize: hp(2.5),
      lineHeight: hp(3),
      fontWeight: '600',
      color: colors.text,
    },
    h4: {
      fontSize: hp(2.2),
      lineHeight: hp(2.8),
      fontWeight: '600',
      color: colors.text,
    },

    // Body Text
    body1: {
      fontSize: hp(1.8),
      lineHeight: hp(2.4),
      fontWeight: '400',
      color: colors.text,
    },
    body2: {
      fontSize: hp(1.6),
      lineHeight: hp(2.2),
      fontWeight: '400',
      color: colors.text,
    },

    // Special Text
    caption: {
      fontSize: hp(1.4),
      lineHeight: hp(1.8),
      fontWeight: '400',
      color: colors.subtitle || colors.text,
    },
    button: {
      fontSize: hp(1.8),
      lineHeight: hp(2.2),
      fontWeight: '600',
      color: colors.buttonText || colors.text,
    },
    label: {
      fontSize: hp(1.6),
      lineHeight: hp(2),
      fontWeight: '500',
      color: colors.label || colors.text,
    },
    subtitle: {
      fontSize: hp(1.6),
      lineHeight: hp(2),
      fontWeight: '400',
      color: colors.subtitle || colors.text,
    },
  });

export default AEText;
