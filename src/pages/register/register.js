import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, Text, ScrollView, ImageBackground, AsyncStorage } from 'react-native';
import stream from "../../assets/stream.png";
// import back from "../../assets/meme.png";
import back from "../../assets/wall.png";
import RegisterForm from "../../components/register/registerform";

class Register extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <ImageBackground source={back} style={classes.back} >
        <ScrollView>
          <View style={classes.container}>
            <View style={classes.logoCont}>
              <Image
                style={classes.logo}
                source={stream}
              />
              <Text style={classes.title} >Welcome to 9stream</Text>
            </View>
            <View style={classes.form}>
              <RegisterForm navigation={this.props.navigation}  />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default Register;

const classes = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#3498db',
  },
  logoCont: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 15
  },
  logo: {
    width: 245,
    height: 150,
  },
  back: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black"
  },
  title: {
    color: 'white',
    marginTop: 10,
    // width: 140,
    textAlign: 'center',
    opacity: 0.9,
    padding: 5,
    letterSpacing: 3
  }
})