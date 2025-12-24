import React, { useMemo, useRef, useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import Container from '../../../components/CommonAppComponent/container/Container'
import TypewriterText from '../../../components/TypewriterText/TypewriterText'
import AETextInput from '../../../components/CommonAppComponent/AETextInput/AETextInput'
import AEText from '../../../components/CommonAppComponent/AETextInput/AEText'
import AEButton from '../../../components/CommonAppComponent/AEButton/AEButton'
import { useThemeMode } from '../../../context/ThemeContext'
import { loginScreenStyles } from './loginScreenStyles'
import { getColors } from '../../../utility/colors'
import images from '../../../assets/images/images'
import NavigationService from '../../../navigation/NavigationService'
import { screen, stacks } from '../../../utility/screens'
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./../../../redux/reducer/authSlice";

interface LoginForm {
  email: string;
  password: string;
}

const Login:React.FC= () => {
    const mode = useThemeMode();
    const styles = loginScreenStyles(mode);
    const colors = getColors(mode);
    const bottomSheetRef = useRef(null);

    const [formData, setFormData] = useState<LoginForm>({
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState<Partial<LoginForm>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const names = [
        "Plie"
    ];
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleInputChange = (field: keyof LoginForm, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    
    const handleForgotPassword = () => {
      NavigationService.navigate(screen.forgotPasswordScreen);
    };
    
     const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleLogin = async () => {
        if (!validateForm()) return;
    
        setIsLoading(true);
        try {
          // Simulate API call
            console.log('Login data:', { ...formData, rememberMe });
          
          const result = await dispatch( loginUser({email: formData.email,password: formData.password}));
          console.log('result',loginUser.fulfilled.match(result));
     
          if (result!=null) {
            NavigationService.navigate(stacks.bottomTabStack);
            Alert.alert("Success", "Logged in successfully!");
          } 
          else {
            Alert.alert("Error", result as string);
         }
        } catch (error) {
          Alert.alert('Error', 'Failed to login. Please check your credentials.');
        } finally {
          setIsLoading(false);
        }
    };

    const handleSignup = () => {
        // Navigate to signup screen
        NavigationService.navigate(screen.signUpScreen);
    };
    
    	const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
      
  return (
    <View style={[styles.container]}>
        <View style={styles.header}>
            <Image source={images.AppName} style={styles.logo} />
            <View style={styles.textAndBlockCon}>
                <TypewriterText
                texts={names}
                typingSpeed={10}
                deletingSpeed={10}
                pauseAfterFull={900}
                pauseAfterEmpty={300}
                loop={true}
                style={[styles.animatedText]}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                showCircleCursor={true}
                />
            </View>
        </View>
    
        <View style={[styles.bottomSheet]}>
            <Container isNavbarVisible isBackButton>
                <View style={styles.scrollContent}>
                    <AETextInput
                        label="Email"
                        value={formData.email}
                        onChangeText={text => handleInputChange('email', text)}
                        error={errors.email}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="email"
                    />
                    <AETextInput
                        label="Password"
                        value={formData.password}
                        onChangeText={text => handleInputChange('password', text)}
                        error={errors.password}
                        placeholder="Enter your password"
                        secureTextEntry
                        showPasswordToggle
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <View style={styles.rememberForgotContainer}>
                        <TouchableOpacity
                        onPress={handleForgotPassword}
                        style={{ alignSelf: 'flex-end' }}
                        >
                        <AEText variant="body2" color={colors.primary}>
                            Forgot Password?
                        </AEText>
                        </TouchableOpacity>
                    </View>
                    <AEButton
                        variant="primary"
                        onPress={handleLogin}
                        disabled={isLoading}
                        containerStyle={{alignSelf:'flex-end', backgroundColor:'#21D393', marginBottom:10}}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </AEButton>

                    <View style={[styles.signupContainer, {alignSelf:"flex-end",}]}>
                    <AEText variant="body2" align="center">
                    Not a member?
                    </AEText>
                    <TouchableOpacity onPress={handleSignup}>
                    <AEText variant="body2" color={colors.black}>
                        Sign Up here
                    </AEText>
                    </TouchableOpacity>
                    </View>
                
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <AEText variant="caption" style={styles.dividerText}>
                        OR Sign in with
                        </AEText>
                        <View style={styles.dividerLine} />
                    </View>
                    

                    {/* Social Login */}
                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialButton}>
                    <Image
                    source={images.googleLoginLogo}
                    style={styles.socialIcon}
                    />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.socialButton}>
                    <Image
                    source={images.appleLogo}
                    style={styles.socialIcon}
                    />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.socialButton}>
                    <Image
                    source={images.facebookLoginLogo}
                    style={styles.socialIcon}
                    />
                    </TouchableOpacity>
                    </View>
                </View>
            </Container>
        </View>
     
    </View>
  )
}

export default Login