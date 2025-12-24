import React, { useState } from 'react';
import { View} from 'react-native';
import { useThemeMode } from '../../../context/ThemeContext';
import NavigationService from '../../../navigation/NavigationService';
import AEText from '../../../components/CommonAppComponent/AETextInput/AEText';
import AETextInput from '../../../components/CommonAppComponent/AETextInput/AETextInput';
import AEButton from '../../../components/CommonAppComponent/AEButton/AEButton';
import { forgotPasswordScreenStyles } from './forgotPasswordScreenStyles';
import Container from '../../../components/CommonAppComponent/container/Container';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = () => {
  const mode = useThemeMode();
  const styles = forgotPasswordScreenStyles(mode);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
   
  };

  const handleBackToLogin = () => {
    NavigationService.pop();
  };

  return (
    <Container isNavbarVisible isBackButton>
      <View style={styles.container}>
        <View style={styles.header}>
          <AEText variant="h1" align="center">
            Forgot Password
          </AEText>
          <AEText variant="subtitle" align="center" style={styles.subtitle}>
            Enter your email to receive OTP
          </AEText>
        </View>

        <View style={styles.form}>
          <AETextInput
            label="Email Address"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (error) setError('');
            }}
            error={error}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
          />

          <AEText variant="body2" style={styles.helpText}>
            We'll send a 6-digit OTP to your email address to verify your
            identity.
          </AEText>

          <AEButton
            variant="primary"
            size="large"
            fullWidth
            onPress={handleSendOTP}
            containerStyle={styles.sendButton}
          >
            Send OTP
          </AEButton>
        </View>
      </View>
    </Container>
  );
};

export default ForgotPasswordScreen;
