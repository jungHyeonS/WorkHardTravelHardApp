import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback,Pressable } from 'react-native';
import { theme } from './color';
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableHighlight  underlayColor="red" activeOpacity={0.5} onPress={() => console.log("pressed")}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight>
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
    color:"white"
  }
});
