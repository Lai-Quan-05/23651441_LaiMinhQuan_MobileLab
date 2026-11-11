import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


type Props = NativeStackScreenProps<RootStackParamList, 'Screen_1'>;

const Screen_1 = ({navigation}: Props) => {
  return (
    <SafeAreaView style = {styles.container}>
      <Text style = {styles.slogan}> A premium online store for sporter and their stylish choice</Text>
      <View style = {styles.frameImage}>
        <Image
          source={require('../assets/image/bifour_-removebg-preview.png')}
          style = {styles.image}
        />
       
      </View>
      <Text style = {styles.name}>POWER BIKE SHOP</Text>
      <TouchableOpacity
        style = {styles.button}
        onPress={()=> navigation.navigate('Screen_2')}
        
      >
        <Text style = {styles.textButton}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
export default Screen_1;
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  slogan:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 20
  },
  frameImage:{
    width: '100%',
    height: 350,
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#F7E5E5'
  },
  image:{
    alignItems: 'center',
    marginTop: 35
  },
  name: {
    fontWeight: 'bold',
    fontSize: 26,
    width: 200,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'red',
    width: 200,
    height: 60
  },
  textButton: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 600,
    marginTop: 10
  }

})