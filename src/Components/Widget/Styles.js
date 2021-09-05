import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex:8,
        backgroundColor: '#fff',
        width:"100%",
    },
    card:{
        width:'50px',
        backgroundColor:"green",
    },
    widget:{
        width:"100%",
        flexDirection:"row",
    },
    widgetElem: {
        flex:2,
        marginLeft:30,
    },
    widgetIcon: {
        flex:2,
        flexDirection:"row-reverse", 
        marginLeft:30
    },
    time:{
        flex:2,
        fontSize: 20,
        fontFamily:'sans-serif-condensed',
        marginRight:5,
        marginTop:5
    }
});