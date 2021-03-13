import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from 'firebase';

export class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is a dashboard screen</Text>
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
