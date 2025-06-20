import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/slices/authSlice';
import { RootState } from '../redux/store';

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    dispatch(signInStart()); // reuse signInStart for loading state

    // Simulate sign-up API call — replace with your backend logic
    setTimeout(() => {
      if (email && password && fullName) {
        // fake success
        dispatch(
          signInSuccess({
            email,
            token: 'fake-signup-token',
          })
        );
      } else {
        dispatch(signInFailure('Please fill in all fields'));
      }
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.centerWrapper}>
        <View style={Platform.OS === 'web' ? styles.webContainer : styles.container}>
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.link}>Log In</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    minHeight: '100%',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '100%',
  },
  webContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    width: '100%',
    maxWidth: 650,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#6a11cb',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#444',
    fontSize: 14,
  },
  link: {
    color: '#2575fc',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
