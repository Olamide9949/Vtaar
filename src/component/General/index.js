import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
  import * as Icons from 'react-native-heroicons/solid';
  import { useToast } from 'react-native-toast-notifications';
import styles from './style';
  
  
  export const Notify = ({text, title, style}) => {
    const toast = useToast();
    return (
      <View style={[styles.notificationStyle, style]}>
          <Icons.BellIcon size={30} fill={'#3D56B2'}/>
          <View style={{paddingHorizontal:4}}>
              <Text style={[styles.headTextStyle, {color:'#3D56B2'}]}>{title}</Text>
              <Text style={styles.notificationTextStyle}>{text}</Text>
          </View>
          <TouchableOpacity onPress={()=>toast.hideAll()}>
          <Icons.XCircleIcon fill={'#FFF'}/>
          </TouchableOpacity>
      </View>
    );
  };
  
  export default Notify;