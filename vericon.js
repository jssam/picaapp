import React, { useState} from "react";
import{Text,StyleSheet,View, Button,Image} from "react-native";
import ImagePicker from 'react-native-image-picker';
import {TouchableOpacity } from "react-native-gesture-handler";
import { uploadImage} from "../firebase/Firebaseapi";
import { vertical } from "../firebase/Meme";
import Activity from "./activity";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const vericon =  ({navigation})=>{

  const [selectedImage, setSelectedImage] = useState("https://firebasestorage.googleapis.com/v0/b/picameme-3c3a9.appspot.com/o/appassets%2Ftaptoget.jpg?alt=media&token=7aec62f4-12ff-4936-a596-33c573ba67e9");
  const [selectedImagetwo, setSelectedImagetwo] = useState("https://firebasestorage.googleapis.com/v0/b/picameme-3c3a9.appspot.com/o/appassets%2Ftaptoget.jpg?alt=media&token=7aec62f4-12ff-4936-a596-33c573ba67e9");
  const [ImageUrl, setImageUrl] = useState("");
  const [ImageUrltwo, setImageUrltwo] = useState("");
  const [load,setload]=useState(false);
 
 
 pickImageHandler = (uploadImage,setload) => {
    ImagePicker.launchImageLibrary({ title: 'Pick an Image', maxWidth: 500, maxHeight: 400 },
      response => {
        if (response.error) {
          alert('please choose image from gallery')
        } else {
          console.log("Image: " + response.uri)
          setSelectedImage(response.uri);
          const selectimage1 = response.uri
          try{uploadImage(selectimage1,setImageUrl,setload);}catch(err){alert('no internet')}
        }
      }
    )
  }
  pickImageHandlertwo = (uploadImage,setload) => {
    ImagePicker.launchImageLibrary({ title: 'Pick an Image', maxWidth: 500, maxHeight: 400 },
      response => {
        if (response.error) {
          alert('please choose image from gallery')
        } else {
          console.log("Image: " + response.uri)
          setSelectedImagetwo(response.uri);
          const selectimage2 = response.uri
          try{uploadImage(selectimage2,setImageUrltwo,setload);}catch(err){alert('no internet')}
        }
      }
    )
  }
  

  return (<View style= {{flex:1 , backgroundColor:"black"}}>
    {load ? <Activity /> : 
    <View style= {{flex:1 , backgroundColor:"black",flexDirection:"row"}}>
  
<View style={styles.imageContainer1}>
<TouchableOpacity onPress={()=>this.pickImageHandler(uploadImage,setload)}>
<View style={styles.imageContainer2}>

  <Image source={{uri:`${selectedImage}`}} style={styles.previewImage} />

</View>
</TouchableOpacity>
</View>
<View style={styles.imageContainer}>
<TouchableOpacity onPress={()=>this.pickImageHandlertwo(uploadImage,setload)}>
<View style={styles.imageContainer2}>

  <Image source={{uri:`${selectedImagetwo}`}} style={styles.previewImage} />

</View>
</TouchableOpacity>
</View>
   <View style={{position:"absolute" ,bottom:3,marginLeft:'78%',borderRadius:10,width:80,height:80,marginRight:"5%"}}>
      <TouchableOpacity onPress={()=>vertical(setload,ImageUrl,ImageUrltwo,(memeUrl)=>{navigation.navigate("Meme",{memeurl: memeUrl})})}>
      <FontAwesome5Icon name={'check-circle'}  size={60} color={'#CD853F'}/>
      </TouchableOpacity>
  
    </View>
</View>}
        </View>
 
 
  )
}



const styles = StyleSheet.create({
previewImage: {
    flex:1,
    width: "100%",
    height: "100%"
  }, imageContainer: {
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '50%',
    height: "100%",
    marginLeft:1

  },imageContainer1: {
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '50%',
    height: "100%",


  },imageContainer2: {
    width: "100%",
    height: "100%",
  },
})

export default vericon;