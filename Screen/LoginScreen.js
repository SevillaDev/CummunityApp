import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,TouchableOpacity,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const params = new URLSearchParams();
    params.append('password', password);
    params.append('email', email);
    
    fetch('https://SevillaDev.somee.com/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(async data => {
        if (!data || data.length === 0) {
          setError('verify email or password');
          return;
        }
      
        const userData = data[0];
        const userName = userData.nombre_user;
        const id = userData.id;
      
        try {
          await AsyncStorage.setItem('userName', userName);
          await AsyncStorage.setItem('id', JSON.stringify(parseInt(id)));
          navigation.navigate('Salas');
        } catch (error) {
          Alert.alert('Error', 'Failed to store user data');
        }
      })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Cummunity</Text>
      <TextInput
        style={styles.input}
        placeholder="Email address"
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
{error ? <Text style={styles.error}>{error}</Text> : null}      
      <TouchableOpacity onPress={() => { /* Aquí puedes manejar el olvido de la contraseña */ }}>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Register')}}>
        <Text style={styles.signup}>Don't have an account? Sign up</Text>
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
  googleBtn: {
    width: '100%',
    backgroundColor: '#db4437',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 15,
  }
});


export default LoginScreen;
