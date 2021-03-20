import { View, Text, Button, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import firebase from 'firebase';

const Dashboard = () => {
  const [name, setName] = useState('Stranger');

  const handleClick = () => {
    setName('Evzen');
  };

  return (
    <View style={styles.container}>
      <Text>This is a dashboard screen</Text>
      <Text>{name}</Text>
      <Button title="testing state mngmt" onPress={handleClick}></Button>
      <Image
        source={require('../assets/favicon.png')}
        style={{ width: 50, height: 50 }}
      />
      <Image
        source={{
          uri: 'https://source.unsplash.com/1600x900/?dog',
        }}
        style={{ width: 50, height: 50 }}
      />
      <Button
        title="Sign out"
        onPress={() => firebase.auth().signOut()}
      ></Button>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
