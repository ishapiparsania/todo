import React from "react";
import {View, Text, TouchableOpacity, StyleSheet,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const Search=()=>{
const navigation= useNavigation();



const SearchHandler = () => {
    
    
    navigation.navigate('TaskSearch')
    
    }



    return(
        <TouchableOpacity onPress={SearchHandler} >
       
       <Image source={require('../assets/search.png')} 
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

export default Search