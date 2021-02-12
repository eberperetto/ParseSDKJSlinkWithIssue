import React from 'react';
import {Button, SafeAreaView, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import {GoogleSignin} from '@react-native-community/google-signin';

Parse.setAsyncStorage(AsyncStorage);
const PARSE_APPLICATION_ID = 'ADD_YOURS_HERE';
const PARSE_HOST_URL = 'ADD_YOURS_HERE';
const PARSE_JAVASCRIPT_ID = 'ADD_YOURS_HERE';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_ID);
Parse.serverURL = PARSE_HOST_URL;

GoogleSignin.configure({
  iosClientId: 'ADD_YOURS_HERE',
});

const App = () => {
  const doGoogleSignin = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const userInfo = await GoogleSignin.signIn();
    const googleIdToken = userInfo.idToken;
    const googleUserId = userInfo.user.id;
    const user = new Parse.User();
    return await user
      .linkWith('google', {
        authData: {id: googleUserId, id_token: googleIdToken},
      })
      .then(async (loggedInUser) => {
        alert(
          `User ${loggedInUser.get('username')} has successfully signed in!`,
        );
        return true;
      })
      .catch(async (error) => {
        alert(error.message);
        return false;
      });
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <Button onPress={() => doGoogleSignin()} title={'Google Signin'} />
      </SafeAreaView>
    </>
  );
};

export default App;
