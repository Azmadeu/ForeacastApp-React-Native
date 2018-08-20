import React, { Component } from 'react'
import {View, TextInput, Button, StyleSheet, Text, Image, Dimensions} from 'react-native'
import {getCityWeather} from "../../Service";

const {width} = Dimensions.get('window');

class WeatherApp extends Component {
  state = {
    weatherIsVisible: false,
    city: '',
    loading: false
  };

  handlePress = () => {
    this.setState({ loading: true });
    getCityWeather(this.state.city)
      .then(result => {
        this.setState({
          weatherIsVisible: true,
          currentCity: result.city,
          icon: result.icon,
          temp: result.temp,
          wind: result.wind,
          description: result.description,
          loading: false
        })
      })
      .catch(() => {
        alert('Error! Incorrect city\'s name');
        this.setState({loading: false})
      });
  };

  render() {
    const {
      icon,
      temp,
      wind,
      loading,
      currentCity,
      description,
      city,
      weatherIsVisible
    } = this.state;
    return(
        <View>
          <View>
            {
               weatherIsVisible &&
              <View style={{marginTop: 100}}>
                <View style={{flexDirection: "row", justifyContent: 'center', marginBottom: 70}}>
                  <Image source={{uri: icon}} style={{width: 130, height: 100, justifyContent: 'center'}}/>
                  <Text style={styles.temp}>{temp} °C</Text>
                </View>
                <View style={{marginTop: -30, flexDirection: 'row', justifyContent: "space-around", width}}>
                  <Text style={styles.description}>{currentCity}</Text>
                  <Text style={styles.description}>{description}</Text>
                  <Text style={styles.description}>{wind} m/s</Text>
                </View>
              </View>
            }
          </View>
          <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            onChangeText={(city) => this.setState({city})}
            value={city}
            underlineColorAndroid='white'
          />
          {
            loading
              ? <Text>Loading...</Text>
              : <View style={{width: 200, height: 50}}>
                  <Button
                    onPress={this.handlePress}
                    title="Submit"
                    style={{width: 150}}
                  />
                </View>
          }
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'deepskyblue'
  },
  temp: {
    fontSize: 65,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#543d2c',
    textShadowOffset: {width: 2, height: 2}
  },
  description: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 18,
    paddingBottom: 18,
    fontSize: 20,
    opacity: 0.9,
    backgroundColor: '#2196F3',
    margin: 2,
    borderRadius: 6,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#543d2c',
    textShadowOffset: {width: 1, height: 1}
  },
  textInput: {
    width: 200,
    textAlign: 'center',
    fontSize: 20,
    color: "white",
    textShadowColor: '#543d2c',
    textShadowOffset: {width: 1, height: 1}
  }
});

export default WeatherApp