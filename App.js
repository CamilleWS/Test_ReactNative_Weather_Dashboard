import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/Screens/Home/HomeScreen';
import SettingsScreen from './src/Screens/Settings/SettingsScreen';

import * as Font from 'expo-font';

const Stack = createStackNavigator();

class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  
  async componentDidMount() {
    await Font.loadAsync({
      fontello: require('./assets/fontello.ttf'),
    });
    
    this.setState({ fontsLoaded: true });
  } 
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
