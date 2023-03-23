import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,FlatList,Button,Platform,Alert,KeyboardAvoidingView, KeyboardAvoidingViewBase,Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {AddTodo} from '../actions/Action';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import { timezone } from 'expo-localization';


Notifications.setNotificationHandler({
    handleNotification: async () => {
    return {
        shouldShowAlert:true,
        shouldPlaySound:true,
        shouldSetBadge:true
    };
    },
});


const  NewTask = (props) => {

    const navigation=useNavigation();
    useEffect(() => {
        let {status} = Notifications.getPermissionsAsync();
        if(status!=='granted')
        {
            status =  Notifications.requestPermissionsAsync();
        
        }
        if(status!=='granted')
        {
            return;
        }
    }, []);

    const [EnteredTask,setEnteredTask]= useState('');
    const [TaskItem,setTaskItem]=useState([]);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const data = useSelector(state => state);
    const todos = data.todos.todos;
    const dispatch = useDispatch();


    const onChangeIos = (event, selectedValue) => {
        setShow(Platform.OS !== 'ios');
        if (mode == 'date') 
            {
            const currentDate = selectedValue || new Date();
            setDate(currentDate);
            setMode('time');
            var dateText = currentDate.getDate() + "/" + (currentDate.getMonth()+1)+"/"+(1900+currentDate.getYear());
            setDateValue(dateText);
            setShow(Platform.OS === 'ios'); // to show time
            }
        else {
        const selectedTime = selectedValue || new Date();
        setTime(selectedTime);
        let am_pm,hour,minute=(selectedTime.getMinutes());
        if(selectedTime.getHours()===0) hour=12;
            else if(selectedTime.getHours()>12) hour=selectedTime.getHours()-12;
            else hour=selectedTime.getHours();
            
            if(selectedTime.getHours()>11) am_pm='PM';
            else am_pm='AM';

            let timeText = hour+":"+(
                (minute<10)?("0"+minute):minute)+" "+am_pm;
        setTimeValue(timeText);
        setShow(Platform.OS !== 'ios'); // to hide back the picker
        setMode('date'); // defaulting to date for next open
        }
    };

    const onChange = (event, selectedValue) => {
        setShow(Platform.OS==='ios');
        if (mode == 'date') {
            if(event.type == "set")
            {
                const currentDate = selectedValue || date;
                setDate(currentDate);
                var dateText = currentDate.getDate() + "/" + (currentDate.getMonth()+1)+"/"+(1900+currentDate.getYear());
                setDateValue(dateText);
            }
            else 
            {
                return null;
            }
        } 
        else {
            if(event.type == "set")
                {
                const selectedTime = selectedValue || time;
                let am_pm,hour,minute=(selectedTime.getMinutes());

                if(selectedTime.getHours()===0) hour=12;
                else if(selectedTime.getHours()>12) hour=selectedTime.getHours()-12;
                else hour=selectedTime.getHours();
                
                if(selectedTime.getHours()>11) am_pm='PM';
                else am_pm='AM';

                let timeText = hour+":"+(
                    (minute<10)?("0"+minute):minute)+" "+am_pm;
                setTime(selectedTime);
                setTimeValue(timeText);
            }
            else 
                {
                    return null;
                }
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
    showMode('date');
    };

    const showTimepicker = () => {
    showMode('time');
    };

    const alertDate = () => {
        Alert.alert("Task is missing!!");
    }

    const taskInputHandler = (enteredText) => 
    {
        setEnteredTask(enteredText);
    }

    const triggerNotificationHandler = () => {
        var date = dateValue;
        console.log("date value")
        var newdate = date.split("/").reverse().join("-");
        var momentObj = moment(newdate + timeValue, 'YYYY-MM-DDLT');
        var d = new Date(momentObj);
        console.log(d)
        var o = d.getTime()
        console.log(o)
        console.log("hiii")
        console.log(new Date().getTime())

        Notifications.scheduleNotificationAsync({
        content: {
            title: EnteredTask,
            body: dateValue ,
            sound: 'mySoundFile.wav', 
            color:"blue",

        },
        trigger: 
        {
            date: o + 3000
            
        },
        });
    };



    const addTaskHandler = () => {
        console.log("hii ishaaa")
        console.log(EnteredTask)
        let condition = false;
        const r= todos.forEach(element => {
            if(element.task == EnteredTask){
                condition = true;
            }
        })

        if (todos && !condition && EnteredTask!='') {
            if(todos.length >= 1){
                let LastId = todos[todos.length - 1]
                let newId = LastId.id + 1;
                dispatch(AddTodo({
                    id: newId,
                    task: EnteredTask,
                    Date:  dateValue,
                    Time:  timeValue
                }));
            }else{
                let newId =  1;
                dispatch(AddTodo({
                    id: newId,
                    task: EnteredTask,
                    Date:  dateValue,
                    Time:  timeValue
                }));
            }
    
        // console.log(todos)
        navigation.navigate('TaskSearch') 
        alert("Task Added Successfully")

        taskInputHandler('');
        } else {
        alert(`${EnteredTask} Already added in Todo List or todo is empty`);
        }
        };

    return(
        
        <View style={styles.inputcontainer}>
            
            <Text style={{fontSize:20,color:'rgba(85, 168, 224, 1)',fontWeight:"bold"}}>What is to be done?</Text>
            <View style={styles.inputfield}>
                <TextInput
                    style={styles.bottomText}
                    placeholder='Enter Task Here' 
                    placeholderTextColor='white'
                    autoFocus={true}
                    value={EnteredTask}
                    onChangeText = {taskInputHandler}
                />
                {/* <TouchableOpacity onPress={addTaskHandler} > */}
                <Image 
                    source={require('../assets/mic.png')} 
                    style={styles.ImageIconStyle} 
                />
                {/* </TouchableOpacity> */}

            

            </View>
            <Text style={{fontSize:20,color:'rgba(85, 168, 224, 1)',margin:5,fontWeight:"bold",paddingTop:10}}>Due Date</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                <TextInput
                        placeholder='Date not set'
                        placeholderTextColor='white'
                        style={styles.bottomText}
                        onFocus={showDatepicker}
                        value={dateValue}
                />
                <TouchableOpacity onPress={showDatepicker} >
                    <Image 
                        source={require('../assets/calender.png')} 
                        style={styles.ImageIconStyle} 
                    />
                </TouchableOpacity> 

            </View>    

            {(dateValue!=='') && (
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <TextInput
                        placeholder='Time not set'
                        placeholderTextColor='white'
                        style={styles.bottomText}
                        onFocus={(dateValue!=='')?showTimepicker:alertDate}
                        value={timeValue}
                    />

                    <TouchableOpacity onPress={(dateValue!=='')?showTimepicker:alertDate} >
                        <Image 
                            source={require('../assets/watch.png')} 
                            style={styles.ImageIconStyle} 
                        />
                    </TouchableOpacity> 
            </View>
            )}
        
            {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={(mode==='date')?date:time}
                        mode={mode}
                        display="default"
                        onChange={(Platform.OS==='ios')?onChangeIos:onChange}
                    />
                )}

                <TouchableOpacity onPress={triggerNotificationHandler} >

                <Text style={{color :'rgba(85, 168, 224, 1)',

                fontSize: 20,textDecorationLine :'underline'}}>Notifications</Text>

                </TouchableOpacity>
                <Text style={{color:"white",paddingTop:5}}>No Notifications if date not set</Text>
                
                
                <TouchableOpacity style={styles.addButton} onPress={addTaskHandler}>
    
                <Image 
                    source={require('../assets/check.png')} 
                    style={styles.ImageIconStyle} 
                />
                </TouchableOpacity> 
        </View>
    )
    }

const styles = StyleSheet.create({
inputcontainer:{ 
    backgroundColor:"rgba(24, 87, 147, 1)",
    flex:1,
    padding:50,
},
inputfield:{
    flexDirection:'row',justifyContent:'space-between',padding:5

},

addText:{
    
    height: 110, 
    color: 'white', 
    fontSize: 13 ,
    paddingLeft:20,
    paddingTop:10
},

buttonContainer:{
    backgroundColor:'#f7c744',
    paddingVertical:15,
    padding:15,
    width:'120%',
    borderColor: '#dadae8',
    borderWidth: 1,
    borderRadius:15,
    marginVertical:10
},
bottomText:{
    height: 60, 
    color: 'white', 
    fontSize: 20 ,
    width: '90%',
    borderColor: 'rgba(85, 168, 224, 1)',
    borderBottomWidth : 3,    
    backgroundColor : 'rgba(24, 87, 147, 1)',
    
},
addButton:{
    position:'absolute',
    zIndex:11,
    right:20,
    bottom:130,
    backgroundColor:'#ffffff',
    width:90,
    height:90,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    elevation:8,

},
ImageIconStyle: {
    padding: 25,
    margin: 2,
    height: 10,
    width: 30,
    margin:10,
    resizeMode : 'stretch'
    
    },
addButtonText:{
    color:'#4682b4',
    fontSize:70,
    paddingBottom:20
},
listItem:{
    padding:10,
    backgroundColor:'#ccc',
    borderColor:'black',
    borderWidth:1,
    marginVertical:10
}
})


export default NewTask