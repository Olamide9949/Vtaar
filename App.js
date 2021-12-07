/**
 * Vtaar mobile app
 * Built by Olamide Tosin
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { ToastProvider, useToast } from 'react-native-toast-notifications';
import Notify from './src/component/General';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationStack, RootStackScreen } from './src/component/Stacks';
import { AuthContext } from './src/component/Context';
import AsyncStorage  from '@react-native-async-storage/async-storage';



const App = () => {


  const initialLoginState = {
    userId: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch(action.type){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
        };
      case 'LOGIN':
                return {
          ...prevState,
          userId: action.id,
          userToken: action.token,
        };
      case 'LOGOUT':
          return {
          ...prevState,
          userId:null,
          userToken:null,
        };
      // case 'REGISTER':
      //           return {
      //     ...prevState,
      //     userId: action.id,
      //     userToken: action.token,
      //   };
    }
  }
  

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)
  const authContext = React.useMemo(()=> ({
    signIn: async (data)=> {
      const userToken = String(data.token);
      const userId = data.user.id;
          try{
            await AsyncStorage.setItem('token', userToken)
          }catch(err){
            // console.log(err)
            toast.show(`Cannot sign in now check your internet connections.`,{
              placement:'top', type:'custom', duration:4000,
              data:{title:'Internet Issues'}
            })
            throw error;
          }
          dispatch({type: 'LOGIN', id: userId, token: userToken});
    },
    signOut: async ()=>{
      try{
        await AsyncStorage.removeItem('token');
      }catch(err){
        // console.log(err)
        toast.show(`Cannot sign out now please try again.`,{
          placement:'bottom', type:'success', duration:4000,
          data:{title:'Please wait'}
      })
      }
      dispatch({type: 'LOGOUT'})
    },
}), [])

const toast = useToast();

// async function useToken(){
//   const userToken = await AsyncStorage.getItem('token')
//   .then(data => {
//     try {
//       if(userToken !== undefined){
//         console.log(data)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   })
//   .catch(err => console.log('This Error: ', err))
  // if(userToken === ''){
  //   toast.show(`Connected.`,{
  //     placement:'top', type:'custom', duration: 2000,
  //     data:{title:'Yay!'}
  //   })
  // }else{
  //   toast.show(`You have not signed in before.`,{
  //     placement:'top', type:'custom', duration: 3000,
  //     data:{title:'Uh oooh!'}
  //   })
  // }
// }

React.useEffect(() => { 
  SplashScreen.hide(); 
  dispatch({ type: 'RETRIEVE_TOKEN', token: AsyncStorage.getItem('token') });
  // useToken();
}, []);

  return (
        <ToastProvider renderToast={(toast) =><Notify title={toast.data.title} text={toast.message}/>}>
          <AuthContext.Provider value={authContext}>
          <StatusBar translucent backgroundColor="transparent" />
          <NavigationContainer>
          {loginState.userToken !== null ?
            <RootStackScreen />:
            <AuthenticationStack />}
          </NavigationContainer>
          </AuthContext.Provider>
        </ToastProvider>
  );
};

export default App;