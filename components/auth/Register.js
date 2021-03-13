import React, { Component } from 'react';
import { Button, View, TextInput } from 'react-native';
import firebase from 'firebase';

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  async onSignUp() {
    const { email, password } = this.state;
    console.log('wanna signup');
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(result);
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        ></TextInput>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        ></TextInput>
        <Button title="Sign Up" onPress={() => this.onSignUp()}></Button>
      </View>
    );
  }
}

export default Register;
