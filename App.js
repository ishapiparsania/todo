import  React,{useEffect} from 'react';
import { View, Text,Button,Image,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Splash from './Screens/Splash';
import ViewList from './Screens/ViewList';
import NewTask from './Screens/NewTask';
import {Provider} from 'react-redux';
import reduxStore from './store/reduxStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react';
import EditTask from './Screens/EditTask';
import * as Permissions from 'expo-permissions';
import LogOut from './components/LogOut';
import { useNavigation } from '@react-navigation/native'
import TaskSearch from './Screens/TaskSearch';
import Search from './components/Search';
import TextInputSearch from './components/TextInputSearch';


// import { TouchableOpacity } from 'react-native-web';


const Stack = createNativeStackNavigator();


export default function App() {
 
  const {store,persistor}=reduxStore();
  

 
return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    
    <NavigationContainer>
    <Stack.Navigator>
    
    <Stack.Screen 
    name="Login" 
    component={Login} 
    options={{ headerShown: false }}
    />

<Stack.Screen 
    name="Register" 
    component={Register} 
    options={{
    //headerLeft: ()=> null,
    title:'',
     headerBackTitle: 'Login',
    headerStyle: {
    backgroundColor: 'rgba(28, 128, 193, 0.87)'
    
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:20,
    },
    }
    } 
    />
    
    <Stack.Screen 
    name="Splash" 
    component={Splash} 
    options={{ headerShown: false }}
    />

<Stack.Screen 
    name="ViewList" 
    component={ViewList} 
    options={{ 
    // headerShown:false,
    title: 'ALL LISTS',
    headerBackVisible:false,
    
    
    headerRight: ()=> (null,<View 
     style={{right: 60,top: 7}}
    >
      <Search/>
      </View>
      ),
      headerLeft: ()=> (null,<View style={{right: 60,top: 7}}>
      <LogOut/>
      </View>
      
      ),
    headerStyle: {
    backgroundColor: 'rgba(28, 128, 193, 0.87)'
    },
    // headerLeft: ()=> null,
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold',fontSize:20,
    },

    }}
    />

<Stack.Screen 
    name="TaskSearch" 
    component={TaskSearch} 
    options={{ 
    title: 'ALL LISTS',
    headerShown:false,
    // headerBackTitle:"back",
    headerBackVisible:false,
    headerLeft: ()=> (null,<View style={{right: 60,top: 7}}>
      <LogOut/>
      </View>
      
      ),
    headerStyle: {
    backgroundColor: 'rgba(28, 128, 193, 0.87)'
    },
    
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold',fontSize:20,
    },

    }}
    />

<Stack.Screen 
    name="NewTask" 
    component={NewTask} 
    options={{ 
    title: 'New Task ' ,
    headerBackTitleVisible: false,
    headerStyle: {
    backgroundColor: 'rgba(28, 128, 193, 0.87)'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold',fontSize:20
    },
    }}

    />

<Stack.Screen 
    name="EditTask" 
    component={EditTask} 
    //options={{ headerShown: false }}
    options={{ 
    title: 'Edit Task ' ,
    headerBackTitleVisible: false,
    headerStyle: {
    backgroundColor: 'rgba(28, 128, 193, 0.87)'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold',fontSize:20
    },
    }}

    />

     
     
     </Stack.Navigator>


  
    </NavigationContainer>
    </PersistGate>
    
  </Provider>

);
}
