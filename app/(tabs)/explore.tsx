
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import Category from '@/components/Home/Category';

export default function explore() {
  return (
      <View style={styles.container}>
        <ThemedText style={styles.hero}>Explore More</ThemedText>
        <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Search...' returnKeyType='search'/>
      </View>
      <Category explore={true}/>
      </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  hero: {
    fontFamily: 'outfit-bold',
    paddingTop: 50,
    fontSize: 20,
    textAlign: 'center'
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
    borderColor: Colors.PRIMARY,
    borderWidth: 1
}
});
