import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '../ThemedText'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'

export default function Reviews({business}) {

    const [rating, setRating] = useState(4)
    const [userInput, setUserInput] = useState('')
    const {user} = useUser()

    const onSubmit = async() => {
        const docRef = doc(db, 'BusinessList', business?.id)
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                comment: userInput,
                userName: user?.fullName,
                userImage: user?.imageUrl
            })
        })

        ToastAndroid.show('Comment added successfully!', ToastAndroid.BOTTOM)
    }
  return (
    <View style={styles.container}>
      <ThemedText style={styles.reviews}>Reviews</ThemedText>
      <View>
        <Rating 
        showRating={false}
        imageSize={20}
        onFinishRating={(rating:any) => setRating(rating)}
        style={{paddingVertical: 10}}
        />
        <TextInput
        onChangeText={(value) => setUserInput(value)}
        placeholder='Write you comment'
        numberOfLines={4}
        style={styles.textInput}
         />
         <TouchableOpacity style={styles.submit} disabled={!userInput} onPress={onSubmit()}>
            <ThemedText style={styles.submitText}>Submit</ThemedText>
         </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#151718',
    },
    reviews: {
        fontFamily: 'outfit-bold',
        fontSize: 20
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.GRAY,
        textAlignVertical: 'top'
    },
    submit: {
       padding: 10,
       backgroundColor: Colors.PRIMARY,
       borderRadius: 6,
       marginTop: 10,
    },
    submitText: {
        fontFamily: 'outfit',
        textAlign: 'center'
    }
})