import { NavigationContainer } from '@react-navigation/native'
import React,{useEffect, useState} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,TextInput,Button, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

//const userInfo = {email: 'isha',password:123}

const Login = () =>{
const navigation=useNavigation();
useEffect( () =>{
    AsyncStorage.getItem("UserData").then(valuen => {
                    
        if (valuen !== null ) {
            try{
                var value= JSON.parse(valuen);
                // console.log(value)
                if(value.isLoggedin === '1'){
                    navigation.navigate("TaskSearch")
                    // alert("already loged in")
                }
            }catch(error){
                console.log(error)
            }
            
            }
    })
});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValidError, setEmailValidError] = useState('');
    const [passwordValidError, setPasswordValidError] = useState('');



    const handleValidEmail = val => {
        
        if (val.length === 0) {
        setEmailValidError('* email address must be entered');
        } 
        
        else  {
        setEmailValidError('');
        }
    };
    const handleValidPassword = val => {
        
        if (val.length === 0) {
        setPasswordValidError('* password must be enter');
        }  else  {
        setPasswordValidError('');
        }
    };


    const setData = async() => {
        

        if((email === '' && password === '') || email === '' || password === ''){
            alert('email password required')
            return;
        }else{

        await AsyncStorage.getItem("UserDatadb").then(value => {
        
        if (value !== null && email !== '' && password !== '') {
            try{
                var updatedData = JSON.parse(value)
                var userD =  updatedData.find(key =>  key.email === email && key.password === password )
                if (userD) {
                    var user= {
                        email: userD.email,
                        password: userD.password,
                        token : userD.token,
                        isLoggedin:'1'
                    }
                    AsyncStorage.setItem('UserData',JSON.stringify(user));
                    //AsyncStorage.setItem("isLoggedIn",'1')
                    alert("Login successfull");
                    navigation.navigate('TaskSearch')
                }
                else{
                    alert("Username Password Incorrect")
                    // AsyncStorage.setItem("isLoggedIn",0)

                    navigation.navigate('Login')
                }
            // });

            }catch(error){
                console.log(error)
            }
            
            }else{
                alert("No Data available")
            }
        })
    }
    

    }
return(
    <View style={styles.inputcontainer}>
        
        <TextInput
            style={styles.input}
            value={email}
            placeholder={"Email"}
            textAlign="center"
            placeholderTextColor = "#d3d3d3"
            // onChangeText={(text) => setEmail(text)}
            onChangeText={value => {setEmail(value);handleValidEmail(value); }}
            autoCapitalize={"none"}
            keyboardType='email-address'
        />

{emailValidError ? <Text style={{color:"red"}}>{emailValidError}</Text> : null}

        
        <TextInput
            style={styles.input}
            value={password}
            textAlign="center"
            placeholder={"Password"}
            placeholderTextColor = "#d3d3d3"
            keyboardType="default"
            secureTextEntry
            onChangeText={value => {setPassword(value);handleValidPassword(value);}}

            
            // onChangeText={(text) => setPassword(text)}
        />
        {passwordValidError ? <Text style={{color:"red"}}>{passwordValidError}</Text> : null}


        <TouchableOpacity style={styles.buttonContainer} 
        // onPress={()=> navigation.navigate('ViewList')}
        onPress = {setData}
        >
            <Text style={{color:'#ffff',fontSize:18}}>Login</Text>

        </TouchableOpacity>
        
        <View style={{flex:1,
                flexDirection:'row',
                justifyContent:'space-evenly',
                paddingTop:20
                
        }}>
        
        <TouchableOpacity>
            <Text style={{color:'#ffff',fontSize:18}}>forget password</Text>
        </TouchableOpacity>

        <Text style={{color:"#ffff",paddingLeft:20,fontSize:18}}>|</Text>

        <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
            <Text style={{color:'#ffff',paddingLeft:20,fontSize:18}}>Register</Text>
        </TouchableOpacity>

        </View>

    </View>
    
)
}



const styles = StyleSheet.create({
    inputcontainer:{ 
        backgroundColor:"rgba(24, 87, 147, 1)",
        flex:1,
        alignItems:'center',
        padding:100,
        paddingTop:300  
    },
    input:{
        
        borderColor: '#dadae8',
        borderWidth: 1,
        color:'#d3d3d3',  
        backgroundColor:'rgba(16, 58, 132, 1)',
        width:'140%',
        padding:15,
        borderRadius:15,
        marginVertical:10,
        fontSize:18
        
    },
    buttonContainer:{
        backgroundColor:'#rgba(16, 95, 132, 1)',
        paddingVertical:15,
        padding:15,
        width:'140%',
        borderColor: '#dadae8',
        borderWidth: 1,
        borderRadius:15,
        marginVertical:10,
        alignItems:'center',
        
    }
})

export default Login