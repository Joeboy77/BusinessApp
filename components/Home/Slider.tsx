import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'


export default function Slider() {

    const [sliderList, setSliderList] = useState([])

    const GetSliderList = async() => {
        setSliderList([])
        const q = query(collection(db, 'slider'))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setSliderList(prev => [...prev, doc.data()])
        })
    }
    useEffect(() => {
        GetSliderList()
    }, [])

  return (
    <View>
      <Text style={{fontFamily: 'outfit', fontSize: 20, padding: 20, color: '#fff', fontWeight: '800', paddingLeft: 20, paddingTop: 20, marginBottom: 5}}>#Special for you</Text>
      <FlatList 
      horizontal
      showsHorizontalScrollIndicator={false}
      data={sliderList}
      style={{paddingLeft: 20}}
      renderItem={({item, index}) =>(
        <Image source={{uri:item.imageUrl}} style={styles.image}/>
      )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 150,
        borderRadius: 15,
        marginRight: 15
    }
})