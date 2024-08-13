import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'

export default function BusinessListCard({business}) {
  return (
    <View style={styles.container}>
      <Image  source={{uri:business.imageUrl}} style={styles.image}/>
    </View>
  )
}
const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        borderRadius: 15
    },
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#fff'
    }
})