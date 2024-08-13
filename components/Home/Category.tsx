import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import CategoryItem from './CategoryItem'

export default function Category() {

    const [categoryList, setCategoryList] = useState([])
    useEffect(() => {
        GetCategoryList()
    }, [])
    const GetCategoryList = async() => {
        setCategoryList([])
        const q = query(collection(db, 'colection'))
        const querySnapshot = await  getDocs(q)

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setCategoryList(prev => [...prev,doc.data()])
            
        })
    }

  return (
    <View>
        <View style={styles.sub}>
        <Text style={{color: '#fff',  fontSize: 20, fontFamily: 'outfit-bold'}}>Category
        </Text>
        <Text style={{color: Colors.PRIMARY, fontFamily: 'outfit-meduim'}}>View all</Text>
      </View>
      <FlatList 
      data={categoryList}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{marginLeft: 20}}
      renderItem={({item, index}) => (
        <CategoryItem category={item} key={index} onCategoryPress={(category) => console.log(category)
        }/>
      )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    sub: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    }
})