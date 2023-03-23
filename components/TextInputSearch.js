import React from "react";
import {View, Text, TouchableOpacity, StyleSheet,Image,TextInput} from 'react-native';
import { useNavigation } from "@react-navigation/native";


const TextInputSearch=()=>{
    const navigation= useNavigation();
  return(
        <View>
        <TextInput
             style={styles.bottomText}
                    placeholder='Enter' 
                    placeholderTextColor='rgba(104, 158, 209, 0.9)'
                    autoFocus={true}
                   >
        </TextInput>
        </View>
      
    )
}

const styles =StyleSheet.create({
    bottomText: {
        color: 'white', 
        fontSize: 18 ,
        width: '95%',
        borderColor: 'rgba(85, 168, 224, 1)',
        borderBottomWidth : 3,    
        backgroundColor : 'rgba(24, 87, 147, 1)',
        right : 70
    
        


    }

})

export default TextInputSearch