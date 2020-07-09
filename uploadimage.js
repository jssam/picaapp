import React, { useState} from "react";
import{Text,StyleSheet,View, Button,Image} from "react-native";
import ImagePicker from 'react-native-image-picker';
import {TextInput, ScrollView,TouchableOpacity } from "react-native-gesture-handler";
import { uploadImage} from "../firebase/Firebaseapi";
import { getmeme } from "../firebase/Meme";
import Activity from "./activity";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const uploadimage =  ({navigation})=>{

  const [selectedImage, setSelectedImage] = useState("https://firebasestorage.googleapis.com/v0/b/picameme-3c3a9.appspot.com/o/appassets%2Ftaptoget.jpg?alt=media&token=7aec62f4-12ff-4936-a596-33c573ba67e9");
  const [ImageUrl, setImageUrl] = useState("");
  const [firsttext, setfirsttext] = useState("");
  const [secondttext, setsecondtext] = useState("");
  const [load,setload]=useState(false);
 
 
  pickImageHandler = (uploadImage,setload) => {
    ImagePicker.launchImageLibrary({ title: 'Pick an Image', maxWidth: 400, maxHeight: 400 },
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
  

  return (<View style= {{flex:1 , backgroundColor:"black"}}>
    {load ? <Activity /> : 
    <View style= {{flex:1 , backgroundColor:"black"}}>
  <View style={styles.textinputcontainer}>
<TextInput style={styles.textinput}
autoCapitalize = "none"
autoCorrect={false}
placeholder ="Add First Line"
value={firsttext}
onChangeText={setfirsttext}
/>
<TextInput style={styles.textinput}
autoCapitalize = "none"
autoCorrect={false}
placeholder ="Add Second Line"
value={secondttext}
onChangeText={setsecondtext}
/></View>
<View style={styles.imageContainer}>
<TouchableOpacity onPress={()=>this.pickImageHandler(uploadImage,setload)}>
<View style={styles.imageContainer2}>

  <Image source={{uri:`${selectedImage}`}} style={styles.previewImage} />

</View>
</TouchableOpacity>
</View>
   <View style={{position:"absolute" ,bottom:3,marginLeft:'78%',borderRadius:10,width:80,height:80,marginRight:"5%"}}>
      <TouchableOpacity onPress={()=>getmeme(setload,ImageUrl,firsttext,secondttext,(memeUrl)=>{navigation.navigate("Meme",{memeurl: memeUrl})})}>
      <FontAwesome5Icon name={'check-circle'}  size={60} color={"#CD853F"}>

      </FontAwesome5Icon>
      </TouchableOpacity>
  
    </View>
</View>}
        </View>
 
 
  )
}

uploadimage.navigationOptions=()=>{
  return{
headerStyle:styles.navbar
  };
}

const styles = StyleSheet.create({
  textinput: {
    width:"100%",
        height:"50%",
        fontSize:18,
        backgroundColor:'white'
  },  previewImage: {
    flex:1,
    width: "100%",
    height: "100%"
  },  textinputcontainer:{
    borderLeftColor: 'black',
    borderRightColor: 'black',
    marginHorizontal:10,
    width: '93%',
    height: "17%",
  }, imageContainer: {
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '93%',
    height: "83%",
    marginLeft:10

  },imageContainer2: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
  },

  navbar:{
    backgroundColor: 'red'},
})

export default uploadimage;