import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';

const GridItem = ({item, style}) => {
    const width = 300;
    const height = 300;

    return (
        <View style={[style, styles.container]}>
            <Image
                style={{
                    width: width,
                    height: height,
                }}
                source={{
                    uri: item.images[0]?.url,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d0cadb",
        marginBottom: 20,
        shadowRadius: 2
    },
    text: {
       textAlign: "center"
    }
})

export default GridItem;
