import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'

export default function About({business}) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>About</ThemedText>
      <ThemedText style={styles.about}>{business?.about}</ThemedText>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#151718',
        width: '100%'
    },
    text: {
        fontFamily: 'outfit-medium',
        fontSize: 20, 
    },
    about: {
        fontFamily: 'outfit',
        lineHeight: 35
    }
})