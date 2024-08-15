import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function MenuList() {

    const menuList = [
        {
          id: 1,
          name: 'Add Business',
          icon: require('../../assets/images/addIcon.png'),
          path: '/business/add-business'
        },
        {
            id: 2,
            name: 'My Business',
            icon: require('../../assets/images/bus.png'),
            path: ''
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('../../assets/images/share2.png'),
            path: ''
        },
        {
            id: 4,
            name: 'Logout',
            icon: require('../../assets/images/logout.png'),
            path: ''
        }
      ]

      const router = useRouter()

      const onMenuClick = (item) => {
        router.push(item.path)
      }
  return (
    <View style={styles.container}>
      <FlatList
      data={menuList}
      numColumns={2}
      renderItem={({item, index}) =>(
        <TouchableOpacity onPress={() =>onMenuClick(item)} style={styles.flatView}>
            <Image source={item.icon} style={styles.icons}/>
            <ThemedText style={styles.name}>{item.name}</ThemedText>
        </TouchableOpacity>
      )}
       />
       <ThemedText style={{fontFamily: 'outfit', textAlign: 'center', marginTop: 100, color: Colors.GRAY}}>Powered and Developed by JoeNessa</ThemedText>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    icons: {
        width: 50,
        height: 50
    },
    name: {
       fontFamily: 'outfit-meduim',
       fontSize: 16,
       flex: 1
    },
    flatView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 15,
        margin: 10,
        backgroundColor: Colors.BACKGROUND
    }
})