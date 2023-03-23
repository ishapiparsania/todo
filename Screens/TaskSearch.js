    import { NavigationContainer } from '@react-navigation/native'
    import React,{useEffect, useState} from 'react'
    import {FlatList,View,Text,TouchableOpacity,StyleSheet,TextInput,Button,Image,SafeAreaView,ScrollView,LogBox} from 'react-native'
    import { useNavigation } from '@react-navigation/native'
    import AsyncStorage from '@react-native-async-storage/async-storage'
    import {useDispatch, useSelector} from 'react-redux';
    import {AddTodo, RemoveTodo} from '../actions/Action';
    import RenderIf from '../components/RenderIf'
    import { Appbar,Searchbar } from 'react-native-paper';
    import LogOut from '../components/LogOut'

    import moment from 'moment';

    const TaskSearch = (props) =>{
    const navigation=useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [search,setSearch]=useState()
    const [EnteredTask,setEnteredTask]= useState('');
    const [status,setStatus]=useState(false);
    const toggleStatus=()=>{setStatus(!status)}


    const dispatch = useDispatch();
    const data = useSelector(state => state);
    const todos = data.todos.todos;
    const ntodo = data.todos
    const [masterData,setmasterData] = useState(todos);
    const [filteredData,setFilteredData]=useState(todos);
    const [weekArray, setWeekArray]= useState([]);
    const [otherweekArray, setOtherWeekArray]= useState([]);
    const [todayArray, setTodayArray]= useState([]);
    const [tomorrowArray, setTomorrowArray]= useState([]);
    const today = moment();
    const tomorrow  = moment().add(1,'days');
    const todayD = today.format('DD/MM/YYYY')
    const tomorrowD = tomorrow.format('DD/MM/YYYY')
    const from_date = today.clone().startOf('week');
    const to_date = today.clone().endOf('week');
    const fromD = from_date.format('DD/MM/YYYY');
    const toD = to_date.format('DD/MM/YYYY')
    console.log("date here")
    console.log(fromD)
    console.log(toD)
    

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


    useEffect( () => {
        let o = [];
        let Tweek = [];
        let tom = [];
        let tod = [];
        todos.filter((item) => {
            if(item.Date === todayD){
                tod.push(item)
                }
                else if(item.Date === tomorrowD){
                    tom.push(item)
                
                }
                else if(item.Date >= fromD && item.Date <= toD){
                    console.log("in this week")
                    console.log(item.Date)
                    Tweek.push(item)
        
                }else{
                    console.log("other week")
                    console.log(item.Date)

                    o.push(item)
                
                }
        })

        setOtherWeekArray(o)
        setTodayArray(tod)
        setTomorrowArray(tom)
        setWeekArray(Tweek)
        setFilteredData([])
    },[todos ,ntodo])

    const removeSearch= () => {
        todos.filter((item) => {
            if(item.Date === todayD){
                todayArray.push(item)
                }
                else if(item.Date === tomorrowD){
                    tomorrowArray.push(item)
                
                }
                else if(item.Date >= fromD && item.Date <= toD){
                    weekArray.push(item)
        
                }else{
                    otherweekArray.push(item)
                
                }
        })
        setFilteredData([]);
        setWeekArray(weekArray);
        setTodayArray(todayArray);
        setOtherWeekArray(otherweekArray);
        setTomorrowArray(tomorrowArray);
    }
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
        console.log("in search")
        console.log(text);
        if(text){
            const newData=todos.filter((item)=>{
            const itemData=item.task? item.task.toUpperCase() : ''.toUpperCase();
            const textData=text.toUpperCase();
            return  itemData.indexOf(textData)>-1
    
        });
        setFilteredData(newData)
        setWeekArray([]);
        setTomorrowArray([]);
        setOtherWeekArray([]);
        setTodayArray([]);
        setSearch(text);   
        }
        else{
            todos.filter((item) => {
                if(item.Date === todayD){
                    todayArray.push(item)
                    }
                    else if(item.Date === tomorrowD){
                        tomorrowArray.push(item)
                    
                    }
                    else if(item.Date >= fromD && item.Date <= toD){
                        weekArray.push(item)
            
                    }else{
                        otherweekArray.push(item)
                    
                    }
            })
            setFilteredData([]);
            setWeekArray(weekArray);
            setTodayArray(todayArray);
            setOtherWeekArray(otherweekArray);
            setTomorrowArray(tomorrowArray);
            setSearch(text);
        }
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
    {/* <ScrollView> */}

    <View style={{paddingTop:2}}>
    <FlatList
        keyExtractor={(item,index)=>index.toString()}
        
        data={filteredData}
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

    (todayArray=='') ? null : <Text style={{color:'rgba(85, 168, 224, 1)', fontSize:20,fontWeight:"bold",paddingTop:20,paddingLeft:15}}>Today</Text>

    }

    <View style={{paddingTop:2}}>

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

    (tomorrowArray=='') ? null : <Text style={{color:'rgba(85, 168, 224, 1)', fontSize:20,fontWeight:"bold",paddingTop:15,paddingLeft:15}}>Tomorrow</Text>

    }

    <View style={{paddingTop:2}}>

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

    (weekArray=='') ? null : <Text style={{color:'rgba(85, 168, 224, 1)', fontSize:20,fontWeight:"bold",paddingTop:15,paddingLeft:15}}>This week</Text>

    }
    <View style={{paddingTop:2}}>
        
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

    (otherweekArray=='') ? null : <Text style={{color:'rgba(85, 168, 224, 1)', fontSize:20,paddingTop:15,fontWeight:"bold",paddingLeft:15}}>Others</Text>

    }
    <View style={{paddingTop:2}}>

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

    {/* </ScrollView> */}

    </View>

    );
    };
    return (

    <View style={styles.main}>
    <View style={{justifyContent:"space-around",flexDirection:"row"}}>
    </View>
    <Appbar.Header style={{backgroundColor:"rgba(85, 168, 224, 1)"}}>
        <Appbar.Action icon='logout' color="white" onPress={LogoutHandler} />

        <Appbar.Content title="ALL LISTS"  color='white'  />
        {RenderIf(status)( 
            <TextInput style={styles.input1}
            placeholder="Search here"
            placeholderTextColor={"white"}
            
                onChangeText={(text)=>searchFilter(text)}
                value={search}
            />  
            )}
        <Appbar.Action icon="magnify" color='white' position='fixed' onPress={()=>toggleStatus()}/>
        </Appbar.Header>

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

        input1:{
            width:'70%',
            right:70,
            backgroundColor:'rgba(85, 168, 224, 1)',
            height:20,
            fontSize:20,
            color:'white',
            
        },


        listItem:{
        padding:3,
        backgroundColor:'rgba(85, 168, 224, 1)',
        flexDirection:"row",
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
            ImageStyle1: {
                height : 35,
                width : 35,
                marginLeft : 90,
                top:20,
                right:20
        
            }

    })

    export default TaskSearch

