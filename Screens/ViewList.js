import { NavigationContainer } from '@react-navigation/native'
import React,{useEffect, useState} from 'react'
import {FlatList,View,Text,TouchableOpacity,StyleSheet,TextInput,Button,Image,SafeAreaView,ScrollView,LogBox} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch, useSelector} from 'react-redux';
import {AddTodo, RemoveTodo} from '../actions/Action';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox, Icon } from 'react-native-elements';
import moment from 'moment';

const ViewList = (props) =>{
const navigation=useNavigation();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [token, setToken] = useState("");
const [taskData] = ''
const weekArray = []
const otherweekArray = []
const todayArray = []
const tomorrowArray = []
const [search,setSearch]=useState()
const [EnteredTask,setEnteredTask]= useState('');
const [check1, setCheck1] = useState(false);
const [filteredDataSource, setFilteredDataSource] = useState([]);
const dispatch = useDispatch();
const data = useSelector(state => state);
const todos = data.todos.todos;
const today = moment();
const tomorrow  = moment().add(1,'days');
const todayD = today.format('DD/MM/YYYY')
const tomorrowD = tomorrow.format('DD/MM/YYYY')
const from_date = today.clone().startOf('week');
const to_date = today.clone().endOf('week');
const fromD = from_date.format('DD/MM/YYYY');
const toD = to_date.format('DD/MM/YYYY')


let searchArray 
todos.filter((item) => {

if(item.Date === todayD){
todayArray.push(item)
}

else if(item.Date === tomorrowD){
    tomorrowArray.push(item)

}
else if(item.Date >= fromD && item.Date <= toD){
    weekArray.push(item)

}
else{
   
    otherweekArray.push(item)

}

weekArray.sort(function(a, b) {
a = a.Date.toString().split('/');
b = b.Date.toString().split('/');
return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
});

otherweekArray.sort(function(a, b) {
a = a.Date.toString().split('/');
b = b.Date.toString().split('/');
return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
});

})

const editfunction = (item) =>{
navigation.navigate("EditTask",item)
}

const removeTodo = item => {
const todoIndex = todos.indexOf(item);
if (todoIndex > -1) {
dispatch(RemoveTodo(item));
} 
else {
alert(`${EnteredTask} is not in the Todo List`);
}
};

const searchFilter=(text)=>{
    let array = [];
    todos.filter((item)=>{
    const itemData=item.task? item.task.toUpperCase() : ''.toUpperCase();
    const textData=text.toUpperCase();
    if(itemData.indexOf(textData)>-1){
        console.log("this is it")
         console.log(item)
         array.push(item)
    }
    

   console.log(array)
   searchArray = array
   setSearch(text)
   console.log(searchArray)
   
    });
    
    
    
}
 
const renderTodoList = () => {
    
try{
AsyncStorage.getItem('UserData').
then(value=>{
    if(value!=null){
        let user=JSON.parse(value)
        setEmail(user.email);
        setPassword(user.password);
        setToken(user.token)
    }
}) 
}catch (error){
console.log(error);
}

return (
<View> 
<View style={styles.inputfield}>
<TextInput
style={styles.bottomText}
placeholder='Search here'
placeholderTextColor='rgba(104, 158, 209, 0.9)'
autoFocus={true}
value={search}
onChangeText = {(text)=>searchFilter(text)}
/>
</View> 

{

(todayArray=='') ? null : <Text style={{color:'rgba(85, 168, 224, 1)', fontSize:20,fontWeight:"bold",paddingTop:30}}>Today</Text>

}
<View style={{paddingTop:10}}>
<FlatList
    keyExtractor={(item,index)=>index.toString()}
    
    data={todayArray}
    renderItem={({item}) => (
    <TouchableOpacity onPress={()=>editfunction(item)}>

    <View style={styles.listItem}>
    
    <TouchableOpacity style={styles.addrect} onPress={() => removeTodo(item)}/>
    <View style={{paddingLeft:30,paddingBottom:8}}>
        <Text style={{fontSize:20,color:"#fff",fontSize:25,fontWeight:"bold"}}>{item.task}</Text>
        <Text style={{fontSize:20,color:"rgba(24, 87, 147, 1)",fontSize:18,paddingTop:3,fontWeight:"600"}}>{item.Date}    {item.Time}</Text>
    </View>

    
    </View>
    </TouchableOpacity>
    )}
/> 
</View>

{

(tomorrowArray=='') ? null : <Text style={{color:'rgba(85, 168, 224, 1)', fontSize:20,fontWeight:"bold",paddingTop:30}}>Tomorrow</Text>

}
<View style={{paddingTop:10}}>
<FlatList
    keyExtractor={(item,index)=>index.toString()}
    
    data={tomorrowArray}
    renderItem={({item}) => (
    <TouchableOpacity onPress={()=>editfunction(item)}>

    <View style={styles.listItem}>
    
    <TouchableOpacity style={styles.addrect} onPress={() => removeTodo(item)}/>
    <View style={{paddingLeft:30,paddingBottom:8}}>
        <Text style={{fontSize:20,color:"#fff",fontSize:25,fontWeight:"bold"}}>{item.task}</Text>
        <Text style={{fontSize:20,color:"rgba(24, 87, 147, 1)",fontSize:18,paddingTop:3,fontWeight:"600"}}>{item.Date}    {item.Time}</Text>
    </View>

    
    </View>
    </TouchableOpacity>
    )}
/> 
</View>

 

{

(weekArray=='') ? null : <Text style={{color:'rgba(85, 168, 224, 1)', fontSize:20,fontWeight:"bold",paddingTop:30}}>This week</Text>

}
<View style={{paddingTop:10}}>
<FlatList
    keyExtractor={(item,index)=>index.toString()}
    
    data={weekArray}
    renderItem={({item}) => (
    <TouchableOpacity onPress={()=>editfunction(item)}>

    <View style={styles.listItem}>
    
    <TouchableOpacity style={styles.addrect} onPress={() => removeTodo(item)}/>
    <View style={{paddingLeft:30,paddingBottom:8}}>
        <Text style={{fontSize:20,color:"#fff",fontSize:25,fontWeight:"bold"}}>{item.task}</Text>
        <Text style={{fontSize:20,color:"rgba(24, 87, 147, 1)",fontSize:18,paddingTop:3,fontWeight:"600"}}>{item.Date}    {item.Time}</Text>
    </View>

    
    </View>
    </TouchableOpacity>
    )}
/> 
</View>

{

(otherweekArray=='') ? null : <Text style={{color:'rgba(85, 168, 224, 1)', fontSize:20,paddingTop:30,fontWeight:"bold"}}>Others</Text>

}

<View style={{paddingTop:10}}>
<FlatList
    keyExtractor={(item,index)=>index.toString()}
    
    data={otherweekArray}
    renderItem={({item}) => (
    <TouchableOpacity onPress={()=>editfunction(item)}>

    <View style={styles.listItem}>
   
    
    <TouchableOpacity style={styles.addrect} onPress={() => removeTodo(item)}/>
    
    <View style={{paddingLeft:30,paddingBottom:8}}>
        
    <Text style={{fontSize:20,color:"#fff",fontSize:25,fontWeight:"bold"}}>{item.task}</Text>
    <Text style={{fontSize:20,color:"rgba(24, 87, 147, 1)",fontSize:18,paddingTop:3,fontWeight:"600"}}>{item.Date}    {item.Time}</Text>
    </View>
    </View>
    </TouchableOpacity>
    )}
/> 
</View>


<View>
</View>
</View>

);
};
return (

<View style={styles.main}>
<View style={{justifyContent:"space-around",flexDirection:"row"}}>
</View>

{renderTodoList()}


<TouchableOpacity style={styles.addButton} onPress={()=> props.navigation.navigate('NewTask')}>
<Text style={{fontSize: 80,
color : 'rgba(85, 168, 224, 1)',
justifyContent:'center',
alignItems:'center' ,
left : 15,
bottom: 15}}>+</Text>
</TouchableOpacity>
</View>
);
}

const styles = StyleSheet.create({


    listItem:{
    padding:3,
    backgroundColor:'rgba(85, 168, 224, 1)',
    flexDirection:"row",
    //  justifyContent:"space-between",
     paddingTop:10,
     paddingBottom:0,
     paddingLeft:15,

   
    elevation: 5,
    borderColor:'rgba(85, 168, 224, 1)',
    borderWidth:0,
    marginVertical:10,
    borderTopLeftRadius : 15,
    borderTopRightRadius : 15,
    borderBottomEndRadius : 15,
    borderBottomStartRadius : 15,
    marginRight:10,
    marginLeft:10,
    flexGrow: 0
    },

    main: {
    flex:1,
    backgroundColor:"rgba(24, 87, 147, 1)",

    },

    ImageIconStyle: {
    padding: 25,
    margin: 2,
    height: 10,
    width: 30,
    margin:10,
    resizeMode : 'stretch'

    },
    ImageIcon: {
        padding: 15,
        margin: 2,
        height: 3,
        width: 20,
        margin:5,
        resizeMode : 'stretch',
        backgroundColor:"white"
        
        },


    addButton:{
        bottom:50,
        position:'absolute',
        backgroundColor: "white",
        width:80,
        height: 80,
        borderRadius:50,
        marginLeft :310,
    
    },
    addrect:{
        width: 10 * 2,
        height: 20,
        backgroundColor: "rgba(85, 168, 224, 1)",
        borderColor:"white",
        borderWidth:3,
        borderRadius:2,
        paddingTop:10
    },
    bottomText:{

        height: 60,
        
        color: 'white',
        
        fontSize: 18 ,
        
        width: '95%',
        
        borderColor: 'rgba(85, 168, 224, 1)',
        
        borderBottomWidth : 3,
        
        backgroundColor : 'rgba(24, 87, 147, 1)',
        
    
        
        
        
        },

})

export default ViewList

