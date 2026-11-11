import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style = {styles.logo}>
      <Entypo name="book" size={28} color="white" />
      </View>
      
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton}> 
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="shopping-cart" size={24} color="white" /> 
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    width: "100%",
    backgroundColor: '#1E1B4B', 

  },
  logo: {
    marginLeft: 15,
    color: "FFFFF"
    
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
    marginRight: 15
  },
});
