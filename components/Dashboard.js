import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import firebase from 'firebase';

export class Dashboard extends Component {
  fetchCurrentUser = () => {
    // TODO
    const data = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        console.log(doc.data());
        return doc.data();
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is a dashboard screen</Text>
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
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
