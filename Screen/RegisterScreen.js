import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,TouchableOpacity,Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [user_name, setuser_name] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
  
    const handleRegister = () => {
      const params = new URLSearchParams();
      params.append('user_name', user_name);
      params.append('password', password);
      params.append('email', email);
      params.append('nombre_user', user_name);
      
      fetch('https://SevillaDev.somee.com/insert_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })
        .then(response => {
          if (!response.ok) {
            Alert.alert('Coreo electronico ya esta registrado');
            throw new Error('Network response was not ok');
          }
          Alert.alert('Registro exitoso');
          navigation.navigate('Login');
          return response.toString();
        })
        .then(async data => {
        //  const userData = data[0];
         // const userName = userData.nombre_user;
         // const id = userData.id;
          
         // try {
           // await AsyncStorage.setItem('userName', userName);
            //await AsyncStorage.setItem('id', JSON.stringify(parseInt(id)));
            //setIsAuthenticated(true);
          //} catch (error) {
           // Alert.alert('Error', 'No se pudo guardar la información');
          //}
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
  return (
    <View style={styles.container}>
       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Text style={styles.logo}>Cummunity</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={user_name}
        onChangeText={text => setuser_name(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="email-address"
         keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
        <TextInput
        style={styles.input}
        placeholder="validate password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.RegisterBtn} onPress={handleRegister}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
     

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  forgot: {
    color: '#3498db',
    marginBottom: 20,
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#3498db',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  RegisterBtn: {
    width: '100%',
    backgroundColor: '#3498db',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signup: {
    color: '#3498db',
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#999',
  },
 
});


export default RegisterScreen;
