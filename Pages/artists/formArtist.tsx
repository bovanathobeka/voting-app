import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FormArtist() {
  const [artistName, setArtistName] = useState('');
  const [idNo, setIdNo] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const newIndex = Math.min(currentIndex, Math.max(0, images.length - 1));
    setCurrentIndex(newIndex);
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
  }, [images]);

  const pickImage = async () => {
    if (images.length >= 3) {
      Alert.alert('Limit Reached', 'You have uploaded enough');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (result.assets && result.assets.length > 0) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const handleSubmit = () => {
    console.log({ artistName, idNo, accountNo, price: 'R200', images });
  };

  const renderAddSlide = () => (
    <View style={styles.imageSwipe}>
      <TouchableOpacity onPress={pickImage} style={styles.imageAddButtonFull}>
        <Text style={styles.addButtonText}>+ Add Image</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Poster Registration Form</Text>

      <View style={styles.swipeContainer}>
        {images.length === 0 ? (
          renderAddSlide()
        ) : (
          <FlatList
            ref={flatListRef}
            data={images}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: width - 40,
              offset: (width - 40) * index,
              index,
            })}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / (width - 40)
              );
              setCurrentIndex(index);
            }}
            renderItem={({ item }) => (
              <View style={styles.imageSwipe}>
                <Image source={{ uri: item }} style={styles.fullImage} />
                {images.length < 3 && (
                  <TouchableOpacity onPress={pickImage} style={styles.imageButtonRight}>
                    <Text style={styles.addButtonTextSmall}>+ Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        )}

        {Platform.OS === 'web' && images.length > 0 && (
          <View style={styles.navButtons}>
            <TouchableOpacity onPress={handleBack} style={styles.navButton}><Text style={styles.navText}>◀</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.navButton}><Text style={styles.navText}>▶</Text></TouchableOpacity>
          </View>
        )}

        {images.length > 0 && (
          <View style={styles.dotsContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        )}
      </View>

      <View style={styles.rowContainer}>
        <TextInput
          style={styles.inputHalf}
          placeholder="Artist Name"
          value={artistName}
          onChangeText={setArtistName}
        />
        <TextInput
          style={styles.inputHalf}
          placeholder="ID Number"
          value={idNo}
          onChangeText={setIdNo}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.rowContainer}>
        <TextInput
          style={styles.inputHalf}
          placeholder="Account Number"
          value={accountNo}
          onChangeText={setAccountNo}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.inputHalf, styles.disabledInput, styles.boldText]}
          value="R200"
          editable={false}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Make a payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 25,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  inputHalf: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#003366',
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
  },

  boldText: {
  fontWeight: 'bold',
},

  disabledInput: {
    backgroundColor: '#e6e6e6',
    color: '#333333',
  },
  swipeContainer: {
    width: '100%',
    height: Platform.OS === 'web' ? 520 : 300,
    marginBottom: 25,
    position: 'relative',
  },
  imageSwipe: {
    width: width - 40,
    height: Platform.OS === 'web' ? 500 : 280,
    resizeMode: 'cover',
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#003366',
  },
  imageAddButtonFull: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  imageButtonRight: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#003366',
    padding: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButtonTextSmall: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navButtons: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  navButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
  },
  navText: {
    color: '#fff',
    fontSize: 20,
  },
  fullImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#003366',
  },
  submitButton: {
    backgroundColor: '#000000',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
