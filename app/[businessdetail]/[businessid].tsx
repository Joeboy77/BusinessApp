import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { collection, doc, getDoc } from '@firebase/firestore'
import {db} from '../../configs/FirebaseConfig'
import { Colors } from '@/constants/Colors'
import Intro from '@/components/BusinessDetail/Intro'
import ActionButton from '@/components/BusinessDetail/ActionButton'
import About from '@/components/BusinessDetail/About'
import Reviews from '@/components/BusinessDetail/Reviews'


export default function BusinessDetail() {
    const [business, setBusiness] = useState()
    const [loading, setLoading] = useState(false)
    const {businessid} = useLocalSearchParams()

    useEffect(() => {
        GetBusinessDetailById()
    }, [])

    const GetBusinessDetailById = async() => {
        setLoading(true)
        const docRef:any = doc(db, 'BusinessList', businessid)
        const docSnap= await getDoc(docRef)
        if(docSnap.exists()) {
            setBusiness({id:docSnap.id, ...docSnap.data()})
            setLoading(false)
        } else {
            console.log("No such document");
            
        }
    }
  return (
    <View>
        {loading?
        <ActivityIndicator size={'large'} color={Colors.PRIMARY} style={{marginTop: '70%'}}/>:
        <ScrollView showsVerticalScrollIndicator={false}>
            <Intro business={business}/>
            <ActionButton business={business}/>
            <About business={business}/>
            <Reviews business={business}/>
        </ScrollView>
        }
      
    </View>
  )
}