import React, { useState } from 'react';
import { Button, View, TextInput } from 'react-native';
import firebase from 'firebase';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = async () => {
    console.log('Signing up with email and password');
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(result);
  };

  return (
    <View>
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      ></TextInput>
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      ></TextInput>
      <Button title="Sign Up" onPress={() => onSignUp()}></Button>
    </View>
  );
};

export default Register;
