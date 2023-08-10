import React from "react";
import { View, Text } from 'react-native';


const Loader = () => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%', zIndex: 1000, backgroundColor: "rgba(0.5,0.5,0.5,0.25)" }}>
        <Text style={{ alignSelf: 'center', padding: 20, backgroundColor: 'rgba(1,1,1,0.25)' }}>Loading...</Text>
    </View>
  )
}

export default Loader;
