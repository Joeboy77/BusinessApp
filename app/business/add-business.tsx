import { View, StyleSheet, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, Platform} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { Colors } from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select'
import { collection, doc, getDocs, query, setDoc, snapshotEqual } from 'firebase/firestore'
import { db, storage } from '@/configs/FirebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useUser } from '@clerk/clerk-expo'


export default function AddBusiness() {
  const navigation = useNavigation()
  const [image, setImage] = useState(null)
  const [categoryList, setCategoryList] = useState([]);
  const [name, setname] = useState()
  const [address, setAddress] = useState()
  const [contact, setContact] = useState()
  const [website, setWebsite] = useState()
  const [about, setAbout] = useState()
  const [category, setCategory] = useState()
  const [loading, setLoading] = useState(false)

  const {user} = useUser()

  useEffect(() =>{
    navigation.setOptions({
      headerTitle: 'Add New Business'
    })
    GetCategoryList()
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

  const GetCategoryList = async() => {
    setCategoryList([])
    const q = query(collection(db,'colection'))
    const snapShot = await getDocs(q)
    snapShot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList(prev=> [...prev, {
        label: (doc.data()).name,
        value: (doc.data()).value
      }])
    })
  }

  const onAddNewBus = async() => {
    setLoading(true)
    const fileName = Date.now().toString()+".jpg"
    const res = await fetch(image)
    const blob = await res.blob()

    const imageRef = ref(storage, 'addBusiness/'+fileName)

    uploadBytes(imageRef, blob).then((snapshot) => {
      console.log("File uploaded");
      
    }).then(res=> {
      getDownloadURL(imageRef).then(async(downloadUrl) => {
        console.log(downloadUrl);
        saveBusinessDetail(downloadUrl)
      })
    })
    setLoading(false)
  }

  const saveBusinessDetail = async(imageUrl) => {
    await setDoc(doc(db,'BusinessList',Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      about: about,
      website: website,
      category: category,
      username:user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageUrl
    })
    setLoading(false)
    ToastAndroid.show('New Business Added...',ToastAndroid.LONG)
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
        onChangeText={(v) => setname(v)}
        returnKeyType='next'
        inputMode='text'
        placeholder='Business Name'
        placeholderTextColor={Platform.OS=== 'ios'? Colors.GRAY: '#fff'}
        style={styles.input1}
         />
         <TextInput
         onChangeText={(v) => setAddress(v)}
         returnKeyType='next'
         placeholderTextColor={Platform.OS=== 'ios'? Colors.GRAY: '#fff'}
        placeholder='Address'
        style={styles.input1}
         />
         <TextInput
         onChangeText={(v) => setContact(v)}
         returnKeyType='next'
         inputMode='numeric'
        placeholder='Contact'
        placeholderTextColor={Platform.OS=== 'ios'? Colors.GRAY: '#fff'}
        style={styles.input1}
         />
         <TextInput
         onChangeText={(v) => setWebsite(v)}
         inputMode='url'
         returnKeyType='next'
        placeholder='Website'
        placeholderTextColor={Platform.OS=== 'ios'? Colors.GRAY: '#fff'}
        style={styles.input1}
         />
         <TextInput
         onChangeText={(v) => setAbout(v)}
         returnKeyType='done'
         numberOfLines={5}
         multiline
        placeholder='About'
        placeholderTextColor={Platform.OS=== 'ios'? Colors.GRAY: '#fff'}
        style={[styles.input1, {height: 100}]}
         />
       
         <View style={styles.selector}>
          <RNPickerSelect
          onValueChange ={(value) => setCategory(value)
          }
          items ={categoryList}
          value={category}
           />
         </View>
      </View>
      <TouchableOpacity onPress={() =>onAddNewBus()} style={styles.btn} disabled={loading}>
        {loading?
        <ActivityIndicator size={'large'} color={'#fff'}/>:
        <ThemedText style={{textAlign: 'center', fontFamily: 'outfit-meduim'}}>Add New Business</ThemedText>}
      </TouchableOpacity>
      
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
    height: 150,
  },
  input1: {
    width: 'auto',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    borderColor: Colors.GRAY,
    fontSize: 17,
    marginTop: 10,
    fontFamily: 'outfit'
  },
  selector: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.GRAY,
    fontFamily: 'outfit',
    marginTop: 10,
  },
  btn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 6,
    marginTop: 30
  }, 
})