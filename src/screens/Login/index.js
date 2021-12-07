import * as React from 'react'
import 'react-native-gesture-handler';
import { TouchableOpacity, View, Text, ImageBackground, TextInput, Dimensions, DevSettings } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Icons from 'react-native-heroicons/solid';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { LINK } from '../../component/Requests';
import { AuthContext } from '../../component/Context';




export const LoginScreen = () => {
    const navigation = useNavigation();
    const toast = useToast();
    const { signIn } = React.useContext(AuthContext);
    
    const [sdata, setData] = React.useState({
        email:'',
        password:''
    });

    const [isLoading, setIsLoading] = React.useState(false);

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
    
    
    const loginHandle = async () => {
        setIsLoading(true)
        if ( sdata.email === '' || sdata.password === '' ) {
            toast.show(`Email or password field cannot be empty.`,  {type: "custom", data:{title:'Incomplete Details!'}, duration:4000, placement:'top'})
            setIsLoading(false)
        } else {
            const onSuccess = ({data}) => {
                if(data) {
                    signIn(data)
                }else{
                    toast.show(`Having issues with sign in, close and open the app again.`,  {type: "custom", data:{title:'Lost Connection'}, duration:4000, placement:'bottom'})
                }
            }
            
            const onFailure = ({response}) => {
                    if(response.data.message){
                        toast.show(`${response.data.message}`,  {type: "custom", data:{title:'Unable to Connect!'}, duration:4000, placement:'bottom'})
                    }else{
                        toast.show(`Check your internet connections and try again.`,  {type: "custom", data:{title:'Lost Connection'}, duration:4000, placement:'bottom'})
                    }
            }
    
            const reqOptions = {
                  email: sdata.email,
                  password: sdata.password,
              }
    
           await axios.post(`${LINK}/login`, reqOptions)
           .then(onSuccess)
           .catch(onFailure)
           .finally(()=>setIsLoading(false))
        }
    }
    return (
        <ImageBackground source={require('../../assets/bgImage.png')} style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width:'100%'
        }}>
            <Text style={{fontWeight:'bold', color:'#0078F1', fontSize:35}}
            >Vtaar</Text>
            <Text style={{fontWeight:'300', fontSize:14, textAlign:'center', 
            width:Dimensions.get('screen').width / 2, marginVertical:5,}}
            >Sign in with your registered email and password</Text>
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
            <TouchableOpacity
                style={{
                    backgroundColor: '#0078F1',
                    paddingHorizontal: 40, 
                    borderRadius: 10,
                    paddingVertical: 8,
                    marginVertical: 10
                }}
                onPress={() => {
                    loginHandle()
                    // toast.show(`Sign In`,  
                    // {type: "custom", data:{title:'Great!'}, 
                    // duration:4000, placement:'bottom'})
                    // loggin()
                }}>
                {isLoading ? <Text style={{
                    color: '#fff',
                    fontSize: 20
                }}>Signing In...</Text>:
                <Text style={{
                    color: '#fff',
                    fontSize: 20
                }}>Sign In</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}} 
            style={{ marginVertical:5, width:Dimensions.get('screen').width / 1.5,
            height:50, justifyContent:'center',
            display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Text style={{ marginRight:5, textAlign:'center',
                    color: '#433C3C',
                    fontSize: 16}}>Or Sign Up</Text>
                    <Icons.UserAddIcon stroke={'#433C3C'} size={22}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{DevSettings.reload()}} 
            style={{paddingVertical:10,
            display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Text style={{ marginRight:5,
                    color: '#433C3C',
                    fontSize: 16}}>Reload App</Text>
                    <Icons.CogIcon stroke={'#433C3C'} size={22}/>
            </TouchableOpacity>
            </ImageBackground>
    )
}

export default LoginScreen;
