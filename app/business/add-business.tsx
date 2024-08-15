import { View, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { Colors } from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select'


export default function AddBusiness() {
  const navigation = useNavigation()
  const [image, setImage] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() =>{
    navigation.setOptions({
      headerTitle: 'Add New Business'
    })
  }, [])

  const onImagePick = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result?.assets[0].uri)
    console.log(result);
    
  }
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Add Business</ThemedText>
      <ThemedText style={styles.fill}>Please provide all details</ThemedText>
      <TouchableOpacity onPress={() => onImagePick()} style={styles.touchable}>
       {!image? <Image source={require('../../assets/images/cam.png')} style={styles.camImg}/>
       :
       <Image source={{uri:image}} style={styles.camFeed}/>}
      </TouchableOpacity>
      <View>
        <TextInput
        returnKeyType='next'
        inputMode='text'
        placeholder='Business Name'
        style={styles.input1}
         />
         <TextInput
         returnKeyType='next'
        placeholder='Address'
        style={styles.input1}
         />
         <TextInput
         returnKeyType='next'
         inputMode='numeric'
        placeholder='Contact'
        style={styles.input1}
         />
         <TextInput
         inputMode='email'
         returnKeyType='next'
        placeholder='Email'
        style={styles.input1}
         />
         <TextInput
         returnKeyType='done'
         numberOfLines={5}
         multiline
        placeholder='About'
        style={[styles.input1, {height: 100}]}
         />
         <View>
          <RNPickerSelect
          onValueChange ={(value:any) => console.log(value)
          }
          items ={[
            {label: 'Football', value: 'football'},
            {label: 'Football', value: 'football'},
            {label: 'Football', value: 'football'}
          ]}
           />
         </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
  },
  fill: {
    fontFamily: 'outfit',
    color: Colors.GRAY
  },
  camImg: {
    width: 80,
    height: 80
  },
  touchable: {
    marginTop: 20
  },
  camFeed: {
    width: 200,
    height: 200,
  },
  input1: {
    width: 'auto',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    borderColor: Colors.GRAY,
    fontSize: 17,
    marginTop: 10,
    fontFamily: 'outfit'
  }
})