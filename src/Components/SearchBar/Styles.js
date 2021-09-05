import {StyleSheet} from 'react-native';

export  
const styles = StyleSheet.create({
  container: {
  //  flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width:"100%",
  },
  resultGroup: {
     flexDirection:"row",
     width:"100%"
  },
  ResultElem: {
     flex:1,
  },
  ResultText: {
    flex:1,
    fontSize: 22,
    fontWeight: "bold",
    fontFamily:'sans-serif-condensed',
    justifyContent:"flex-end",
    textAlign: 'left', 
    marginLeft:20
  },
  icon:{
    textAlign: 'right',
    marginRight:"50%"
  },
  searchBar:{
    width:"90%"
  },
  inputStyle:{
    backgroundColor: 'white'
  },
  inputContainerStyle:{
    backgroundColor: 'white'
  },
  containerStyle:{
    backgroundColor: 'white', borderWidth: 1, borderRadius: 10, margin:20
  },
});

