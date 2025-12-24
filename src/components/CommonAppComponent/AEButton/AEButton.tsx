// components/Button/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { useThemeMode } from '../../../context/ThemeContext';
import { getColors } from '../../../utility/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AEText from '../AETextInput/AEText';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';

export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: string | React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const AEButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  containerStyle,
  textStyle,
  ...props
}) => {
  const mode = useThemeMode();
  const colors = getColors(mode);

  const styles = createStyles(colors);

  // Get button styles based on variant and state
  const getButtonStyle = (): StyleProp<ViewStyle> => {
    const baseStyle = [styles.baseButton, styles[size]];

    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }

    if (disabled) {
      return [...baseStyle, styles.disabled];
    }

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primary];
      case 'secondary':
        return [...baseStyle, styles.secondary];
      case 'outline':
        return [...baseStyle, styles.outline];
      case 'ghost':
        return [...baseStyle, styles.ghost];
      case 'danger':
        return [...baseStyle, styles.danger];
      default:
        return [...baseStyle, styles.primary];
    }
  };

  // Get text color based on variant
  const getTextColor = (): string => {
    if (disabled) {
      return colors.gray[400];
    }

    switch (variant) {
      case 'primary':
        return colors.buttonText;
      case 'secondary':
        return colors.black;
      case 'outline':
        return colors.primary;
      case 'ghost':
        return colors.primary;
      case 'danger':
        return colors.buttonText;
      default:
        return colors.buttonText;
    }
  };

  // Get text variant based on size
  const getTextVariant = (): any => {
    switch (size) {
      case 'small':
        return 'body2';
      case 'medium':
        return 'body1';
      case 'large':
        return 'button';
      default:
        return 'body1';
    }
  };

  // Get text weight based on variant
  const getTextWeight = (): any => {
    switch (variant) {
      case 'ghost':
        return 'normal';
      default:
        return 'semiBold';
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), containerStyle]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

          {typeof children === 'string' ? (
            <AEText
              variant={getTextVariant()}
              weight={getTextWeight()}
              color={getTextColor()}
              style={textStyle}
            >
              {children}
            </AEText>
          ) : (
            children
          )}

          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    baseButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: wp(1),
      
    },
    // Sizes
    small: {
      height: hp(4.5),
      paddingHorizontal: wp(4),
    },
    medium: {
      height: hp(6),
      paddingHorizontal: wp(8),
      paddingVertical:hp(1)
    },
    large: {
      height: hp(7),
      paddingHorizontal: wp(6),
    },
    fullWidth: {
      width: '100%',
    },
    // Variants
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.gray[200],
      borderColor: colors.gray[200],
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: colors.error,
      borderColor: colors.error,
    },
    // States
    disabled: {
      backgroundColor: colors.gray[300],
      borderColor: colors.gray[300],
      opacity: 0.6,
    },
    // Icons
    leftIcon: {
      marginRight: wp(2),
    },
    rightIcon: {
      marginLeft: wp(2),
    },
  });

export default AEButton;
