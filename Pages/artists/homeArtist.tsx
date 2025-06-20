import React, { useEffect, useRef } from 'react';
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
  Animated,
} from 'react-native';

export default function HomeArtist() {
  const screenWidth = Dimensions.get('window').width;
  const isLargeScreen = screenWidth > 600;

  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        style={styles.searchBar}
      />

      <ImageBackground
        source={{
          uri: 'https://media.istockphoto.com/id/1475876337/vector/elegant-golden-stage-diagonal-glowing-with-lighting-effect-sparkle-on-dark-blue-background.jpg?s=612x612&w=0&k=20&c=f0P3sPoxQ8CE1ChcBVVLEm1ALgPT1w97Yy8HQbFSmak=',
        }}
        style={styles.banner}
      >
        <Text style={styles.bannerText}>
          Add your own Post {'\n'} to be voted for
        </Text>
      </ImageBackground>

      <Text style={styles.postsHeading}>Posts</Text>

      <View style={styles.postCard}>
        <Text style={styles.postText}>Add your own post</Text>

        <View
          style={[
            styles.contentRow,
            { flexDirection: isLargeScreen ? 'row' : 'column' },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Image
              source={{
                uri: 'https://www.shutterstock.com/image-vector/golden-shiny-award-sign-laurel-600nw-1292447029.jpg',
              }}
              style={{
                width: isLargeScreen ? 550 : 300,
                height: isLargeScreen ? 700 : 300,
                borderRadius: 12,
                resizeMode: 'cover',
                marginBottom: isLargeScreen ? 0 : 10,
                marginRight: isLargeScreen ? 10 : 0,
              }}
            />
          </View>

          <Animated.View
            style={{
              flex: 1,
              transform: [{ translateX: slideAnim }],
              justifyContent: 'center',
            }}
          >
            <Text style={styles.motivationText}>
              As an artist, your work is a powerful expression of creativity,
              passion,<br/>and dedication—so why not let it be celebrated on a
              larger stage?<br/>By joining award-winning platforms and participating
              in voting events,<br/>you're not only gaining recognition for your
              craft,<br/>but also connecting with a broader audience who truly
              appreciates what you create.<br/>Awards are more than just
              trophies,<br/>they're milestones that can open doors to new
              opportunities, collaborations,<br/>and even life-changing exposure.<br/>
              Don’t wait to be discovered—take the initiative to shine. Your art
              deserves to be seen, heard, and honored.<br/>When you add yourself to
              the list, you’re giving your fans and supporters<br/>the chance to
              show their love through votes—and that can be incredibly
              meaningful.<br/>So step into the spotlight—let your talent speak, and
              let the world celebrate you!
            </Text>
          </Animated.View>
        </View>

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
  contentRow: {
    alignItems: 'flex-start',
  },
  motivationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '0000',
    lineHeight: 22,
    width: 500,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
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
