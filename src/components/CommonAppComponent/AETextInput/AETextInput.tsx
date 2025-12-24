import React, { forwardRef, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useThemeMode } from '../../../context/ThemeContext';
import { getColors } from '../../../utility/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AEText from './AEText';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
}

const AETextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      label,
      error,
      containerStyle,
      inputStyle,
      labelStyle,
      errorStyle,
      leftIcon,
      rightIcon,
      secureTextEntry = false,
      showPasswordToggle = false,
      ...props
    },
    ref,
  ) => {
    const mode = useThemeMode();
    const colors = getColors(mode);
    const [isPasswordVisible, setIsPasswordVisible] = useState(
      !secureTextEntry,
    );
    const [isFocused, setIsFocused] = useState(false);

    const styles = createStyles(colors, isFocused, !!error);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const getInputPadding = () => {
      let padding: { paddingLeft?: number; paddingRight?: number } = {};

      if (leftIcon) {
        padding.paddingLeft = wp(12); // Equivalent to 50px but responsive
      }

      if (rightIcon || (showPasswordToggle && secureTextEntry)) {
        padding.paddingRight = wp(12); // Equivalent to 50px but responsive
      }

      return padding;
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <AEText style={[styles.label, labelStyle]}>{label}</AEText>}

        <View style={styles.inputContainer}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            style={[styles.input, getInputPadding(), inputStyle]}
            placeholderTextColor={colors.placeholder}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {showPasswordToggle && secureTextEntry ? (
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={togglePasswordVisibility}
            >
              <AEText style={styles.passwordToggleText}>
                {isPasswordVisible ? '🙈' : '👁'}
              </AEText>
            </TouchableOpacity>
          ) : rightIcon ? (
            <View style={styles.rightIcon}>{rightIcon}</View>
          ) : null}
        </View>

        {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
      </View>
    );
  },
);

const createStyles = (colors: any, isFocused: boolean, hasError: boolean) =>
  StyleSheet.create({
    container: {
      marginBottom: hp(2),
    },
    label: {
      fontSize: hp(1.8),
      fontWeight: '500',
      marginBottom: hp(1),
      color: colors.text,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    input: {
      flex: 1,
      height: hp(6),
      borderWidth: 1,
      borderColor: hasError
        ? colors.error
        : isFocused
        ? colors.primary
        : colors.border,
      borderRadius: wp(3),
      paddingHorizontal: wp(4),
      fontSize: hp(1.8),
      color: colors.text,
      backgroundColor: colors.inputBackground || colors.background,
    },
    leftIcon: {
      position: 'absolute',
      left: wp(4),
      zIndex: 1,
    },
    rightIcon: {
      position: 'absolute',
      right: wp(4),
      zIndex: 1,
    },
    passwordToggleText: {
      fontSize: hp(2.2),
    },
    error: {
      fontSize: hp(1.6),
      color: colors.error,
      marginTop: hp(0.5),
      marginLeft: wp(1),
    },
  });

export default AETextInput;
