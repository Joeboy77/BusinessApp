import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Intro({business}) {
  return (
    <View>
        <View style={styles.sub}>
             <Ionicons name="arrow-back-circle" size={40} color="black" />
             <Ionicons name="heart-outline" size={40} color="white" />
        </View>
      <Image source={{uri:business.imageUrl}} style={styles.image}/>
    </View>
  )
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 340
    },
    sub: {
        position: 'absolute',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20
    }
})