import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import colors from '../misc/colors'

const SearchBar = ({containerStyle}) => {
    return (
        <View style={[styles.container,{...containerStyle}]}>
            <TextInput style={styles.SearchBar} placeholder='Search here...' />
        </View>
    )
}

const  styles = StyleSheet.create({
    SearchBar:{
        borderWidth:0.5,
        borderColor:colors.PRIMARY,
        height:40,
        borderRadius:40,
        paddingLeft:15,
        fontSize:20,
    },
    container:{}
});

export default SearchBar


