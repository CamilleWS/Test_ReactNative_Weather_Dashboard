import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width:"100%",
  },
  titleGroup: {
    flexDirection:"row",
    width:"100%"
  },
  titleElem: {
    flex:1,
  },
  titleText: {
    flex:1,
    fontSize: 22,
    fontWeight: "bold",
    fontFamily:'sans-serif-condensed',
    justifyContent:"flex-end",
    textAlign: 'left', 
    margin:20,
  },
  refresh:{
    textAlign: 'left',
    margin:20,
    justifyContent: "flex-start",
    marginTop:25,
    marginLeft:-25
  },
  settings:{
    textAlign: 'right',
    margin:20
  },
  scrollView:{
    width:"100%",
  },
  scrollViewContainer:{
    height:"86%",
    width:"100%"
  },
  widget:{
    width:"100%",
  }
});

