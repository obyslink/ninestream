import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import stream from "../../assets/stream.png";
import back from "../../assets/wall.png";
import { Button, Input, Item } from 'native-base';
import { Post } from '../../components/reuse/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Snackbar } from "react-native-paper";
import { setUserId } from '../../store/actions/user';

class Verify extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    
    this.state = {
      resend: false,
      otp: '',
      text: ''
    }
  }

  handleVerify = () => {
    let emailer = this.props.navigation.state.params.email.toLowerCase();
    let obj = {
      email: emailer,
      activation_code: this.state.otp
    }
    Post('/user/activate_account', obj).then((res) => {
      if (res.error == false) {
        this.props.navigation.navigate('Login');
      } else {
        this.setState({ text: res.message, visible: true });
      }
    })
  }

  handleResend = () => {
    this.setState({
      resend: true
    })
    let obj = {
      username: this.props.navigation.state.params.email
    }
    Post('/user/send_activation_code', obj).then((res) => {
      if (res.error === false) {
        this.setState({ text: "A ten digit code as been sent to you email", visible: true, resend: false });
      }
    })
  }

  render() {
    console.log(this.state);
    
    let stan ={
      color: this.state.resend ? 'gray' : 'orange' 
    } 
    return (
      <ImageBackground source={back} style={classes.back} >
        <ScrollView>
          <View style={classes.container}>
            <View style={classes.logoCont}>
              <Image
                style={classes.logo}
                source={stream}
              />
              <Text style={classes.title} >Verify Your Phone Number</Text>
            </View>
            <View style={classes.form}>
              <TouchableOpacity style={{ marginVertical: 5 }} onPress={this.handleOtpResend} >
                <Text 
                  style={stan} 
                >Resend Code</Text>
              </TouchableOpacity>
              <Item regular>
                <Input 
                  style={{ color: 'white' }} 
                  onChangeText={(otp) => this.setState({ otp })} 
                  placeholder='Ten digit code' 
                />
              </Item>
              <Button style={{ marginTop: 20 }} onPress={this.handleVerify} block light>
                <Text>Verify</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Hide',
            onPress: () => { this.setState({ visible: false }) },
          }}
        >
          {this.state.text}
        </Snackbar>
      </ImageBackground>
    );
  }
}

// export default Verify;
function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: setUserId,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Verify);


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
  },
  form: {
    marginTop: 40
  }
})
