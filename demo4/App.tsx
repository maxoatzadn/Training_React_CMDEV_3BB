import { View, Text } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import AppNavigator from './src/AppNavigator'
type Props = {}

const App = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator/>
    </View>
  )
}

export default App