import React, { useState } from 'react';
import { Button, View, TextInput } from 'react-native';
import firebase from 'firebase';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // JSON example
  // const [somejson, setsomejson] = useState({ name: 'JSON', age: 99 });

  const onSignIn = async () => {
    console.log('Signing in with email and password');
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
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
      <Button onPress={() => onSignIn()} title="Sign In"></Button>
    </View>
  );
};

export default Login;
