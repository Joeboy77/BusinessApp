import { View, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useUser } from '@clerk/clerk-expo'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import BusinessListCard from '@/components/Explore/BusinessListCard'
import { useNavigation } from 'expo-router'

export default function MyBusiness() {
    const {user} = useUser()
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'My Business'
        })
        user&&GetUserBus()
    }, [user])

    const [businessList, setBusinessList] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        user&&GetUserBus()
    }, [user])

    const GetUserBus = async() => {
        setLoading(true)
        setBusinessList([])
        const q = query(collection(db, 'BusinessList'),where('userEmail', '==', user?.primaryEmailAddress?.emailAddress))

        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setBusinessList(prev =>[...prev, {id:doc.id,...doc.data()}])
        })
        setLoading(false)
    }
  return (
    <View style={styles.container}>
      <ThemedText style={{fontFamily: 'outfit-bold', fontSize: 25}}> My Business</ThemedText>
      <FlatList
      onRefresh={GetUserBus}
      refreshing={loading}
      data={businessList}
      renderItem={({item, index}) =>(
        <BusinessListCard business={item} key={index}/>
      )}
       />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})