import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {

const { user} = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{uri: user?.imageUrl}} style={styles.profileImage}/>
        <View>
            <Text style={{color: '#fff'}}>Welcome,</Text>
            <Text style={{color: '#fff', fontSize: 19, fontFamily: 'outfit', }}>{user?.fullName}</Text>
        </View>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Search...' returnKeyType='search'/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    profile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 99
    }, 
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        marginTop: 15,
        borderRadius: 8,
        width: 'auto'
    }
})