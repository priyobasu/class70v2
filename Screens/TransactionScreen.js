//class 68
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Constants from 'expo-constants';

import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";

export default class TransactionScreen extends React.Component{
constructor(){
  super();
  this.state={
  hasCameraPermissions:null,
  scanned:false,
  scannedBookId:'',
  scannedStudentId:'',
  buttonState:'normal',
  }
}
handleBarCodeScanned= async({type,data})=>{
const {buttonState} =this.state
if (buttonState === "studentId"){
  this.setState({
  scanned:true,
  scannedStudentId:data,
  buttonState:'normal',
  })
} else if (buttonState === "booktId"){
    this.setState({
  scanned:true,
  scannedBookId:data,
  buttonState:'normal',
  })
}

}
getCameraPermissions= async(id)=>{
  const {status}= await Permissions.askAsync(Permissions.CAMERA);
  this.setState({
  //status === granted is true when the user has granted permission
  //status === granted is false when the user has not granted permission
  hasCameraPermissions: status === "granted",
  buttonState:id,
  scanned:false
  })
}
  render(){
  const hasCameraPermissions= this.state.hasCameraPermissions
  const scanned= this.state.scanned
  const buttonState= this.state.buttonState

  if(buttonState !== 'normal' && hasCameraPermissions){
  return(
  <BarCodeScanner onBarCodeScanned={
  scanned ? undefined: this.handleBarCodeScanned
  }
  style={StyleSheet.absoluteFillObject}
  />
  );
  } 
  else if(buttonState === 'normal'){
      return (
    <View style={styles.searched}>
    <View>
<Image
source={require("../assets/booklogo.jpg")}
style={{width:200,height:200, marginBottom:150}}/>

<Text style={{fontFamily:"bold",
fontSize:90,
color:"#4CABA3",
marginBottom:20,
paddingTop:5}}>
WILY
</Text>
    </View>

<View style={{flexDirection:"row"}}>
<TextInput 
style={{borderBottomWidth:10,
borderWidth:2,
borderColor:"#4CABA3",
width:190,
borderRadius:200,
height:60}}

value={this.state.scannedBookId}

placeholder="Book Id"
/>

<TouchableOpacity
style={{borderBottomWidth:10,
borderWidth:2,
borderColor:"#4CABA3",
width:120,
borderRadius:200,
height:60}}
onPress={()=>{this.getCameraPermissions("bookId")}}>
< Text style={{fontFamily:"bold",
fontSize:20,
color:"#4CABA3",
textAlign:"center",
}}>
Scan
</ Text>
</TouchableOpacity>
</View>

<View style={{flexDirection:"row"}}>
<TextInput 
style={{borderBottomWidth:10,
borderWidth:2,
borderColor:"#4CABA3",
width:190,
borderRadius:200,
height:60}}

value={this.state.scannedStudentId}
placeholder="Student Id"
/>

<TouchableOpacity
style={{borderBottomWidth:10,
borderWidth:2,
borderColor:"#4CABA3",
width:120,
borderRadius:200,
height:60}}
onPress={()=>{this.getCameraPermissions("studentId")}}>
< Text style={{fontFamily:"bold",
fontSize:20,
color:"#4CABA3",
textAlign:"center",
}}>
Scan
</ Text>
</TouchableOpacity>
</View>
    </View>
  );}
}
  }

const styles = StyleSheet.create({
searched:{
flex:1,
justifyContent:"center",
alignItems:"center",
},
scaning:{
backgroundColor:"lightblue",
borderRadius:20,
width:200,
height:90,
},

})

