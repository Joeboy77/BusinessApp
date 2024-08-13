import Slider from '../../components/Home/Slider';
import Header from '../../components/Home/Header';
import { View,Text, StyleSheet, } from 'react-native';
import Category from '@/components/Home/Category';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Slider />
      <Category />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  }
});
