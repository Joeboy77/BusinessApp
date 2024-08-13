import Slider from '../../components/Home/Slider';
import Header from '../../components/Home/Header';
import { View,Text, StyleSheet, ScrollView, } from 'react-native';
import Category from '@/components/Home/Category';
import PopularBusiness from '@/components/Home/PopularBusiness';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <Slider />
        <Category />
        <PopularBusiness />
        <View style={{height: 200}}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  }
});
