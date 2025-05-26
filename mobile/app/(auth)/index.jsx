import { 
  Text, 
  TextInput, 
  View, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import styles from '../../assets/styles/login_styles.js'
import COLORS from '../../constants/color.js';
import { Link } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Add your login logic here
    // After login logic, set isLoading to false
    setIsLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}  // Adjust this value based on your header height
    >
      <View style={styles.container}>
        <View style={styles.topIllustration}>
          <Image
            style={styles.illustrationImage}
            source={require('../../assets/images/illustration.png')}
            resizeMode="contain" />
        </View>
        <View style={styles.card}>
          <View style={styles.formContainer}>
            {/* EMAIL */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="devdarshan@gmail.com"
                  placeholderTextColor={COLORS.placeholderText}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
            {/* PASSWORD */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor={COLORS.placeholderText}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={COLORS.primary}
                    //onPress={() => setShowPassword(!showPassword)}
                    style={styles.togglePasswordIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              {/* FORGOT PASSWORD LINK */}
              <Link href="/(auth)/ResetPassword" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>
                </Link>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.7}>

              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}> Register</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}