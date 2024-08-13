import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import PopularBusinessCard from './PopularBusinessCard'


export default function PopularBusiness({}) {

    const [businessList, setBusinessList] = useState([])

    useEffect(() => {
        GetBusinessList()
    }, [])
    const GetBusinessList = async() => {
        setBusinessList([])
        const q = query(collection(db, 'BusinessList'), limit(10))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setBusinessList(prev => [...prev,doc.data()])
        })
    }

  return (
    <View>
      <View style={styles.sub}>
        <Text style={{color: '#fff',  fontSize: 20, fontFamily: 'outfit-bold'}}>Popular Business
        </Text>
        <Text style={{color: Colors.PRIMARY, fontFamily: 'outfit-meduim'}}>View all</Text>
      </View>
      <FlatList 
      horizontal
      showsHorizontalScrollIndicator={false}
      data={businessList}
      renderItem={({item, index}) =>(
        <PopularBusinessCard business={item} key={index}/>
      )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    sub: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingLeft: 20,
        marginBottom: 10
    }
})