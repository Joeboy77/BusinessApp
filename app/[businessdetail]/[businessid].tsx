import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'

export default function BusinessDetail() {

    const {businessid} = useLocalSearchParams()
    const GetBusinessDetailById = () => {
        
    }
  return (
    <View>
      <ThemedText>{businessid}</ThemedText>
    </View>
  )
}