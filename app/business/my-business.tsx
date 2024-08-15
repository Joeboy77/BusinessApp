import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useUser } from '@clerk/clerk-expo'
import { collection, query, where } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'

export default function MyBusiness() {
    const {user} = useUser()

    const GetUserBus = () => {
        const q = query(collection(db, 'BusinessList'), where)
    }
  return (
    <View style={styles.container}>
      <ThemedText style={{fontFamily: 'outfit-bold', fontSize: 25}}> My Business</ThemedText>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})