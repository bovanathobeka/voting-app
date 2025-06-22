import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, getDoc, updateDoc, doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { firestore } from '@/firebase/config';
import { signInSuccess } from '@/redux/slices/authSlice';

export default function EmailVerificationScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyCode = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const docRef = doc(firestore, 'verifications', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        Alert.alert('Error', 'No verification record found.');
        setLoading(false);
        return;
      }

      const data = docSnap.data();
      if (data.code === code) {
        await updateDoc(docRef, { verified: true });

        dispatch(signInSuccess({
          uid: user.uid,
          email: user.email ?? data.email,
          role: data.role ?? '',
          fullName: data.fullName ?? '',
        }));

        Alert.alert('Success', 'Email verified successfully!');
        // navigation.reset({
        //   index: 0,
        //   routes: [{ fullName: data.role === 'artist' ? 'ArtistHome' : data.role === 'hoster' ? 'HosterHome' : 'Home' }],
        // });
      } else {
        Alert.alert('Invalid Code', 'The code you entered is incorrect.');
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.description}>
        We’ve sent a 6-digit code to your email.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={verifyCode} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>
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
    marginBottom: 15,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
