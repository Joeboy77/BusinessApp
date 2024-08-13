import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import star from '../../assets/images/star.png'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function BusinessListCard({business}) {
    const router = useRouter()
  return (
    <TouchableOpacity onPress={()=>router.push('/businessdetail/'+business.id)}>
        <ThemedView style={styles.container}>
        <Image  source={{uri:business.imageUrl}} style={styles.image}/>
        <ThemedView style={{flex: 1, gap: 5}}>
            <ThemedText style={{fontFamily: 'outfit-bold', fontSize: 19}}>{business.name}</ThemedText>
            <ThemedText style={{fontFamily: 'outfit', color: Colors.GRAY}}>{business.address}</ThemedText>
            <ThemedView style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                    <Image source={star} style={{width: 15, height: 15}}/>
                    <ThemedText style={{fontFamily: 'outfit', color: '#fff', fontSize: 15}}>4.5</ThemedText>
                </ThemedView>
        </ThemedView>
        </ThemedView>
    </TouchableOpacity>
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
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    }
})