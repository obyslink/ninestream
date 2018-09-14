import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import validator from 'validator';
import { Snackbar, Button } from 'react-native-paper';
import { Post } from '../reuse/post';
import { withNavigation } from 'react-navigation'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId, getUserObject } from '../../store/actions/user';
import { Kohana } from 'react-native-textinput-effects';
import Octicons from 'react-native-vector-icons/Octicons';
import DeviceInfo from 'react-native-device-info';

class Changepassword extends Component {
  static navigationOptions = {
    title: 'Change Password',
    headerTitleStyle: {
      color: 'black'
    }
  }

  constructor(props) {
    super(props);
    // this.unsubscriber = null;
    
    this.state = {
      current: "",
      password: '',
      user: {},
      loading: false
    }
  }

  // async componentDidMount(){
  //   let value = await AsyncStorage.getItem('user_raw');
  //   if (JSON.parse(value) !== null) {
  //     this.setState({
  //       user: JSON.parse(value)
  //     })
  //   }
  // }

  // async storeItem(key, item) {
  //   try {
  //     //we want to wait for the Promise returned by AsyncStorage.setItem()
  //     //to be resolved to the actual value before returning the value
  //     await AsyncStorage.setItem(key, JSON.stringify(item));
  //     // return jsonOfItem;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  handlePasswordChange = () => {
    this.setState({
      loading: true
    })
    const { current, password } = this.state;
    // validated email
    let obj = {
      email: this.props.navigation.state.params.email,
      current_password: current,
      new_password: password,
    }

    let loge = {
      token: this.props.navigation.state.params.token
    }

    if (current !== password) {
      if (validator.isLength(current, { min: 5, max: 20 })) {
        // validate passowrd
        if (validator.isLength(password, { min: 5, max: 20 })) {
          Post('/user/change_password', obj).then(res => {
            // console.log("chnage", res);
            
            if (!res.error) {
              Post('/user/logout', loge).then(resp => {
                // console.log("logout", resp);
                
                if (!resp.error) {
                  AsyncStorage.removeItem('user');
                  AsyncStorage.removeItem('user_raw');
                  this.setState({
                    text: "Password successfully changed",
                    visible: true,
                    password: '',
                    current: '',
                    loading: false
                  })
                  this.props.navigation.navigate('Login');
                }
              })
            } else {
              this.setState({
                text: res.message,
                visible: true,
                password: '',
                current: '',
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
          text: "Password length must have a min of 5 and max of 20",
          visible: true,
          loading: false
        })
      }
    } else {
      this.setState({
        text: "Your new password cannot be current password",
        visible: true,
        loading: false
      })
    }
  }

  displayEmail = () => {
    return (
      <Kohana
        style={classes.input}
        label={'Current Password'}
        iconClass={Octicons}
        value={this.state.current}
        onChangeText={current => this.setState({ current })}
        iconName={'key'}
        iconColor={'#f4d29a'}
        labelStyle={{ color: 'white', fontWeight: '400', fontSize: 15, marginTop: -5 }}
        inputStyle={{ color: 'white', fontSize: 15 }}
        useNativeDriver
        secureTextEntry
      />
    )
  }
  password = () => {
    return (
      <Kohana
        style={classes.input}
        label={'New Password'}
        iconClass={Octicons}
        value={this.state.password}
        onChangeText={password => this.setState({ password })}
        iconName={'lock'}
        iconColor={'#f4d29a'}
        labelStyle={{ color: 'white', fontWeight: '400', fontSize: 15, marginTop: -5 }}
        inputStyle={{ color: 'white', fontSize: 15 }}
        secureTextEntry
        useNativeDriver
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#dddade', alignItems: 'center',
      justifyContent: 'center', padding: 5 }} >
        <View style={classes.container}>
          {this.displayEmail()}
          {this.password()}
          <Button mode="contained" loading={this.state.loading} style={classes.button} onPress={this.handlePasswordChange} >
            Change Password
          </Button>
        </View>
        

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

const Changepasswords = withNavigation(Changepassword);
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

export default connect(mapStateToProps, mapDispatchToProps)(Changepasswords);

const classes = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 50,
    height: 200,
    // justifyContent: 'center',
    // margin: 5,
    width: 350,
    // alignItems: 'center'
  },
  input: {
    height: 20,
    backgroundColor: 'gray',
    marginBottom: 10,
    
  },
  button: {
    backgroundColor: '#f48221',
    paddingVertical: 5
  },
  buttonReg: {
    marginTop: 20,
    paddingVertical: 5
  },
})