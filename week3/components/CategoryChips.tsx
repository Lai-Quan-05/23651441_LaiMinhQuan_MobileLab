import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CategoryChips = () => {
  return (
    <View style = {styles.container}>
        <View style = {styles.chips}>
            <Text>Văn học</Text>
        </View>
        <View style = {styles.chips}>
            <Text>Kinh tế</Text>
        </View>
        <View style = {styles.chips}>
            <Text>Thiếu nhi</Text>
        </View>
        <View style = {styles.chips}>
            <Text>Truyện tranh</Text>
        </View>
        <View style = {styles.chips}>
            <Text>Ngoại ngữ</Text>
        </View>
        <View style = {styles.chips}>
            <Text>Lịch sử</Text>
        </View>
    </View>
    
  )
}

export default CategoryChips
const styles = StyleSheet.create({
    container: {
        flexDirection :'row',
        flexWrap: 'wrap',
        gap: 8,
        alignContent: 'flex-start'
    },
    chips: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 25,
        borderColor: 'indigo',
        borderWidth: 1
    }
})