import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import { ListItem } from 'react-native-elements'
import { styles } from './Styles';

export default class ListWidget extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Widgets List:</Text>
                <ScrollView style={styles.scrollView}>
                {/* simple list of home's widgets */}
                    {
                    this.props.list.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                        <ListItem.Title>{l.name + ", " + l.sys.country}</ListItem.Title>
                        </ListItem.Content>
                        {/* remove a widget from the list */}
                        <ListItem.Chevron name="close" color={"red"} size={20} onPress={() =>  this.props.removeWidget(l.id)}/>
                    </ListItem>
                    ))
                }
                </ScrollView>
            </View>
        );
    }
}
    