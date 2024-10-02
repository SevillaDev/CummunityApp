import React, { useEffect, useState } from 'react';
import {RefreshControl, View, StatusBar,Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Global = ({ navigation } ) => {
  const [userName, setUserName] = useState(null);
  const [userid, setUserid] = useState(null);
  const [Refreshing, setRefreshing] = useState(false);

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

  const [data, setData] = useState([]);
  const [data_Com, setData_Com] = useState([]);
  const [loading_Com, setLoading_Com] = useState(true);
  const [loading, setLoading] = useState(true);
  const [message_user, setMessage_user] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [body, setbody] = useState('');
  const [body_C, setbody_C] = useState('');
 
  
  const onRefresh = async () => {
fetchData();
fetchUserName();
}; 


  useEffect(() => {
    fetchData();
    fetchUserName();
  }, []);

  const fetchData = async () => {
    fetch("https://SevillaDev.somee.com/Notes")
      .then((response) => {
        if (!response.ok) {
          throw new Error('La respuesta del servidor no fue exitosa');
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
        Alert.alert('Error', 'Por favor, asegúrate de tener una conexión a Internet y vuelve a intentarlo');
        setLoading(false);
      });
  };

  const handlePost = async () => {
    try {
      const params = new URLSearchParams();
      params.append('id_user', userid);
      params.append('header', userName);
      params.append('body', body);
      
      fetch('https://SevillaDev.somee.com/InsertNote', {
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
        setbody(''); // Clear the input field
        fetchData(); // Call fetchData to refresh the list
        return response.json();
      })
      .then(data => {
      //  console.log('Data:', data);
        if (data.success) { // Assuming the response has a success property
          setbody(''); // Clear the input field
          fetchData(); // Call fetchData to refresh the list
        }
      })         
    } catch (error) {
      console.error('Error al enviar datos:', error);
      Alert.alert('Error', 'Por favor, intenta de nuevo más tarde.');
    }
  };

  const handleInsertComments = async (noteid) => {
    try {
      const params = new URLSearchParams();
      params.append('id_notes', noteid);
      params.append('id_user',userid);
      params.append('body', body_C);
      
      fetch('https://SevillaDev.somee.com/InsertCommets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })
      .then(async response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setbody_C(''); // Clear the input field
        fetchData(); // Call fetchData to refresh the list
        await handlePost_Comments(noteid);
        return response.json();
      })
      .then(data => {
       // console.log('Data:', data);
        if (data.success) { // Assuming the response has a success property
          setbody_C(''); // Clear the input field
          fetchData(); // Call fetchData to refresh the list
          setModalVisible(false);
        }
      })         
    } catch (error) {
      console.error('Error al enviar datos:', error);
      Alert.alert('Error', 'Por favor, intenta de nuevo más tarde.');
    }
  };

  const handlePost_Comments = async (id) => {
    try {
      const params = new URLSearchParams();
      params.append('id_notes', id);
      
      const response = await fetch('https://SevillaDev.somee.com/GetComments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data_Com = await response.json();
      setData_Com(data_Com);
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
      Alert.alert('Error', 'Por favor, intenta de nuevo más tarde.');
    }
  };

  const openModal = async (id) => {
    try {
      await handlePost_Comments(id);
      setSelectedItemId(id);
      setModalVisible(true);
    } catch (error) {
      console.error('Error al abrir el modal:', error);
      Alert.alert('Error', 'Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
        refreshControl={
          <RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />
        }
          data={data}
          numColumns={1}
          renderItem={({ item }) => (
            <View style={styles.card}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.header}</Text>
              <Text style={styles.timestamp}>{new Date(item.registro).toLocaleString('es-ES', {
         day: '2-digit',
         month: 'long',
         year: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
  })}</Text>
            </View>
            <Text style={styles.body}>{item.body}</Text>
            <View style={styles.reactions}>
              <TouchableOpacity style={styles.reaction_icon}>
                <MaterialIcons name="favorite" size={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openModal(item.id)} style={styles.reaction_icon}>
                <MaterialIcons name="comment" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          )}
          keyExtractor={(item) => item.id ? item.id.toString() : ''}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          onChangeText={setbody}
          autoCapitalize="none"
          style={styles.input}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={handlePost}>
          <MaterialIcons name="send" size={24} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <StatusBar />
          <View style={styles.card_commet}>
          <FlatList
  data={data_Com}
  numColumns={1}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nombre_user}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <View style={styles.reactions}>
        <TouchableOpacity>
          <MaterialIcons name="favorite" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )}
  keyExtractor={(item) => item.id ? item.id.toString() : ''}
/>

<View style={styles.inputContainer}>
  <TextInput
    value={body_C}
    onChangeText={setbody_C}
    autoCapitalize="none"
    style={styles.input}
    placeholder="Type a message..."
  />
  <TouchableOpacity onPress={() => handleInsertComments(selectedItemId)}>
    <MaterialIcons name="send" size={24} />
  </TouchableOpacity>
</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  timestamp: {
    fontSize: 12,
    color: '#888', // Color gris para el timestamp
    marginLeft: 8, // Espaciado entre el título y la hora
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color : '#0061a9'
  },
  body: {
    fontSize: 14,
    marginVertical: 8,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    
  },
  reaction_icon :{
  marginLeft : 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  modalContainer: {
   flex: 1,
   padding:16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 20,
  } ,card_commet: {
    backgroundColor: '#EEEEEE',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height:'95%',
    width:'100%'
  },
});

export default Global;
