import React,{useState} from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const validator = require('validator');

const Register = (props) => {
    const navigation=useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Id, setId] = useState('');
    const [Phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [Address, setAddress] = useState('');
    const [userPassword, setUserPassword] = useState('');
    
    const [passwordValidError, setPasswordValidError] = useState('');

    const [phoneValidError, setPhoneValidError] = useState('');
    const [pinValidError, setPinValidError] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    
    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (val.length === 0) {
        setEmailValidError('* email address must be enter');
        } else if (reg.test(val) === false) {
        setEmailValidError('* enter valid email address i.e  abc@gmail.com');
        } else if (reg.test(val) === true) {
        setEmailValidError('');
        }
    };


    const handleValidPassword = val => {
        let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (val.length === 0) {
        setPasswordValidError('* password must be enter');
        } else if (reg.test(val) === false) {
        setPasswordValidError('* enter valid password');
        } else if (reg.test(val) === true) {
        setPasswordValidError('');
        }
    };

    const handleValidNumber = val => {
        let reg = /^[0]?[789]\d{9}$/;
        if (val.length === 0) {
        setPhoneValidError('* phone number must be enter');
        } else if (reg.test(val) === false) {
        setPhoneValidError('* enter valid number');
        } else if (reg.test(val) === true) {
        setPhoneValidError('');
        }
    };


    const handleValidPin = val => {
        let reg = /^[1-9][0-9]{5}$/;
        if (val.length === 0) {
        setPinValidError('* pincode must be enter');
        } else if (reg.test(val) === false) {
        setPinValidError('* enter valid pincode');
        } else if (reg.test(val) === true) {
        setPinValidError('');
        }
    };

    const register = async() => {
        if(email !== '' && password !== '' && Id !== '' && Phone !=='' && pin !=='' && Address!=='' ){
            if(emailValidError === '' && phoneValidError===''){


            const arrayData = [];
            const userDetails = {
            email : email,
            password : password,
            id: Id,
            phone:Phone ,
            pin : pin,
            address : Address,
            token : Math.random()
        }
        arrayData.push(userDetails);
        try{
            AsyncStorage.getItem("UserDatadb").then(value => {
            if (value !== null) {
                const d = JSON.parse(value);
                d.push(userDetails);
                
                AsyncStorage.setItem("UserDatadb", JSON.stringify(d)).then(
                () => {
                    navigation.navigate('Login');
                    alert("Registered Successfully")
                }
                );
            } else {
                AsyncStorage.setItem(
                    "UserDatadb",
                    JSON.stringify(arrayData)
                ).then(() => {
                    navigation.navigate('Login')
                    alert("Registered Successfully")
                });
            }
            });
        }catch(error){
            console.log(error);

        }
        }else{
            alert('invalid data entered');
            return;
        }
    }else{  
            alert("Please enter data");
            return;
            }

        }

    return(
        // <View style={styles.inputcontainer}>
        <View style={{flex: 1, alignItems : 'center', justifyContent : 'center',backgroundColor : 'rgba(24, 87, 147, 1)'}}>
            
            <TextInput
                style={styles.input}
                value={Id}
                textAlign="center"
                placeholder={"User Id"}
                placeholderTextColor = "#d3d3d3"
                onChangeText={(text) => setId(text)}
                autoCapitalize={"none"}
            />
            <TextInput
                style={styles.input}
                value={password}
                textAlign="center"
                placeholder={"Password"}
                //maxLength={5}
                placeholderTextColor = "#d3d3d3"
                secureTextEntry
                onChangeText={value => {setPassword(value);handleValidPassword(value);}}
                //onChangeText={(text) => setPassword(text)}
                />

               {passwordValidError ? <Text style={{color:"red"}}>{passwordValidError}</Text> : null}

            <TextInput
                style={styles.input}
                value={email}
                textAlign="center"
                placeholder={"Email Id"}
                keyboardType='email-address'
                returnKeyType='next'
                placeholderTextColor = "#d3d3d3"
                onChangeText={value => {setEmail(value);handleValidEmail(value); }}
                autoCapitalize={"none"}
            />
            {emailValidError ? <Text style={{color:"red"}}>{emailValidError}</Text> : null}

            

            <TextInput
                style={styles.input}
                value={Phone}
                textAlign="center"
                placeholder={"Phone number"}
                keyboardType= "numeric"
                //validators={['required', 'isNumber','maxNumber:11']}
                maxLength={10}
                placeholderTextColor = "#d3d3d3"
                // onChangeText={(text) => setPhone(text)}
                onChangeText={value => {setPhone(value);handleValidNumber(value);}}
                autoCapitalize={"none"}

            />
            {phoneValidError ? <Text style={{color:"red"}}>{phoneValidError}</Text> : null}


            <TextInput
                style={styles.input}
                value={Address}
                textAlign="center"
                placeholder={"Address"}
                placeholderTextColor = "#d3d3d3"
                
                onChangeText={(text) => setAddress(text)}/>

            <TextInput
                style={styles.input}
                value={pin}
                textAlign="center"
                placeholder={"Pin Code"}
                placeholderTextColor = "#d3d3d3"
                onChangeText={value => {setPin(value);handleValidPin(value); }}
                // onChangeText={(text) => setPin(text)}
                />

            {pinValidError ? <Text style={{color:"red"}}>{pinValidError}</Text> : null}


            <TouchableOpacity style={styles.input1} onPress ={register} >
                <Text style={{color:'#ffff',fontSize:18,textAlign:'center'}}>Register</Text>

            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    inputcontainer:{ 
        backgroundColor:"rgba(24, 87, 147, 1)",
        flex:1,
        alignItems:'center',
        padding:100,
        
    },
    
    input:{
        width: '68%',
        color: '#d3d3d3',
        borderColor: 'white',
        borderWidth: 1,
        padding: 15,
        marginBottom: 15,
        borderRadius:15,
        backgroundColor : `rgba(16, 58, 132, 1)`,
        fontSize:18
    },

    input1:{
        width: '68%',
        borderColor: 'white',
        borderWidth: 1,
        padding: 15,
        marginBottom: 15,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomEndRadius : 10,
        borderBottomStartRadius : 10,
        backgroundColor : 'rgba(16, 95, 132, 1)'
    },
    buttonContainer:{
        backgroundColor:'rgba(16, 95, 132, 1)',
        paddingVertical:15,
        padding:15,
        width:'140%',
        borderColor: '#dadae8',
        borderWidth: 1,
        borderRadius:15,
        marginVertical:10,
        alignItems:'center'
    }
})


export default Register