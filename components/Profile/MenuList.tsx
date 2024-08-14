import { View, Text } from 'react-native'
import React from 'react'

export default function MenuList() {

    const menuList = [
        {
          id: 1,
          name: 'Add Business',
          icon: require('../../assets/images/addIcon.png')
        }
      ]
  return (
    <View>
      <Text>MenuList</Text>
    </View>
  )
}