import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const BookCard = () => {
  return (
    <View style = {styles.cardContainer}>
      <View style = {styles.cover}>
      <Image
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} // Hoặc require('../../assets/cover.png')
      style={styles.cover}
      />
      </View>
      <View style = {styles.details}>
        <Text>Tên sách</Text>
        <Text>Tác giả</Text>
        <Text >Giá</Text>
      </View>
    </View>
  )
}

export default BookCard
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start', 
        backgroundColor: '#D6DEFF',
        padding: 12,
        borderRadius: 8,
        marginVertical: 10,
        width: '90%',
       alignSelf: 'center',
      },
    cover: {
        width: 80,
        height: 100
    },
    details: {
        flex: 1,
        marginLeft: 20,
        flexDirection: "column",
        justifyContent: 'space-between'
    }

})
