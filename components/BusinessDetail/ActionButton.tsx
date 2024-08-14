import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking, Share } from 'react-native'
import React from 'react'
import callIcon from '../../assets/images/call.png'
import pinIcon from '../../assets/images/pin.png'
import webIcon from '../../assets/images/web.png'
import ShareIcon from '../../assets/images/share.png'
import { ThemedText } from '../ThemedText'

export default function ActionButton({business}) {

    const actionButtonMenu = [
        {
            id: 1,
            name: 'Call',
            icon: callIcon,
            url: 'tel:'+business?.contact
        },
        {
            id: 2,
            name: 'Location',
            icon: pinIcon,
            url: 'http://www.google.com/maps/search/?api=1&query='+business?.address
        },
        {
            id: 3,
            name: 'Web',
            icon: webIcon,
            url: business?.website
        },
        {
            id: 4,
            name: 'Share',
            icon: ShareIcon,
            url: business?.website
        },
    ]

    const OnPressHandle = (item) => {
        if(item.name== 'Share'){
            Share.share({
                message: business?.name+"\n Address:"+ business?.address+"\n Find more details on Business App by Joseph!"
            })
            return;
        }
        Linking.openURL(item?.url)
    }
  return (
    <View style={styles.container}>
      <FlatList 
      numColumns={4}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      data={actionButtonMenu}
      renderItem={({item, index}) => (
        <TouchableOpacity key={index} onPress={() => OnPressHandle(item)}>
            <Image source={item?.icon} style={styles.imageIcon}/>
            <ThemedText style={{fontFamily: 'outfit-meduim', textAlign: 'center', marginTop: 3 }}>{item.name}</ThemedText>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#151718',
        padding: 20
    },
    imageIcon: {
        width: 50,
        height: 50
    }
})