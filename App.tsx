import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './src/pages/Home';
import LoginPage from './src/pages/Login';
import EditUserPage from './src/pages/EditUser';

import EditRolePage from './src/pages/EditRole';
import ListRolePage from './src/pages/ListRole';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>      
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{title: 'Acesso' }} />
        <Stack.Screen name="Home" component={HomePage} options={{title: 'Home Page' }}/>      
        <Stack.Screen name="EditUser" component={EditUserPage} options={{title: 'Edit User' }} />   
        <Stack.Screen name="EditRole" component={EditRolePage} options={{title: 'Edit Role' }}/>     
        <Stack.Screen name="ListRole" component={ListRolePage} options={{title: 'Role List' }}  />       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

