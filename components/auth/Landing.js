import React from 'react';
import { View, Button } from 'react-native';
import { androidClientId } from '../../firebase_keys';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    let providerData = firebaseUser.providerData;
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

const onSignIn = async (googleUser) => {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  let unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      console.log(
        'user is not equal (meaning he is not signed in in firebase?)'
      );
      // Build Firebase credential with the Google ID token.
      let credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );

      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          console.log('user signed in');
          console.log(result);

          if (result.additionalUserInfo.isNewUser) {
            console.log('is new user, save to DB');
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .set({
                email: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                first_name: result.additionalUserInfo.profile.first_name,
                last_name: result.additionalUserInfo.profile.last_name,
                created_at: Date.now(),
              });
          } else {
            console.log('is old user, update last_signedIn');
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .update({
                last_signedIn: Date.now(),
              });
          }
        })
        .catch((error) => {
          console.log(error);
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          // The email of the user's account used.
          let email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          let credential = error.credential;
          // ...
        });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
};

const signInWithGoogleAsync = async () => {
  console.log('clicked on "sign in with google" button');
  // let isLoading = true;
  try {
    console.log('try');
    const result = await Google.logInAsync({
      androidClientId: androidClientId,
      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log('success');
      onSignIn(result);
      return result.accessToken;
    } else {
      console.log('non success');
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

export default Landing = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Register" onPress={() => navigation.navigate('Register')}>
        {' '}
      </Button>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      ></Button>
      <Button
        title="Sign in with Google"
        onPress={() => signInWithGoogleAsync()}
      ></Button>
    </View>
  );
};
