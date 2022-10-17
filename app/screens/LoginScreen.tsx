import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { IUser } from "../interfaces/IUser";
import { AxiosFunction } from "../api/AxiosFunction";
import { AxiosError, AxiosResponse } from "axios";
import useAuth from "../hooks/useAuth";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

/*
const initialValues = {
    email: "",
    password: "",
}; */

const LOGIN_URL = "auth/login";

const LoginScreen = () => {
    //const [userInfo, setUserInfos] = useState<IUser>(initialValues);
    // const { setAuth, persist, setPersist } = useAuth();
    const { setAuth } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { postQuery } = AxiosFunction();

    const login = (email: string | undefined, password: string | undefined) => {
        const postData = { email, password};
        console.log(postData);
        postQuery(LOGIN_URL, postData).then((response: AxiosResponse) => {
            const accessToken = response.data.accessToken;
            const role = response.data.idRole;
            console.log(response.data);
            //setUserInfos(response.data);
            setAuth?.({ role, accessToken });
        }).catch((error: AxiosError) => {
            console.log(error);
        })
    };

    return (
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <TextInput
              style={styles.input}
              value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
            />
    
            <TextInput
              style={styles.input}
              value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
              secureTextEntry
            />
    
            <Button
              title="Login"
              onPress={() => {
                login(email, password);
              }}
            />
    
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Text>Don't have an account!? </Text>
            </View>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      width: '80%',
    },
    input: {
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#bbb',
      borderRadius: 5,
      paddingHorizontal: 14,
    },
    link: {
      color: 'blue',
    },
  });

export default LoginScreen;