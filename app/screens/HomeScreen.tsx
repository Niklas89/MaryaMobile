import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RouteParams } from '../navigation/RootNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';

type ScreenNavigationProp<
  T extends keyof RouteParams> = StackNavigationProp<RouteParams, T>;

type ScreenRouteProp<T extends keyof RouteParams> = RouteProp<
  RouteParams,
  T
>;
type Props<T extends keyof RouteParams> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

const HomeScreen: React.FC<Props<'Home'>> = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to homepage</Text>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
        color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;