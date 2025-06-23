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
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { doc, setDoc } from "firebase/firestore";
import { saveUserProfile } from '@/firebase/helper';
import { sendEmailVerification } from "firebase/auth";
// import { sendVerificationCode } from 'firebase/auth';
import { firestore } from '@/firebase/config';

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'artist' | 'hoster' | 'voter' | null>(null);

  const validatePassword = (pass: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pass);
  };

  const handleSignUp = async () => {
    if (!role) {
      alert('Please select a role.');
      return;
    }

    if (!validatePassword(password)) {
      alert(
        'Weak Password, Password must be at least 8 characters, include an uppercase letter, a number, and a special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      alert('Password Mismatch, Password and confirm password do not match.');
      return;
    }

    if (!email || !fullName) {
      alert('Missing Fields, Please fill in all required fields.');
      return;
    }

    dispatch(signUpStart());

    let user;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
       



     

      if (!user.email) throw new Error("Email not available");

      // Send verification email
       auth.languageCode = 'en';
       await sendEmailVerification(user);

       Alert.alert("Verify Your Email", "We've sent you a verification link.");

      // Save user profile to Firestore
      await saveUserProfile(user.uid, user.email!, fullName, role);

      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,  
        role,
        fullName,
        };

      dispatch(signUpSuccess(userData));
         Alert.alert('Success', 'Account created successfully!');

      } catch (err: any) {
        dispatch(signUpFailure(err.message));
        Alert.alert('Sign Up Error', err.message);
      }
  

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
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <View style={styles.roleContainer}>
            {['artist', 'hoster', 'voter'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[
                  styles.roleButton,
                  role === r && styles.roleButtonSelected,
                ]}
                onPress={() => setRole(r as 'artist' | 'hoster' | 'voter')}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === r && styles.roleTextSelected,
                  ]}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    alignItems: 'center',
  },
  roleButtonSelected: {
    backgroundColor: '#6200ee',
  },
  roleText: {
    color: '#000',
    fontWeight: '600',
  },
  roleTextSelected: {
    color: '#fff',
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
