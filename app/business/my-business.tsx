import { View, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useUser } from '@clerk/clerk-expo'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import BusinessListCard from '@/components/Explore/BusinessListCard'

export default function MyBusiness() {
    const {user} = useUser()

    const [businessList, setBusinessList] = useState([])


    useEffect(() => {
        user&&GetUserBus()
    }, [user])

    const GetUserBus = async() => {
        setBusinessList([])
        const q = query(collection(db, 'BusinessList'),where('userEmail', '==', user?.primaryEmailAddress?.emailAddress))

        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setBusinessList(prev =>[...prev, {id:doc.id,...doc.data()}])
        })
    }
  return (
    <View style={styles.container}>
      <ThemedText style={{fontFamily: 'outfit-bold', fontSize: 25}}> My Business</ThemedText>
      <FlatList
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