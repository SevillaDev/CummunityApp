import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity ,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const GlobalScreen = ({ navigation }) => {

  const cards = [
    { title: 'Anime', logo: require('../img/gojo.png'), description: 'Comparte tu opinion acerca del anime.', route: 'Home' },
    { title: 'Music', logo: require('../img/music.png'), description: 'Comparte tu opinion acerca de la musica.' },
    { title: 'Games', logo: require('../img/pac.png'), description: 'Comparte tu opinion acerca de video juegos.' },
    { title: 'Art', logo: require('../img/art.png'), description: 'Comparte tu opinion acerca del arte.' },
    { title: 'Books', logo: require('../img/book.png'), description: 'Comparte tus gustos por la lectura.' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (item.route) {
          navigation.navigate(item.route);
        }
      }}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.logo} style={styles.logo} />
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="logout" size={30} color="#3498db" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <TouchableOpacity onPress={() =>   navigation.navigate('Global')} style={styles.headerButton}>
          <Icon name="public" size={30} color="#3498db" />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#3498db',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 5,
  },
  description: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: 10,
    color: '#3498db',
  },
});

export default GlobalScreen;
