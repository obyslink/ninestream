import React, { Component } from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, Text } from 'react-native';
import validator from 'validator';
import { AsyncStorage } from "react-native";
import { Snackbar, Button } from 'react-native-paper';
import { Post } from '../reuse/post';
import { withNavigation } from 'react-navigation'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId, getUserObject } from '../../store/actions/user';
import { Kohana } from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';

class Loginform extends Component {
  constructor(props) {
    super(props);
    // this.unsubscriber = null;
    
    this.state = {
      email: "",
      password: '',
      user: {},
      loading: false
    }
  }

  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      await AsyncStorage.setItem(key, JSON.stringify(item));
      // return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

  handleLogin = () => {
    this.setState({
      loading: true
    })
    const { email, password } = this.state;
    // validated email
    let obj = {
      username: email,
      password: password,
      device_id: DeviceInfo.getUniqueID(),
      device_name: DeviceInfo.getModel()
    }

    this.storeItem('user_raw', obj);

    let emailer = email.toLowerCase();
    emailer = emailer.replace(/ /g, "");

    if (validator.isEmail(emailer)) {
      // validate passowrd
      if (validator.isLength(password, { min: 5, max: 20 })) {
        Post('/user/login_device', obj).then(res => {
          console.log('login', res);
          if (!res.error) {
            this.props.navigation.navigate('Dashboard');
            this.storeItem('user', res.content);
            this.props.getUserObject(res.content);
            this.setState({
              loading: false
            })
          } else {
            // this.handleOtpResend();
            setTimeout(() => { this.props.navigation.navigate('Verify', {
              email: email
            }) }, 2000);
            this.setState({
              text: res.message,
              visible: true,
              password: '',
              loading: false
            })
          }
        })
      } else {
        this.setState({
          text: "Password length must have a min of 5 and max of 20",
          visible: true,
          password: '',
          loading: false
        })
      }
    } else {
      this.setState({
        text: "Email provided is invalid. Check your email",
        visible: true,
        loading: false
      })
    }
  }

  displayEmail = () => {
    return (
      <Kohana
        style={classes.input}
        label={'Email'}
        iconClass={MaterialsIcon}
        value={this.state.email}
        onChangeText={email => this.setState({ email })}
        iconName={'email'}
        iconColor={'#f4d29a'}
        labelStyle={{ color: 'white', fontWeight: '400', fontSize: 15, marginTop: Platform.OS === 'ios' ? 4 : -2  }}
        inputStyle={{ color: 'white', fontSize: 15 }}
        useNativeDriver
      />
    )
  }
  password = () => {
    return (
      <Kohana
        style={classes.input}
        label={'Password'}
        iconClass={MaterialsIcon}
        value={this.state.password}
        onChangeText={password => this.setState({ password })}
        iconName={'lock'}
        iconColor={'#f4d29a'}
        labelStyle={{ color: 'white', fontWeight: '400', fontSize: 15, marginTop: Platform.OS === 'ios' ? 4 : -2  }}
        inputStyle={{ color: 'white' }}
        secureTextEntry
        useNativeDriver
      />
    )
  }

  
// this.getUserData(res.user._user.uid)
  render() {
    // console.log(this.state);
    // let user = AsyncStorage.getItem('user');
    // console.log(user);
    return (
      <View style={classes.container}>
        {this.displayEmail()}
        {this.password()}
        {/* <TouchableOpacity style={classes.button} onPress={this.handleLogin}  >
          <Text style={classes.buttonText}> LOGIN</Text>
        </TouchableOpacity> */}
        <Button mode="contained" loading={this.state.loading} style={classes.button} onPress={this.handleLogin} >
          LOGIN
        </Button>

        <TouchableOpacity style={classes.buttonReg} onPress={() => this.props.navigation.navigate('Register')}  >
          <Text style={classes.buttonTextReg}> CREATE AN ACCOUNT</Text>
        </TouchableOpacity>

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
      </View>
    );
  }
}

const Loginforms = withNavigation(Loginform);
function mapStateToProps(state) {
  return {
    data: state.route,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: setUserId,
    getUserObject: getUserObject
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Loginforms);

const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 20,
    width: 350
  },
  input: {
    height: Platform.OS === 'android' ? 40 : 52,
    // backgroundColor: 'rgba(255,255,255,0.2)',
    // width: 350,
    backgroundColor: 'gray',
    marginBottom: 10,
    // color: 'white',
    // paddingVertical: Platform.OS === 'android' ? 40 : -20,
  },
  button: {
    backgroundColor: '#f48221',
    paddingVertical: 5
  },
  buttonReg: {
    marginTop: 20,
    // backgroundColor: 'black',
    paddingVertical: 5
  },
  buttonText: {
    textAlign: 'center',
    color: "#ffffff",
    fontWeight: '700',
    paddingTop: -10
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  buttonTextReg: {
    textAlign: 'center',
    color: "white",
    fontWeight: '700',
    paddingTop: -10
    // alignItems: 'center',
    // justifyContent: 'center'
  }
})



        // firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        //   .then((user) => {
        //     AsyncStorage.setItem("user", user)
        //     this.setState({
        //       user: user
        //     })
        //     console.log(user)
        //   })
        //   .catch((error) => {
        //     const { code, message } = error;
        //     Alert.alert("Error",
        //       "Something went wrong. Check your internet connection",
        //       [
        //         { text: 'OK' },
        //       ]
        //     )
        //   });







{/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 20 }} >
          <Text style={{ color: 'white', fontWeight: '500' }} >LOGIN With</Text>
        </View>

        <TouchableOpacity style={classes.buttonfb} onPress={this.handleRegister} >
          <Text style={classes.buttonText}>FACEBOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={classes.buttontw} onPress={this.handleRegister} >
          <Text style={classes.buttonText}>TWITTER</Text>
        </TouchableOpacity> */}

// buttonfb: {
//   backgroundColor: '#3B5998',
//     paddingVertical: 10,
//       width: 350,
//         marginBottom: 5
// },
// buttontw: {
//   backgroundColor: '#1DA1F2',
//     paddingVertical: 10,
//       width: 350
// },