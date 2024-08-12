import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Colors } from '@/constants/Colors'
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'

WebBrowser.maybeCompleteAuthSession()
export default function LoginScreen() {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google"})

    const onPress = React.useCallback(async () => {
        try{
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow()

            if(createdSessionId){
                setActive({ session: createdSessionId})
            } else {
                // Use signIn or signUp for next steps such as WFA
            }
        } catch(err) {
            console.error("OAuth error", err)
        }
        
    }, [])
  return (
    <View>
        <View style={styles.viewOne}>
            <View style={styles.contSub}></View>
        </View>
        <View style={styles.viewTwo}>
            <Text style={{fontSize: 25, fontFamily: 'outfit-bold', textAlign: 'center', fontWeight: '700'}}>Your Ultimate 
                <Text style={{color: Colors.PRIMARY, }}> Comminity Business Directory</Text> App
            </Text>
            <Text style={{fontSize: 15, fontFamily: 'outfit', textAlign: 'center', marginVertical: 15, color: Colors.GRAY}}>Find your favorite business near and post your own business</Text>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text style={{textAlign: 'center',
                    color: '#fff', fontFamily: 'outfit-bold', fontWeight: '700', fontSize: 16
                }}>Let's Get Started</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    contSub: {
        width: 250,
        height: 450,
        backgroundColor: 'plum',
        borderRadius: 20,
        borderWidth: 6,
    },
    viewOne: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 100
    },
    viewTwo: {
        backgroundColor: '#fff',
        padding: 20
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop: 20
    }
})