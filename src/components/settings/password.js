import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Container, Header, Content } from 'native-base';

class Password extends Component {
  static navigationOptions = {
    title: 'Change Password'
  }

  constructor(props) {
    super(props);
    
    this.state = {
      current: '',
      newPassword: '',
    }
  }
  

  render() {
    return (
      <Container style={classes.container} >
        <Content style={{ marginTop: 150  }} >
          <TextInput
            underlineColorAndroid='transparent'
            placeholder="Current Password*"
            value={this.state.current}
            keyboardType="email-address"
            onChangeText={current => this.setState({ current })}
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry
            style={classes.input}
          />
          <TextInput
            underlineColorAndroid='transparent'
            placeholder="New Password*"
            value={this.state.newPassword}
            onChangeText={newPassword => this.setState({ newPassword })}
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={classes.input}
            secureTextEntry
          />
        </Content>
      </Container>
    );
  }
}

export default Password;
const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    // width: 350
  },
  input: {
    // marginBottom: 5,
    
    height: 40,
    // width: 350,
    backgroundColor: 'gray',
    marginBottom: 10,
    // color: 'white',
    paddingHorizontal: 10
  },
  inputhalf: {
    height: 40,
    width: 250,
    backgroundColor: 'gray',
    marginBottom: 10,
    // color: '#606062',
    color: 'white',
    paddingHorizontal: 10
  },
  inputSick: {
    height: 40,
    width: 160,
    backgroundColor: 'gray',
    marginBottom: 10,
    // color: '#606062',
    color: 'white',
    paddingHorizontal: 10
  }
})