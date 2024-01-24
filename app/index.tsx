import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import {auth} from '../firebaseConfig'
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import {db} from '../firebaseConfig';

const AccessScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleCreateUser = async () => {
    try {
        const response = await createUserWithEmailAndPassword(auth, 'kaykay@menonx.com', 'farziseriesx');
        console.log('reg response is - ', response);
    } catch(error) {
        console.log('reg err is - ', error)
    }
  };

  const handleLogin = async () => {
    try {
        const response = await signInWithEmailAndPassword(auth, 'kaykay@menonx.com', 'farziseriesx');
        if (response && response.user) {
          console.log("Login successful:", response.user);
        } else {
          console.log("Unexpected response:", response);
        }
      } catch (error:any) {
          console.error("Authentication error:", error.message);
      }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, 'joy.bangalore.9@gmail.com').then(()=>{
        console.log('Reset email successful')
      })
    } catch (err) {
      console.log(err);
      console.log('Reset email failed');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth).then(()=>{
        console.log('signout successful')
      })
    } catch (err) {
      console.log(err);
      console.log('signout failed');
    }
  };

  const handleAddTodo = async (e: any) => {
    // try {
    //     const docRef = await addDoc(collection(db, "todos"), {
    //       todo: "Hello-todo-21",    
    //     });
    //     console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    await setDoc(doc(db, "broo", "hello"), {
      been: "ax",
      prom: "CA",
      sana: "eer"
    })
    .catch(err => {
      console.log(err)
    })
  };

  return (
    <View>
      <View>
        <Text>Access Page</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {/* <Picker
          selectedValue={country}
          onValueChange={(itemValue) => setCountry(itemValue)}
        >
          <Picker.Item label="Country 1" value="country1" />
          <Picker.Item label="Country 2" value="country2" />
        </Picker> */}
        <Button title="Create User" onPress={handleCreateUser} />
      </View>

      <View>
        <TextInput
          placeholder="Username"
          value={loginUsername}
          onChangeText={(text) => setLoginUsername(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={loginPassword}
          onChangeText={(text) => setLoginPassword(text)}
        />
        <Button title="Login" onPress={handleLogin} />
        <Button title="Reset Password" onPress={handleResetPassword} />
        <Button title="Sign Out" onPress={handleSignOut} />
        <Button title="Add Todo" onPress={handleAddTodo} />
      </View>
    </View>
  );
};


export default AccessScreen