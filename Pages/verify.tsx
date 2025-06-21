import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { getAuth, sendEmailVerification, reload } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function EmailVerificationScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await sendEmailVerification(user);
      setResent(true);
      Alert.alert('Success', 'Verification email resent.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkVerification = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await reload(user);
      if (user.emailVerified) {
        Alert.alert('Verified!', 'Email is verified.');
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'YourHomePageBasedOnRole' }], // Replace with role-based nav logic
        // });
      } else {
        Alert.alert('Not Verified', 'Please verify your email first.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.description}>
        A verification email has been sent to:
      </Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={handleResend}>
        <Text style={styles.buttonText}>Resend Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={checkVerification}>
        <Text style={styles.buttonText}>Check Verification</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {resent && <Text style={styles.resentText}>Email resent!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
  },
  email: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6a11cb',
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  resentText: {
    marginTop: 10,
    color: 'green',
    fontWeight: '500',
  },
});
