import { Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'
import styles from '../../assets/styles/register_styles.js'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../../constants/color.js'
import { useState } from 'react'
import { Link } from 'expo-router'
export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    // Add your registration logic here
    // After registration logic, set isLoading to false
    setIsLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}  // Adjust this value based on your header height
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Work Book</Text>
          <Text style={styles.subtitle}>Share your favourit reads</Text>
        </View>
        <View style={styles.formContainer}>
          {/* User name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>User name</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Devdarshan"
                keyboardType="default"
                autoCapitalize="none"
                placeholderTextColor={COLORS.placeholderText}
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </View>
          {/* Email and Password */}
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
                placeholder="devdarshan@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password */}
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
           <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.7}>

              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
          {/* FOOTER */}
          <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Link href="/(auth)" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}> Login</Text>
                </TouchableOpacity>
              </Link>
            </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}   