import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'
import BusinessListCard from './BusinessListCard'


export default function ExploreBusinessList({businessList}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FlatList 
      showsVerticalScrollIndicator={false}
      data={businessList}
      renderItem={({item, index}) =>(
        <BusinessListCard key={index} business={item}/>
      )}
      />
      <View style={{height: 500}}></View>
    </ScrollView>
  )
}