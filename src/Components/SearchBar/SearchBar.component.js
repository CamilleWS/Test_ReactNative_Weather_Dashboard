import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ApiWeather from '../../Api/ApiWeather';
import { SearchBar  } from 'react-native-elements';
import { styles } from './Styles';

export default class SearchBarWidget extends React.Component {

  constructor(props) {
    super(props); 
    this.Api = new ApiWeather();
  }

  state = {
    search: '',
    didFindCity:false,
    cityWeatherDataTmp: null,
  };
  
  // Set all value to default
  cleanSearch() {
    this.setState({ search:'', didFindCity:false, cityWeatherDataTmp:'' });
  }

  // Find the country searched
  updateSearch = (search) => {
    this.setState({ search });
    let callApi = async () => {
      let rep = await this.Api.getWeather(search)
      if (!rep.message)
        this.setState({"didFindCity":true, "cityWeatherDataTmp":rep})
      else
        this.setState({"didFindCity":false, "cityWeatherDataTmp":null})
    }
    callApi();
  };
    render() {
      const { search } = this.state;
        return (
            <View style={styles.container}>
              <View style={styles.searchBar}>
              {/* search bar */}
                <SearchBar
                  inputStyle={styles.inputStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.containerStyle}
                  placeholder="Search a city here..."
                  onChangeText={this.updateSearch}
                  value={search}
                />
              </View>
              <View style={styles.resultGroup}>
                {/* Text searched */}
                <View style={styles.ResultElem}>
                  <Text style={styles.ResultText}>{this.state.search}{(this.state.cityWeatherDataTmp) ?", " + this.state.cityWeatherDataTmp.sys.country:("") }</Text>
                </View>
                {/* green icon for validation of the city found, red if not found*/}
                <View style={styles.ResultElem}>
                {(!this.state.search)?(null):((this.state.search && this.state.didFindCity) ?
                  (
                    <Icon style={styles.icon} name="plus" size={30} size={30} color="green"
                      onPress={() => (this.props.setResult(this.state.cityWeatherDataTmp), this.cleanSearch())}/>
                  ):(
                    <Icon style={styles.icon} name="close" size={30} color="red"/>
                  ))
                }
                </View>
              </View>
            </View>
            );
        }
    }