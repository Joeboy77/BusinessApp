import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '../ThemedText'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import { ThemedView } from '../ThemedView'

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
                userImage: user?.imageUrl,
                userEmail: user?.primaryEmailAddress?.emailAddress
            })
        })

        ToastAndroid.show('Comment added successfully!', ToastAndroid.BOTTOM)
    }
  return (
    <View style={styles.container}>
      <ThemedText style={styles.reviews}>Reviews</ThemedText>
      <View>
        <Rating 
        tintColor='black'
        showRating={false}
        imageSize={30}
        onFinishRating={(rating:any) => setRating(rating)}
        style={{paddingVertical: 20}}
        />
        <TextInput
        onChangeText={(value) => setUserInput(value)}
        placeholder='Write you comment'
        numberOfLines={4}
        style={styles.textInput}
         />
         <TouchableOpacity style={styles.submit} disabled={!userInput} onPress={() => onSubmit()}>
            <ThemedText style={styles.submitText}>Submit</ThemedText>
         </TouchableOpacity>
      </View>
      <View style={{marginTop: 30}} >
        {
            business?.reviews?.map((item: any, index: any) =>(
                <View style={styles.revMain}>
                    <Image source={{uri:item?.userImage}}
                    style={{width: 50, height: 50, borderRadius: 99}}
                    />
                    <View style={styles.userReview}>
                        <Rating
                        readonly
                        tintColor='black'
                        ratingBackgroundColor='black'
                        imageSize={20}
                        ratingCount={item.rating}
                        style={{alignItems: 'flex-start'}}
                         />
                        <ThemedText style={{fontFamily: 'outfit-meduim'}}>{item?.userName}</ThemedText>
                        <ThemedText>{item?.comment}</ThemedText>
                    </View>
                </View>
            ))
        }
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
        padding: 40,
        borderRadius: 10,
        borderColor: Colors.GRAY,
        color: Colors.GRAY
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
    },
    userReview: {
        display: 'flex',
        gap: 5,
        marginTop: 30,
    },
    revMain: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        padding: 10,
        borderWidth: 0.5,
        borderColor: Colors.GRAY,
        borderRadius: 15,
        marginTop: 10
    }
})