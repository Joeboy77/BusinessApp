import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { ThemedText } from '../ThemedText'

export default function UserIntro() {
    const {user} = useUser()
  return (
    <View style={styles.container}>
      <Image source={{uri:user?.imageUrl}} style={styles.image}/>
      <ThemedText style={styles.name}>{user?.fullName}</ThemedText>
      <ThemedText style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</ThemedText>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 99
    },
    name: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
    },
    email: {
        fontFamily: 'outfit', 
        fontSize: 16
    }
})