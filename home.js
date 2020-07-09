import React, { Component, useState, useEffect } from 'react';
import {StyleSheet,View,Image,Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { getimages } from '../firebase/Firebaseapi';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Resultbox from '../components/Resultbox';
import Activity from "./activity";

const home =  ({navigation})=>{
 const [sam,setsam]= useState([]);
 const [load,setload]=useState(true);
 useEffect(()=>{
  getimages(setsam,setload);
  },[]);

  

console.log("71827");


   return(  <View style= {{flex:1 , backgroundColor:"black"}}>
       {load ? <Activity /> : 
   <View style={styles.container}>
<FlatList
data={sam}
keyExtractor={(results) =>{return `${results.id}`}}
renderItem={({item})=>{
  
    return <TouchableOpacity onPress={()=>navigation.navigate("Home1" , {url :`${item.image}`})}>
    <Resultbox pass = {item.image} text={"Meme Templates"}/>
    </TouchableOpacity>
}}/>

       </View>}
       </View>
     );};

const styles = StyleSheet.create({

  container: {
    backgroundColor: Colors.black,
  },
 
});

export default home;
