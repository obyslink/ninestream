import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { Icon, Spinner } from 'native-base';
import { withNavigation } from 'react-navigation';
import { Get } from '../../reuse/get';
import gone from '../../../assets/aqua.jpg';

class Content extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      xplore: [{}, {}],
      more: "",
      loading: true
    }
  }


  // componentDidMount() {
    // let empty = [];
    // firebase.database().ref('xplore').on('value', snapshot => {
    //   snapshot.forEach(data => {
    //     empty = empty.concat(data.val())
    //   })
    //   this.setState({
    //     xplore: empty.reverse(),
    //     loading: false
    //   })
    //   empty = [];
    // })

    
    // componentDidMount() {
    //   Get('/api/getfreevideos').then(res => {
    //     this.setState({
    //       xplore: res, loading: false
    //     })
    //   })
    // }
    

  render() {
    // const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.renderEpisodes}>
          {this.state.loading ? (
            <View
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* <Spinner color="white" /> */}
              <Icon name="ios-alert" style={{ marginTop: 15, textAlign: "center", fontSize: 50, color: "white" }} />
              <Text style={{ textAlign: "center", color: "white" }} >An Update will be available soon</Text>
            </View>
          ) : (
            <View style={{ justifyContent: "flex-start" }}>
              <FlatList
                data={this.state.xplore}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <View style={styles.video} >
                    <View style={styles.videoEpisode}>
                      <ImageBackground style={styles.image} source={gone}>
                        <View style={styles.buttonPlay}>
                          <TouchableWithoutFeedback>
                            <View style={{ backgroundColor: 'transparent' }}>
                              <Icon
                                style={styles.iconPlay}
                                name="ios-play"
                                size={30}
                                color="white"
                              />
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      </ImageBackground>
                      <View style={styles.episodeName}>
                        <Text style={styles.text}>1. The Swap Africa</Text>
                        <Text style={styles.text}>120mins</Text>
                      </View>
                    </View>
                    <Text style={styles.summary}>
                      Super weird, when I edited getItemLayout to not
                      match my actual item component, it rendered immediately again for me...
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white'
  },
  iconDown: {
    marginLeft: 5
  },
  renderEpisodes: {
    marginTop: 10
  },
  image: {
    width: 150,
    height: 80,
    marginRight: 10
  },
  buttonPlay: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  episodeName: {
    justifyContent: 'center'
  },
  videoEpisode: {
    flexDirection: 'row'
  },
  text: {
    color: 'white'
  },
  summary: {
    color: 'grey',
    marginVertical: 10
  }
})

export default withNavigation(Content);