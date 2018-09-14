import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, ImageBackground, AsyncStorage } from 'react-native';
import stream from "../../assets/stream.png";
// import back from "../../assets/meme.png";
import back from "../../assets/wall.png";
import RegisterForm from "../../components/register/registerform";

class Register extends Component {
  static navigationOptions = {
    header: null
  }

  // async componentDidMount() {
  //   try {
  //     //we want to wait for the Promise returned by AsyncStorage.setItem()
  //     //to be resolved to the actual value before returning the value
  //     let value = await AsyncStorage.getItem('user');
  //     if (JSON.parse(value) !== null) {
  //       console.log(JSON.parse(value));
        
  //       // if (JSON.parse(value).verified === true){
  //       //   this.props.navigation.navigate('Dashboard');
  //       // } 
  //       // else {
  //       //   this.props.navigation.navigate('Verify');
  //       // }
  //     }
  //     // return jsonOfItem;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

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





























































// import React, { Component } from 'react';
// import {
//   Container,
//   Header,
//   Content,
//   Form,
//   Item,
//   // Text, 
//   Body,
//   Left,
//   Right,
//   Title,
//   Label,
//   Input,
//   Button,
//   Picker,
//   Icon
// } from 'native-base';
// import { Actions } from 'react-native-router-flux';
// import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
// import logo from "../../assets/stream.png";
// import axios from 'axios';



// class Home extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       name: "",
//       phoneNumber: "",
//       selected: "male"
//     };
//   }

//   onValueChange(value: string) {
//     this.setState({
//       selected: value
//     });
//   }

//   componentDidMount() {
//     // console.log(this.props.base + '/api/items');

//     // axios.get(this.props.base + '/api/items').then(res => {
//     //   this.setState({
//     //     name: res.data
//     //   })
//     // })
//   }

//   handleLogin = () => {
//     Actions.Login();
//   }

//   handlePress = () => {
//     Actions.Customise();
//   }

//   header() {
//     return (
//       <Header androidStatusBarColor="orange" style={{ backgroundColor: "orange" }} >
//         <Left />
//         <Body>
//           <Title>Register</Title>
//         </Body>
//         <Right />
//       </Header>
//     )
//   }

//   render() {
//     return (
//       <ScrollView>
//         <Container>
//           {/* {this.header()} */}
//           <Container style={styles.root}>
//             <Content style={{ width: "85%", marginTop: 2 }} >
//               <View style={styles.circleImg} >
//                 <Image source={logo} style={styles.img} />
//               </View>
//               <Form style={styles.form} >
//                 <Item floatingLabel style={{ marginLeft: -1 }}>
//                   <Label style={{ color: "white" }} >Full Name</Label>
//                   <Input
//                     style={styles.field}
//                     onChangeText={(name) => this.setState({ name })}
//                     value={this.state.name}
//                   />
//                 </Item>
//                 <Item floatingLabel style={{ marginLeft: -1 }} >
//                   <Label style={{ color: "white" }} >Email</Label>
//                   <Input
//                     style={styles.field}
//                     onChangeText={(name) => this.setState({ name })}
//                     value={this.state.name}
//                   />
//                 </Item>
//                 <Item floatingLabel style={{ marginLeft: -1 }}>
//                   <Label style={{ color: "white" }} >Phone</Label>
//                   <Input
//                     style={styles.field}
//                     onChangeText={(name) => this.setState({ name })}
//                     value={this.state.name}
//                   />
//                 </Item>
//                 <Item style={{ marginLeft: -1, flex: 1, flexDirection: 'row', alignContent: 'center', marginTop: 10 }}>
//                   <Picker
//                     note
//                     mode="dropdown"
//                     style={{ width: "50%", color: "white" }}
//                     selectedValue={this.state.selected}
//                     onValueChange={this.onValueChange.bind(this)}
//                   >
//                     <Picker.Item label="Male" value="Male" />
//                     <Picker.Item label="Female" value="Female" />
//                     <Picker.Item label="Not Specific" value="none" />
//                   </Picker>
//                   <Item floatingLabel style={{ marginLeft: -1, flex: 2, width: "50%" }}>
//                     <Label style={{ color: "white" }} >Age</Label>
//                     <Input
//                       style={styles.field}
//                       onChangeText={(name) => this.setState({ name })}
//                       value={this.state.name}
//                     />
//                   </Item>
//                 </Item>
//                 <Item floatingLabel style={{ marginLeft: -1 }}>
//                   <Label style={{ color: "white" }} >Password</Label>
//                   <Input
//                     style={styles.field}
//                     onChangeText={(password) => this.setState({ password })}
//                     value={this.state.phoneNumber}
//                   />
//                 </Item>
//                 <Button
//                   // onPress={this.handleLogin} 
//                   warning
//                   block
//                   style={{ padding: 5, marginTop: "5%", backgroundColor: "#f48221" }}
//                 >
//                   <Text style={{ fontSize: 20, color: "white" }} >Register</Text>
//                 </Button>
//               </Form>

//               <Button
//                 onPress={this.handleLogin}
//                 warning
//                 block
//                 style={styles.button}
//               >
//                 <Text style={styles.buttext} >
//                   <Icon type="FontAwesome" name="sign-in" /> Sign In</Text>
//               </Button>
//             </Content>
//           </Container>
//         </Container>
//       </ScrollView>
//     );
//   }
// }

// export default Home;

// const styles = StyleSheet.create({
//   root: {
//     backgroundColor: "black",
//     justifyContent: "center",
//     flexDirection: 'column',
//     alignItems: "center"
//   },
//   for: {
//     textAlign: "center",
//     fontSize: 20,
//     letterSpacing: 3,
//     // marginTop: "4%",
//     color: "white"
//   },
//   img: {
//     width: 240,
//     height: 150,
//     zIndex: 900
//   },
//   circleImg: {
//     //  width: 200,
//     // height: 150,
//     // borderRadius: 100,
//     // backgroundColor: '#00BCD4',
//     flex: 1,
//     flexDirection: 'column',
//     // marginTop: 5,
//     // minHeight: "30%",
//     // margin: "15%",
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   form: {
//     marginTop: -12
//   },
//   button: {
//     marginTop: "10%",
//     width: '100%',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   buttext: {
//     fontSize: 20,
//     marginTop: 15
//   },
//   field: {
//     color: "white"
//   }
// })




// {/* <Item floatingLabel style={{ marginLeft: -1, flex: 2 }}> */ }
// {/* <Label style={{ color: "white" }} >Gender</Label>
//                   <Input
//                     style={styles.field}
//                     onChangeText={(name) => this.setState({ name })}
//                     value={this.state.name}
//                   /> */}
// {/* </Item> */ }