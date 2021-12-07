import * as React from 'react'
import { View, Text, TouchableOpacity, TextInput, Dimensions, ImageBackground } from 'react-native'
import * as Icons from 'react-native-heroicons/solid';
import { useToast } from 'react-native-toast-notifications';

import axios from 'axios';
import { LINK } from '../../component/Requests';


export const SignUpScreen = ({ navigation }) => {
    const [sdata, setData] = React.useState({
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
    })
    const [isLoading, setIsLoading] = React.useState(false)

    function handleNameChange(val){
        setData({
            ...sdata,
            name: val,
        })
    }
    function handleEmailChange(val){
        setData({
            ...sdata,
            email: val,
        })
    }
    function handlePasswordChange(val){
        setData({
            ...sdata,
            password: val,
        })
    }
    function handlePasswordConfirmationChange(val){
        setData({
            ...sdata,
            password_confirmation: val,
        })
    }

    const toast = useToast();

    const signupHandle = async () => {
        setIsLoading(true)
        if ( sdata.name === '' || sdata.email === '' || sdata.password === '' || sdata.password_confirmation === '' ) {
            toast.show(`Fill in all empty fields.`,  {type: "warning", data:{title:'Incomplete Details!'}, duration:5000, placement:'top'})
            setIsLoading(false)
        }else {

            const onSuccess = ({data}) => {
                if(data.success === true){
                    toast.show(`Account ${data.name} created`,  {type: "custom", data:{title:'Success'}, duration:4000, placement:'bottom'})
                    navigation.navigate('SignIn')
                }else{
                    toast.show(`Having issues with signing up, close and open the app again.`,  {type: "custom", data:{title:'Lost Connection'}, duration:4000, placement:'top'})
                }
            }
    
            const onFailure = ({response}) => {
                if(response.data.message){
                    toast.show(`${response.data.message}`,  {type: "warning", data:{title:'Unable to connect!'}, duration:4000, placement:'top'})
                }else{
                    console.log('Maybe Internet Connection Problem', response)
                    // toast.show(`Having issues, close and open the app again.`,  {type: "custom", data:{title:'Lost Connection'}, duration:4000, placement:'bottom'})
                }
                if (Error) throw new Error;
                toast.show(`Check if you have internet connections.`,  {type: "custom", data:{title:'Lost Connection'}, duration:4000, placement:'top'})
            }
            const reqOptions = {
                name: sdata.name,
                email: sdata.email,
                password: sdata.password,
                password_confirmation: sdata.password_confirmation
              }
    
            //   console.log('Signup Data: ', reqOptions)
              await axios.post(`${LINK}/register`, reqOptions)
              .then(onSuccess)
              .catch(onFailure)
              .finally(setIsLoading(false))
        }


    }

    return (
        <ImageBackground source={require('../../assets/bgImage.png')} style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical:10,
        }}>
            <Text style={{fontWeight:'bold', fontSize:35}}>
                Create Account
            </Text>
            <View style={{display:'flex', borderRadius:10,
            borderWidth:1, borderColor:'#433C3C',
            paddingHorizontal:5,
            width:Dimensions.get('screen').width / 1.5,
            alignItems:'center', flexDirection:'row'}}>
            <Icons.UserIcon size={25} stroke={'#433C3C'}/>
            <TextInput style={{marginLeft:10,
            width:Dimensions.get('screen').width / 1.3,}}
            keyboardType='default'
             placeholder={'Name'}
             onChangeText={(val)=>handleNameChange(val)}
             />
            </View>
            <View style={{display:'flex', borderRadius:10,
            borderWidth:1, borderColor:'#433C3C',
            paddingHorizontal:5, marginVertical:10,
            width:Dimensions.get('screen').width / 1.5,
            alignItems:'center', flexDirection:'row'}}>
            <Icons.MailOpenIcon size={25} stroke={'#433C3C'}/>
            <TextInput style={{marginLeft:10,
            width:Dimensions.get('screen').width / 1.3,}}
            keyboardType='email-address'
             placeholder={'Email'}
             onChangeText={(val)=>handleEmailChange(val)}
             />
             </View>
            <View style={{display:'flex', borderRadius:10,
            borderWidth:1, borderColor:'#433C3C',
            paddingHorizontal:5,
            width:Dimensions.get('screen').width / 1.5,
            alignItems:'center', flexDirection:'row'}}>
            <Icons.KeyIcon size={25} stroke={'#433C3C'}/>
            <TextInput style={{marginLeft:10,
            width:Dimensions.get('screen').width / 1.3,}}
             placeholder={'Password'}
             secureTextEntry
             onChangeText={(val)=>handlePasswordChange(val)}
             />
             </View>
            <View style={{display:'flex', borderRadius:10,
            borderWidth:1, borderColor:'#433C3C',
            paddingHorizontal:5, marginVertical:10,
            width:Dimensions.get('screen').width / 1.5,
            alignItems:'center', flexDirection:'row'}}>
            <Icons.KeyIcon size={25} stroke={'#433C3C'}/>
            <TextInput style={{marginLeft:10,
            width:Dimensions.get('screen').width / 1.3,}}
             placeholder={'Confirm Password'}
             secureTextEntry
             onChangeText={(val)=>handlePasswordConfirmationChange(val)}
             />
             </View>
            <TouchableOpacity
                style={{
                    backgroundColor: '#433C3C',
                    paddingHorizontal: 40, 
                    borderRadius: 10,
                    paddingVertical: 8,
                    margin: 6
                }}
                onPress={() => {
                    signupHandle()
                    // toast.show(`Sign Out`,  
                    // {type: "warning", data:{title:'Great!'}, 
                    // duration:4000, placement:'bottom'})
                    }}>
                {isLoading ? <Text style={{
                    color: '#fff',
                    fontSize: 20}}>Creating account...</Text>:
                <Text style={{
                    color: '#fff',
                    fontSize: 20}}>SignUp</Text>
                    }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}} 
            style={{paddingVertical:20,
            display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Text style={{ marginRight:5,
                    color: '#433C3C',
                    fontSize: 16}}>Or Sign In</Text>
                    <Icons.LockClosedIcon stroke={'#433C3C'} size={22}/>
            </TouchableOpacity>
            </ImageBackground>
    )
}

export default SignUpScreen;
