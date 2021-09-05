import React from 'react';
import {Text, View, ScrollView } from 'react-native';
import Widget from '../../Components/Widget/Widgets.component'
import Icon from 'react-native-vector-icons/FontAwesome';
import ApiWeather from '../../Api/ApiWeather';
import { styles } from './Styles';
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.Api = new ApiWeather()
  }

  state = {
    widgetsList: (this.props.route?.params?.newWidgetList) ? this.props.route.params.newWidgetList : null,
  };

  componentDidMount() {
    // Fill the list of widgets with default values
    if (!this.state.widgetsList)
      this.getDefaultWidget();

    // Update the list of widgets after set new settings
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.props.route?.params){
        this.setState({widgetsList:this.props.route.params.newWidgetList})
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  // Set default values in the list of widgets
  async getDefaultWidget() {
    let newWidgetsList = []
    newWidgetsList.push(await this.Api.getWeather("Montpellier"))
    newWidgetsList.push(await this.Api.getWeather("London"))
    newWidgetsList.push(await this.Api.getWeather("New York"))
    
    this.setState({
      widgetsList:newWidgetsList,
      refresh:false
    });
  }

  // Refresh weather data
  async refreshWeatherData () {
    this.setState({refresh:true})

    const promises = this.state.widgetsList.map(async widgetData => {
      const newWidgets = await this.Api.getWeather(widgetData.name)
      return newWidgets
    })
    const newWidgetsList = await Promise.all(promises)

    this.setState({
      widgetsList:newWidgetsList,
      refresh:false
    });
  }

  render() {
    return (
      <View style={styles.container}>
      
        <View style={styles.titleGroup}>
          <View style={styles.titleElem}>
            <Text style={styles.titleText}>Widgets</Text>
          </View>
          {/* refresh button */}
          <View style={styles.titleElem}>
            <Icon style={styles.refresh} onPress={() => this.refreshWeatherData()}  name="refresh" size={20} color="#172E81"/>
          </View>
          {/* settings button */}
          <View style={styles.titleElem}>
            <Icon style={styles.settings} onPress={() => this.props.navigation.navigate('Settings',{widgetsList: this.state.widgetsList})} name="cog" size={35} color="#581845"/>
          </View>
        </View>

        {/* List of widgets */}
        <View style={styles.scrollViewContainer}>
          <ScrollView  style={styles.scrollView}>
            { 
              (this.state.widgetsList) ? (
                this.state.widgetsList.map((widgetData, i) => (              
                  <Widget style={styles.widget} refresh={this.state.refresh} data={widgetData}  key={i} id={i}/>
                ))
              ) : (null)
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}
