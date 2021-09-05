import React from 'react';
import {Text, View } from 'react-native';
import {Card } from 'react-native-elements';
import { styles } from './Styles';
import weatherIcons from '../IconFont/Icon.json'
import Icon from '../IconFont/iconfont';



export default class Widget extends React.Component {

    state = {
        iconValue:this.getIconValue(this.props.data),
        localTime:this.showDate(this.getLocalTime(this.props.data))
    }

    showDate(timeInCity) {
        let currentdate = new Date(timeInCity)
        let hour = (currentdate.getHours() < 10 ? '0' : '' ) + currentdate.getHours()
        let minute = (currentdate.getMinutes() < 10 ? '0' : '' ) + currentdate.getMinutes()
        let datetime = hour + ":" + minute

        return datetime
    }

    getLocalTime(cityData) {
        let  d = new Date()
        let localTime = d.getTime()
        let localOffset = d.getTimezoneOffset() * 60000
        let utc = localTime + localOffset
        let timeInCity = utc + (1000 *  cityData.timezone)
        return timeInCity
    }

    getSunrise(time) {
        const date = new Date()
        let sunrise =  new Date(time.sys.sunrise * 1000  
                        + (date.getTimezoneOffset() * 60000)
                        + (time.timezone *1000))
        return sunrise.getTime()
    }

    getSunset(time) {
        const date = new Date()
        let sunset = new Date(time.sys.sunset * 1000
                        + (date.getTimezoneOffset() * 60000)
                        + (time.timezone *1000));
        return sunset.getTime()
    }

    getIconValue(weatherData) {
        var code = weatherData.weather[0].id;
        var icon = weatherIcons[code].icon;
        var color = '#D4AC0D';
        const localTime = this.getLocalTime(weatherData);
        const sunrise = this.getSunrise(weatherData);
        const sunset = this.getSunset(weatherData)
        
        if (localTime >= sunrise && localTime < sunset) { // verification for day
            icon = 'wi-day-' + icon;
        } else if (localTime >= sunset || localTime < sunrise ) { //verification for night
            color = '#0C2FAC'
            if (code == 800) {
                icon = 'wi-night-clear';
            } else {
                icon = 'wi-night-alt-' + icon;
            }
        }
        return {iconName:icon, iconColor:color}
    }

    render() {
        
        return (
            <View style={styles.container}>
                <Card style={styles.card} overlayStyle={{opacity: 0}}>
                    <Card.Title>{this.props.data.name}, {this.props.data.sys.country}</Card.Title>
                    <Card.Divider/>
                    <View style={styles.widget}>

                        {/* will appear when refreshing */}
                        {(this.props.refresh) ? ( <Text>...</Text>) : (null)}

                        <View style={styles.widgetElem}>
                            <Text>{this.props.data.main.temp}°C</Text>
                            <Text>{this.props.data?.weather[0].main}</Text>
                        </View>

                        {/* Local time */}
                        <View style={styles.widgetElem}>
                            <Text style={styles.time}>{this.state.localTime}</Text>
                        </View>

                        {/* Weather Icon */}                        
                        <View style={styles.widgetIcon}>
                            <Icon name={this.state.iconValue.iconName} color={this.state.iconValue.iconColor} size={45} />
                        </View>
                    </View>
                </Card>
            </View>
        );
    }
}

{/* <MyIcon name='wi-cloud'/> */}