import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import { theme } from './color';
export default function App() {
  const [working,setWorking] = useState(true);
  const [text,setText] = useState("");
  const [toDos,setTodos] = useState({});
  const travel = () => setWorking(false)
  const work = () => setWorking(true);

  const onChnageText = (paylod) => setText(paylod);
  const addTodo = () => {
    if(text === ""){
      return
    }
    // alert(text)
    const newTodos = {
      ...toDos,
      [Date.now()]: {text,work:working}
    }
    setTodos(newTodos)
    setText("");
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color:working?"white":theme.gray}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText,color:!working?"white":theme.gray}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput 
        onSubmitEditing={addTodo}
        onChangeText={onChnageText}
        returnKeyType='done'
        style={styles.input}
        value={text}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal:20
  },
  header:{
    flexDirection:"row",
    marginTop:100,
    justifyContent:"space-between",
  },
  btnText:{
    fontSize:30,
    fontWeight:"600",
  },
  input:{
    backgroundColor:"white",
    paddingVertical:10,
    paddingHorizontal:15,
    borderRadius:30,
    marginTop:10,
    fontSize:16
  }
});
