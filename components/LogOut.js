import React from "react";
import {View, Text, TouchableOpacity, StyleSheet,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const LogOut=()=>{

    const navigation= useNavigation();



const LogoutHandler = async() => {
    const value = await AsyncStorage.getItem('UserData');
    if(value){
        var user2={
            isLoggedin:'0'
        }
        
        AsyncStorage.setItem('UserData',JSON.stringify(user2));
    }
    
    navigation.navigate('Login')
    
    }



    return(
        <TouchableOpacity onPress={LogoutHandler} >
       
                        <Image source={require('../assets/logout.png')} 
                            style={styles.ImageStyle1} /> 
    </TouchableOpacity> 
    )
}

const styles =StyleSheet.create({
    ImageStyle1: {
        bottom: 10,
        height : 27,
        width : 27,
        marginLeft : 90


    }

})

export default LogOut