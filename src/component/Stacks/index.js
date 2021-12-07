import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import LoginScreen from "../../screens/Login";
import ClockScreen from '../../screens/Home';
import SignUpScreen from "../../screens/SignUp";
import * as Icons from 'react-native-heroicons/solid';

const ClockStack = createStackNavigator();
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

export const ClockStackScreen = () => {
  // const { signOut} = React.useContext(AuthContext);
  const toast = useToast();
  return (
    <ClockStack.Navigator>
      <ClockStack.Screen
          name={"Vtaar"}
          component={ClockScreen}
          options={{
            title: "Vtaar",
            headerRight : () => {
              return (
                <TouchableOpacity 
                style={{
                  paddingHorizontal: 10,
                  display:'flex',
                  flexDirection:'row',
                  alignItems:'center',
                }}
                onPress={() => {
                  // signOut()
                  toast.show(`Sign Out`,
                  {
                      type: "custom", 
                      data:{title:'Great!'}, 
                      duration:4000,placement:'bottom'
                  })
                }}
                ><Text style={{fontSize:10}}>Sign Out</Text>
                <Icons.LogoutIcon size={25} fill={'#000'} />
                </TouchableOpacity>
              )
            },
          }}
      />
    </ClockStack.Navigator>
  )
}


export const AuthenticationStack = () => {
  return (
    <AuthStack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <AuthStack.Screen
        name={"SignIn"}
        component={LoginScreen}
      />
      <AuthStack.Screen
          name={"SignUp"}
          component={SignUpScreen}
      />
    </AuthStack.Navigator>
    
  )
}


export const RootStackScreen = () => {
  return (
  <RootStack.Navigator 
    screenOptions={{
      headerShown: false
    }}>
      <RootStack.Screen
          name={"Vtaar"}
          component={ClockStackScreen}
          options={{
            title: "Vtaar"
          }}
      />
  </RootStack.Navigator>
  )
}


export default ClockStackScreen;