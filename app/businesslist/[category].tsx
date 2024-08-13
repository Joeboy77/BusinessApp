import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState} from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import BusinessListCard from '@/components/BusinessList/BusinessListCard'

export default function BusinessListByCategory() {
  const [businesslist, setBusinessList] = useState([])

  const navigation = useNavigation()

  const {category} = useLocalSearchParams()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category
    })
    getBusinessList()
  }, [])

  const getBusinessList = async() => {
    setBusinessList([])
    const q = query(collection(db, 'BusinessList'), where("category", '==', category))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList(prev => [...prev,doc.data()])
    })
  }
  return (
    <View>
        <FlatList 
        data={businesslist}
        renderItem={({item, index}) => (
          <BusinessListCard business={item} key={index}/>
        )}
        />
    </View>
  )
}