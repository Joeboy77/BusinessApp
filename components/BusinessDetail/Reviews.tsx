import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Reviews({business}) {
  return (
    <View style={styles.container}>
      <Text style={styles.reviews}>Reviews</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#151718',
    },
    reviews: {
        fontFamily: 'outfit-bold',
        fontSize: 20
    }
})