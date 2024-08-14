import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import UserIntro from '@/components/Profile/UserIntro'
import MenuList from '@/components/Profile/MenuList'

export default function profile() {
  
  return (
    <View style={styles.container}>
      <ThemedText style={styles.profileText}>Profile</ThemedText>

      <UserIntro />
      <MenuList />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 50
  },
  profileText: {
    fontFamily: 'outfit-bold',
    fontSize: 25
  }
})