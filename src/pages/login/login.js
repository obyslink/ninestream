import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, Text, ImageBackground, ScrollView } from 'react-native';
import stream from "../../assets/stream.png";
import LoginForm from "../../components/login/loginform";
// import { AsyncStorage } from 'react-native';
import back from "../../assets/wall.png";

class Login extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    
    this.state = {
      loggedIn: false
    }
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
              <LoginForm navigation={this.props.navigation} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
export default Login;

const classes = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#3498db',
  },
  logoCont: {
    alignItems: 'center',
    marginTop: 40,
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 245,
    height: 150
  },
  title: {
    color: 'white',
    marginTop: 10,
    // width: 140,
    textAlign: 'center',
    opacity: 0.9,
    padding: 5,
    letterSpacing: 3
  },
  back: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black"
  }
})