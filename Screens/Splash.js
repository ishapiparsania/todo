// import React,{useState,Component} from 'react'
// import {View,Text,TouchableOpacity,StyleSheet,TextInput,Button} from 'react-native'
import React,{useEffect, useState} from 'react'
import {FlatList,View,Text,TouchableOpacity,StyleSheet,TextInput,Button,Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'

const Splash = (props) =>{
    const navigation=useNavigation();
    // console.log(props)
    const {route} = props
    if(props.route.params){
        const newD = route.params.taskData;

        const {taskData} = props.route.params
        const deleteCurrent = (key) => {
// const taskData = props.route.params
        }
        console.log(taskData)
        return(
            <View > 
            <Text> {JSON.stringify(route.params.taskData)} </Text>

                <FlatList 
            data = {taskData}
                    keyExtractor={(item) =>item.id}
                    
                    renderItem={({item})=>
                        <ListItem
                        title={item.value}
                        bottomDivider
            rightIcon={<Icon
              name='delete'
              size={36}
              onPress={() => deleteCurrent(item.id)} />
                    }
                        />
                    
                    }
                
                /> 
        </View>
           
        )
        
    }
}

const styles = StyleSheet.create({
    inputcontainer:{ 
        backgroundColor:"#4682b4",
        flex:1,
        alignItems:'center',
        padding:100,
        
    }
})
export default Splash

