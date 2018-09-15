import React, { Component } from 'react';
import { View, ImageBackground, AsyncStorage, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import WriteReview from '../../../components/dashboard/vod/writereview';
import { Post } from '../../../components/reuse/post';
import { Snackbar } from 'react-native-paper';
import Review from '../../../components/dashboard/vod/review';
import Rating from '../../../components/dashboard/vod/rating';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId, getUserObject } from '../../../store/actions/user';

class Voddetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View style={{ paddingLeft: 20 }} >
          <Text style={{ color: '#FB8C00', fontSize: 20 }} >
            {navigation.state.params.item.title}
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: 'black',
        // height: 40,
      },
      // headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  };

  constructor(props) {
    super(props);
    
    this.state = {
      review: '',
      user: [],
      text: '',
      visible: false
    }
  }

  // async componentDidMount(){
  //   let value = await AsyncStorage.getItem('user');
  //   if (JSON.parse(value) !== null) {
  //     console.log(JSON.parse(value));
      
  //     this.setState({
  //       user: JSON.parse(value)
  //     })
  //   }
  // }

  handleVideo = () => {
    this.setState({
      visible: true,
      text: "This features isn't available for on this version"
    })
  }
  
  handleReview(){
    const user = this.props.navigation.state.params.user;
    let obj = {
      token: user.token,
      reference_id: 1,
      review: this.state.text
    }
    console.log("ONNN",obj);
    
    if (this.state.review !== "") {
      Post('/review/save', obj).then(res => {
        // console.log("REVIEW", res);
        if (!res.error) {
          this.setState({
            text: 'Review Successfully Added.',
            visible: true,
            review: ''
          })
        }
      }) 
    } else {
      this.setState({
        review: ''
      })
    }
  }

  setReview(review){
    this.setState({
      review
    })
  }

  sendError = () => {
    this.setState({
      text: 'Something Went Wrong.',
      visible: true
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <ScrollView>
          <TouchableOpacity onPress={this.handleVideo} >
            {
              this.props.navigation.state.params.item.content.map((img, index) => (
                img.assetTypes[0] == "Poster H" &&
                  <ImageBackground
                    key={index}
                    source={{ uri: img.downloadUrl }}
                    style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Icon
                      name="ios-play"
                      style={{
                        fontSize: 70, justifyContent: 'center',
                        color: 'gray'
                      }}
                    />
                  </ImageBackground>
              ))
            }
            
          </TouchableOpacity>
          <View style={{ justifyContent: 'center' }} >
            {/* <Text style={{ fontWeight: '700', color: '#424242', padding: 5, fontSize: 22 }} >
              The Swap Africa
            </Text> */}
            <Text style={{ color: '#757575', padding: 5, marginTop: 10 }} >
              {this.props.navigation.state.params.item.description}
            </Text>

            <View>
              <Rating
                user={this.props.navigation.state.params.user}
                vodId={this.props.navigation.state.params.item._id} 
                sendError={this.sendError.bind(this)}
              />
              <Text style={{ alignSelf: 'flex-start', fontWeight: '700', color: '#424242', padding: 5, fontSize: 15 }} >
                All Reviews
              </Text>
              <Review 
                sendError={this.sendError.bind(this)} 
                vodId={this.props.navigation.state.params.item._id} 
                user={this.props.navigation.state.params.user} 
              />
            </View>
          </View>
        </ScrollView>
        {/* text field to write a review */}
        <WriteReview 
          review={this.state.review} 
          handleReview={this.handleReview.bind(this)}
          setReview={this.setReview.bind(this)}
        />
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Hide',
            onPress: () => { this.setState({ visible: false }) },
          }}
          duration={this.state.duration}
        >
          {this.state.text}
        </Snackbar>
      </View>
    );
  }
}

// export default Voddetails;
function mapStateToProps(state) {
  return {
    data: state.route,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserObject: getUserObject,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Voddetails);

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 10
//   },
//   buttonWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white'
//   },
//   iconDown: {
//     marginLeft: 5
//   },
//   renderEpisodes: {
//     marginTop: 10
//   },
//   image: {
//     width: 150,
//     height: 80,
//     marginRight: 10
//   },
//   buttonPlay: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1
//   },
//   episodeName: {
//     justifyContent: 'center'
//   },
//   videoEpisode: {
//     flexDirection: 'row'
//   },
//   text: {
//     color: 'white'
//   },
//   summary: {
//     color: 'grey',
//     marginVertical: 10
//   }
// })


