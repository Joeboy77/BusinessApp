import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState} from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import BusinessListCard from '@/components/BusinessList/BusinessListCard'
import { ThemedText } from '@/components/ThemedText'
import { Colors } from '@/constants/Colors'

export default function BusinessListByCategory() {
  const [businesslist, setBusinessList] = useState([])
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    const q = query(collection(db, 'BusinessList'), where("category", '==', category))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList(prev => [...prev,{id:doc?.id, ...doc.data()}])
    })
    setLoading(false)
  }
  return (
     <View>

        {businesslist?.length>0 && loading==false ?
        <FlatList 
        data={businesslist}
        onRefresh={getBusinessList}
        refreshing={loading}
        renderItem={({item, index}) => (
          <BusinessListCard business={item} key={index}/>
        )}
        />:
        loading?<ActivityIndicator size={'large'} color={Colors.PRIMARY} style={{marginTop: '60%'}}/>:
        <ThemedText style={{fontSize: 20, fontFamily: 'outfit-bold', color: Colors.GRAY, textAlign: 'center', marginTop: '50%'}}>No Business Found</ThemedText> }
    </View>
  )
}