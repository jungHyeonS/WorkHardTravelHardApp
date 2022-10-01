import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './color';
import { Fontisto } from '@expo/vector-icons'; 


const STORAGE_KEY = "@toDos"
export default function App() {
  const [working,setWorking] = useState(true);
  const [text,setText] = useState("");
  const [toDos,setTodos] = useState({});
  const travel = () => setWorking(false)
  const work = () => setWorking(true);

  const onChnageText = (paylod) => setText(paylod);
  const saveTodos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(toSave));
  }
  const loadToDOs = async() => {
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    setTodos(JSON.parse(s));
  }

  useEffect(()=>{
    loadToDOs();
  },[])
  const addTodo = () => {
    if(text === ""){
      return
    }
    const newTodos = {
      ...toDos,
      [Date.now()]: {text,work:working}
    }
    setTodos(newTodos)
    saveTodos(newTodos)
    setText("");
  }


  const deleteTodo = (key) => {
    Alert.alert(
      "Delete To do?",
      "Are you sure?",
      [
        {
          text : "Cancel",
          style:"cancel"
        },
        {
          text : "I'm sure",
          onPress:async ()=> {
            const newToDos = {...toDos};
            delete newToDos[key];
            setTodos(newToDos);
            await saveTodos(newToDos);
          }
        }
      ]
    )
    
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
      <ScrollView>
        {Object.keys(toDos).map(key => 
            (
              toDos[key].work == working ? 
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
                <TouchableOpacity onPress={() => deleteTodo(key)}>
                  <Fontisto name="trash" size={18} color={theme.gray} />
                </TouchableOpacity>
                
              </View> : null
            )
          )}
      </ScrollView>
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
    marginVertical:10,
    fontSize:16,
  },
  toDo:{
    backgroundColor:theme.toDoBg,
    marginBottom:10,
    paddingVertical:20,
    paddingHorizontal:20,
    borderRadius:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  toDoText:{
    color:"white",
    fontSize:16,
    fontWeight:"500"
  }
});
