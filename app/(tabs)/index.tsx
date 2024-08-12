import { View,Text, StyleSheet, } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={{color: '#fff', fontFamily: 'outfit'}}>Hello world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
