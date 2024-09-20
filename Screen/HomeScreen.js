import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [userName, setUserName] = useState(null);
    const [userid, setUserid] = useState(null);
    
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
      <Text>Bienvenido a la página de inicio {userName}</Text>
      <Button title="Cerrar sesión" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
