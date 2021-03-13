import React, { Component } from 'react';
import { Button, View, TextInput } from 'react-native';
import firebase from 'firebase';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };

    this.onSignIn = this.onSignIn.bind(this);
  }

  async onSignIn() {
    const { email, password } = this.state;
    console.log('wanna signin');
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
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
        <Button onPress={() => this.onSignIn()} title="Sign Up"></Button>
      </View>
    );
  }
}

export default Login;
