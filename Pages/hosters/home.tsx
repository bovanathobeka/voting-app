import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

export default function HomeHosters() {
  const screenWidth = Dimensions.get('window').width;
  const isLargeScreen = screenWidth > 600;

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        style={styles.searchBar}
      />

      <ImageBackground
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw7Ju1bPQFTpYtgKxNraplxKAWcTCnyhWsNrVT40QCsjSUPCQW1uSvl6ioTvGNaXGnCw0&usqp=CAU' }}
        style={styles.banner}
      >
        <Text style={styles.bannerText}>Create your own winning Awards/Event</Text>
      </ImageBackground>

      <Text style={styles.postsHeading}>Posts</Text>

      <View style={styles.postCard}>
        <Image
          source={{ uri: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/winner-award-night-poster-design-template-4f1df85620a90bfe2b6afb52256c9dfd_screen.jpg?ts=1715153444' }}
          style={{
            width: '100%',
            height: isLargeScreen ? 700 : 400,
            borderRadius: 12,
            resizeMode: 'cover',
            marginTop: 20,
          }}
        />
        <Text style={styles.postText}>Add your own post</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>R200/post</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#eee',
    color: '#000',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 50,
    fontSize: 16,
  },
  banner: {
    height: 400,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    textAlign: 'center',
  },
  postsHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginLeft: 16,
  },
  postCard: {
    backgroundColor: '#f9f9f9',
    margin: 16,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  postText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
