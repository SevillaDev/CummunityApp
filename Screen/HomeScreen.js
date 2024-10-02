import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView,Image ,TouchableOpacity , StatusBar} from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [userName, setUserName] = useState(null);
    const [userid, setUserid] = useState(null);

    const rooms = [
      { name: 'Anime', messages: 5, icon: require('../img/gojo.png'), bgColor: '#6dc0f7' },
      { name: 'Music', messages: 4, icon: require('../img/music.png'), bgColor: '#6dc0f7' },
      { name: 'Games', messages: 10, icon: require('../img/pac.png'), bgColor: '#6dc0f7' },
      { name: 'Art', messages: 6, icon:require('../img/art.png'), bgColor: '#6dc0f7' },
      { name: 'Books', messages: 7, icon:require('../img/book.png'), bgColor: '#6dc0f7' },
      { name: 'Global', messages: 4, icon: require('../img/world.png'), bgColor: '#6dc0f7', route: 'Global' },
    ];
    
const fetchUserName = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const id = await AsyncStorage.getItem('id');
      if (name !== null) {
        setUserName(name);
        setUserid(id);
      } else {
        Alert.alert('No data', 'No se encontró el nombre');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo recuperar el nombre');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);


  return (
    <View style={styles.container}>
       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi {userName}  </Text>
        <Text style={styles.subHeader}>Welcome to Cummunity Home.</Text>
      </View>
      <View style={styles.roomsHeader}>
        <Text style={styles.roomsTitle}>Your Rooms</Text>
        <IconButton
          icon="plus-circle-outline"
          size={24}
          color="green"
          onPress={() => console.log('Add new room')}
        />
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {rooms.map((room, index) => (
          <TouchableOpacity  onPress={() => {
            if (room.route) {
              navigation.navigate(room.route);
            }
          }} key={index} style={[styles.roomCard, { backgroundColor: room.bgColor }]}>
            <Image source={room.icon} style={{height:60 , width:60}} color="white" />
            <Text style={styles.roomName}>{room.name}</Text>
            <Text style={styles.deviceCount}>{room.messages} messages</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 16,
    color: '#777',
  },
  roomsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roomsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  roomCard: {
    width: '48%',
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  deviceCount: {
    fontSize: 12,
    color: '#FFF',
  },
});

export default HomeScreen;
