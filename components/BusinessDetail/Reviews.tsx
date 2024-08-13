import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'

export default function Reviews( {business}) {

    const [rating, setRating] = useState(4)
  return (
    <View style={styles.container}>
      <Text style={styles.reviews}>Reviews</Text>
      <View>
        <Rating 
        showRating={false}
        onFinishRating={(rating:any) => setRating(rating)}
        style={{paddingVertical: 10}}
        />
      </View>
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