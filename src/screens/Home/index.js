import * as React from 'react';
import { View, Text, Platform, PermissionsAndroid, Dimensions, TouchableOpacity, DevSettings } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { LINK } from '../../component/Requests';


const ClockScreen = ({ navigation}) => {
  const toast = useToast();
    const [clocked, setClocked] = React.useState(false);
    const [position, setPosition] = React.useState({
      latitude: 0.0,
      longitude: 0.0,
      latitudeDelta: 0.142,
      longitudeDelta: 0.142,
    });
    const [currentLatitude, setCurrentLatitude] = React.useState(position.latitude);
    const [currentLongitude, setCurrentLongitude] = React.useState(position.longitude);
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'Vtaar needs to access your location for full functionality.',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            Geolocation.getCurrentPosition(
              //Will give you the current location
              (position) => {
                // console.log('Position Data: ', position)
                // setLocationStatus('You are Here');
                //getting the Longitude from the location json
                const Lng = position.coords.longitude;
                const Lat = position.coords.latitude;
                setPosition({
                    latitude: parseFloat(Lat),
                    longitude: parseFloat(Lng),
                    latitudeDelta:0.0482,
                    longitudeDelta:0.0492,
                })
              },
              (error) => {
                toast.show(`${error.message}`,  {type: "warning", data:{title:'Location reset'}, duration:4000, placement:'bottom'})
              },
              { enableHighAccuracy: false, timeout: 60000, maximumAge: 1000 }
              );
            } else {
              toast.show(`Permission Denied`,  {type: "warning", data:{title:'Android Permission'}, duration:4000, placement:'bottom'})
              DevSettings.reload();
            }
          } catch (err) {
            toast.show(`${err.message}`,  {type: "warning", data:{title:'Error'}, duration:4000, placement:'bottom'})
            // console.log(`Finaly map details error: ${err}`)
        }
      }
    };

    React.useEffect(() => {
      requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLng = position.coords.longitude;
        //getting the Longitude from the location json
        const currentLat = position.coords.latitude;
        //getting the Latitude from the location json
        setCurrentLatitude(parseFloat(currentLat));
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLongitude(parseFloat(currentLng));
        //Setting state Latitude to re re-render the Longitude Text
      },
      (error) => {
        toast.show(`${error.message}`,  {type: "warning", data:{title:'Location reset'}, duration:4000, placement:'bottom'})
      },
      { enableHighAccuracy: false }
      );
      clockIn()
    };
    
    function clockIn(){
      const token = 'qwqweqqew13413eeqqr34qrqeqw';
      const onClocked = () =>{
        // console.log(data)
        toast.show(`You Clocked In.`,  {type: "warning", data:{title:'Done'}, duration:4000, placement:'top'})
      }
      const onFailedClocked = ({response}) =>{
        if(response.data === 'Unauthorized'){
          toast.show(`You're ${response.data} Verify your account and try again.`,  {type: "warning", data:{title:'User not verified'}, duration:4000, placement:'bottom'})
        }else{
          toast.show(`${response.data}`,  {type: "warning", data:{title:'Unsuccessful'}, duration:4000, placement:'bottom'})
        }
      // console.log('Could not clock', response.data)
    }
    const options = {
      lat:position.latitude,
      lng:position.longitude,
  }
  const config = {
    headers:{
    'Authorization':`Bearer ${token}`
  }}
    axios.post(`${LINK}/clock-in`, options, config)
    .then(onClocked)
    .catch(onFailedClocked)
    .catch(err=>{
      // console.log('Internet Error')
      toast.show(`Check your internet connection and try again.`,  {type: "warning", data:{title:'Low Network Signal'}, duration:4000, placement:'bottom'})
    })
  }
  
  
  function clockOut(){ 
    const onClockedOut = () =>{
      // console.log(data)
      toast.show(`You Clocked Out.`,  {type: "warning", data:{title:'Done'}, duration:4000, placement:'top'})
    }
    const onFailedClockedOut = ({response}) =>{
        toast.show(`${response.data.message}`,  {type: "warning", data:{title:'User not verified'}, duration:4000, placement:'bottom'})
  }
    axios.post(`${LINK}/clock-out`)
    .then(onClockedOut)
    .catch(onFailedClockedOut)
    .catch(err=>{
      // console.log('Internet Error')
      toast.show(`Check your internet connection and try again.`,  {type: "warning", data:{title:'Low Network Signal'}, duration:4000, placement:'bottom'})
    })
  }

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:'#FFF',
        }}>
            <MapView style={[{
                width:Dimensions.get('screen').width,
                height:410,
                borderRadius:10,
              }]}
                showsUserLocation={true}
                initialRegion={position}
                region={{
                  latitude: position.latitude,
                  longitude: position.longitude,
                  latitudeDelta:position.latitudeDelta,
                  longitudeDelta:position.longitudeDelta
                }}
            />
            {clocked ?
            <TouchableOpacity 
            style={{
                backgroundColor: '#000',
                paddingHorizontal: 40, 
                borderRadius: 10,
                paddingVertical: 10,
                marginVertical: 20
            }}
            onPress={() => {
                setClocked(false)
                clockOut()
            }}>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 20
                    }}>Clock Out</Text>
            </TouchableOpacity>:
            <TouchableOpacity 
            style={{
                backgroundColor: '#004225',
                paddingHorizontal: 40, 
                borderRadius: 10,
                paddingVertical: 8,
                marginVertical: 20
            }}
            onPress={() => {
                setClocked(true),
                getOneTimeLocation()
            }}>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 20
                    }}>Clock In</Text>
            </TouchableOpacity>}
          {clocked ?
          <View style={{display:'flex', flexDirection:'row',
            alignItems:'center',
            paddingHorizontal:20,
            width:Dimensions.get('window').width,
            backgroundColor:'#FEFEFE',
            paddingVertical:10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
            borderLeftWidth:10,
            borderColor:'#0078F1',
            borderRadius:10,
          }}>
            <View style={{justifyContent:'center'}}>
                <Text style={{fontWeight:'bold', fontSize:12, color:'#0078F1'}}>Nov</Text>
                <Text style={{fontWeight:'bold', color:'#0078F1', fontSize:22}}>25</Text>
              </View>
              <View style={{marginHorizontal:15}}>
                <Text style={{fontWeight:'bold', fontSize:14, color:'#4D4D4D'}}>Location: 
                  <Text style={{fontWeight:'300'}}>{currentLatitude}/{currentLongitude}</Text>
                </Text>
                <View>
                  <Text style={{fontWeight:'bold', color:'#808080', fontSize:14,}}>Time In: 10:30 AM / Time Out: 11:35 AM</Text>
                </View>
                <View>
                  <Text style={{fontWeight:'300', color:'#808080', fontSize:14,}}>Duration: 2hrs</Text>
                </View>
              </View>
            </View>:
            <View style={{display:'flex', flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            paddingHorizontal:20,
            width:Dimensions.get('window').width,
            backgroundColor:'#FEFEFE',
            paddingVertical:10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
            borderLeftWidth:10,
            borderColor:'#DC143C',
            borderRadius:10,
          }}>
              <Text style={{textAlign:'center',fontWeight:'bold', fontSize:14, color:'#4D4D4D'}}>
                Clock in to start a shecedule</Text>
            </View>}
            <View style={{position:'absolute', bottom:-50, justifyContent:'center'}}>
              <Text style={{fontSize:12, fontWeight:'300'}}>Vtaar &copy; 2021</Text>
            </View>
        </View>
    )
}

export default ClockScreen;