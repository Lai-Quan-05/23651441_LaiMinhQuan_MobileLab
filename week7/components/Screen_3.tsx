import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Screen_3'>;
const Screen_3 = ({ route }: Props) => {
  const bike = route.params?.bike;
  return (
    
    <SafeAreaView style = {styles.container}>
      <View style = {styles.frameImage}>
        <Image
          source={bike ? bike.image : require('../assets/image/bithree_removebg-preview.png')}
          style = {styles.image}
        />
       
      </View>
      <Text style={styles.name}>{bike ? bike.name : 'Pina Mountain'}</Text>
      <View>
      <Text style={styles.discount}>15% OFF I 350$' 
      <Text style={styles.giaGoc}>449$</Text>
      </Text>
      <Text style={styles.descrpition}>Description</Text>
      </View>
      <Text style = {styles.content}> It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.</Text>
      <View style = {styles.botButton}>
      <TouchableOpacity style={styles.heartIcon}>
        <Ionicons name="heart-outline" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style = {styles.addCart}>
        <Text style = {styles.addTxt}>Add to cart</Text>
      </TouchableOpacity>
      </View>
      
      
    </SafeAreaView>
  )
}
export default Screen_3;
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  content:{
    fontSize: 20,
    textAlign: 'justify',
    fontWeight: '100',
    
  },
  descrpition: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  frameImage:{
    backgroundColor: '#F7E5E5',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  image:{
    alignItems: 'center',
    width: 300,
    height: 350,
    },
  name: {
    fontWeight: 'bold',
    fontSize: 26,
    width: 200,
    textAlign: 'left'
  },
 

  giaGoc: {
    textAlign: 'left',
    fontWeight: 500,
    fontSize: 25,
    marginLeft: 50
  },
  discount: {
    textAlign: 'left',
    fontWeight: 200,
    fontSize: 25
  },
  botButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  heartIcon: {
    marginLeft: 20
  },
  addCart: {
    marginLeft: 100,
    width: 180,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 30
  },
  addTxt: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
    marginTop: 11
  }
})