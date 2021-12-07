import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    notificationStyle: {
      backgroundColor: 'rgba(68,85,90,0.6)',
      minHeight: 50,
      width: Dimensions.get('screen').width / 1.1,
      alignItems: 'center',
      borderRadius: 10,
      paddingHorizontal:10,
      marginTop:20,
      display:'flex', 
      flexDirection:'row',
      justifyContent:'space-between', 
      paddingVertical:10,
    },
    headTextStyle: {
      fontWeight:'bold',
      fontSize:14,
      letterSpacing: 0.1,
      backgroundColor:'transparent',
  },
  notificationTextStyle: {
      color: '#FFF',
      letterSpacing:0.3,
      fontSize:12,
      backgroundColor:'transparent',
    },
  });
  
  export default styles;