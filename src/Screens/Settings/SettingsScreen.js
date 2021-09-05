import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SearchBarWidget from '../../Components/SearchBar/SearchBar.component';
import ListWidget from '../../Components/ListWidget/ListWidget.component';
import {styles} from './Styles'

export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.setResult = this.setResult.bind(this);
    this.removeWidget = this.removeWidget.bind(this);
  }

  state = {
    resultSearch: null,
    newWidgetList: this.props.route.params.widgetsList,
  };

  // Add a widget in the new list of widgets
  addWidget = (newWidget) => {
    let updatedList = (this.state.newWidgetList) ? (this.state.newWidgetList) : []
    updatedList.push(newWidget)
    this.setState({
      newWidgetList:updatedList
    });
  } 

  //remove a widget in the new list of widgets
  removeWidget = (id) => {
    const updatedList = [...this.state.newWidgetList];
    updatedList.splice(this.state.newWidgetList.findIndex(x => x.id === id), 1);
    this.setState({newWidgetList:updatedList})    
  }

  // Save a new widget found
  setResult = (result) => {
    this.setState(state => ({
      ...state,
      resultSearch: result,
    }))
    this.addWidget(result);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleGroup}>
          <View style={styles.titleElem}>
            {/* search bar */}
            <SearchBarWidget setResult={this.setResult}/>
          </View>
        </View>
        <View style={styles.widgetList}>
          {/* list of widgets */}
          <ListWidget removeWidget={this.removeWidget} list={this.state.newWidgetList}/>
        </View>
        <View style={styles.btn}>
          {/* button for saving and going back to home with the updated list of widgets */}
          <TouchableOpacity style={styles.saveBtn} 
          onPress={() => this.props.navigation.navigate('Home', {newWidgetList:this.state.newWidgetList} )}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

