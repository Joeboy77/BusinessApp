import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

export default function Intro({business}) {

  const router = useRouter()

  return (
    <View>
        <View style={styles.sub}>
          <TouchableOpacity onPress={() =>router.back()}>
            <Ionicons name="arrow-back-circle" size={40} color="black" />
          </TouchableOpacity>
             <Ionicons name="heart-outline" size={40} color="black" />
        </View>
      <Image source={{uri:business?.imageUrl}} style={styles.image}/>
      <View style={{padding: 20, marginTop: -10, borderTopLeftRadius: 25, borderTopRightRadius: 25, backgroundColor: '#151718'}}>
        <Text style={{color: '#fff', fontSize: 20, fontFamily: 'outfit-bold'}}>{business?.name}</Text>
        <Text style={{color: '#fff', fontFamily: 'outfit', fontSize: 18}}>{business?.address}</Text>
      </View>
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