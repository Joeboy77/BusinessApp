import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'


export default function BusinessListCard({business}) {
    const router = useRouter()
  return (
    <TouchableOpacity onPress={() => router.push('/businessdetail/'+business.id)} style={{padding: 20, backgroundColor: Colors.BACKGROUND, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, marginTop: 15}}>
      <Image source={{uri:business?.imageUrl}} style={styles.image}/>
      <View style={styles.sub}>
        <ThemedText style={styles.name}>{business?.name}</ThemedText>
        <ThemedText style={styles.address}>{business.address}</ThemedText>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        objectFit: 'cover'
    },
    sub: {
        padding: 10
    },
    name: {
        fontFamily: 'outfit-bold',
        fontSize: 20
    },
    address: {
        fontFamily: 'outfit',
        color: Colors.GRAY
    }
})