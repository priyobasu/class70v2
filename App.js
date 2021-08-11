//class 68
import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';

import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";

import SearchScreen from "./Screens/SearchScreen";
import TransactionScreen from "./Screens/TransactionScreen";

export default class App extends React.Component{
  render(){
      return (
   
  <AppContainer/>
   
  );
}
  }

const TabNavigator=createBottomTabNavigator({
  TransactionScreen:{screen:TransactionScreen},
  SearchScreen:{screen:SearchScreen}


},
 {
defaultNavigationOptions:({navigation})=>({

  tabBarIcon:()=>{

const routeName=navigation.state.routeName

if(routeName==='TransactionScreen'){
  return(
  <Image source={ require('./assets/book.png')}
  style={{width:30,height:30}}
  />
  )
}

else if(routeName==='SearchScreen'){
  return(
    <Image source={require('./assets/searchingbook.png')}
    style={{width:30,height:30}}
    />
  )
}

  },
 
  
})

}
)


const AppContainer= createAppContainer(TabNavigator);
