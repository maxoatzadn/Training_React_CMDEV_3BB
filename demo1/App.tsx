import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';

type Props = {}
const styles = StyleSheet.create({
  root:{
    backgroundColor:'#FFF',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',

  } ,
  text:{
    color:'blue', 
    fontSize: 20 , 
    marginTop:1,
    marginRight:1,
    backgroundColor:'yellow',
    flex: 1,
    textAlignVertical:'center',
  },
});

function App() {

  
    return (
    <View style={styles.root}>
      <Text style={{...styles.text , backgroundColor:'#F30'}}>11111</Text>
      <Text style={{...styles.text , backgroundColor:'#F30'}}>22222</Text>
      <Text style={{...styles.text , backgroundColor:'#F30'}}>33333</Text>
      <Text style={{...styles.text , backgroundColor:'#F30'}}>44444</Text>
      <Text style={{...styles.text , backgroundColor:'#F30'}}>55555</Text>
      <CMBox title="hahah" color="#F99"/>
    </View>
  )
}
type CMBoxProps = {
  title: string,
  color:string 
} ; 
const CMBox = (probs:CMBoxProps) =>{
  return <Text style={{...styles.text , backgroundColor: probs.color}}>{probs.title}</Text>

  };
export default App;