import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Thumbnail, Content, Spinner, Picker, Container } from 'native-base';
import { Post } from '../../../components/reuse/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId } from '../../../store/actions/user';

class Vod extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View style={{ paddingLeft: 20 }}>
          <Text style={{ color: '#372B25', fontSize: 20 }} >Videos on Demand</Text>
        </View>
      ),
      headerRight: (
        <Picker
          // note
          mode="dropdown"
          style={{ width: 120, color: 'black' }}
          selectedValue={
            typeof navigation.state.params !== "undefined" ?
              typeof navigation.state.params.selected !== "undefined" &&
                navigation.state.params.selected
            :
              ""
          }
          onValueChange={(value) => navigation.state.params.onValueChange(value)}
        >
          <Picker.Item label="All" value="key0" />
          <Picker.Item label="Action" value="key1" />
          <Picker.Item label="Drama" value="key2" />
          <Picker.Item label="Thriller" value="key3" />
          <Picker.Item label="Series" value="key4" />
        </Picker>
      ),
      headerStyle: {
        backgroundColor: '#f48221',
        height: 40,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: true,
      selected: 'key0',
      refreshing: false,
      user: {}
    }
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true
    })
    Post('/vod/list', {}).then((res) => {
      if (!res.error) {
        this.setState({
          list: res.content.entries,
          refreshing: false
        })
      } else {
        this.setState({
          refreshing: false
        })
      }
    })
  }

  // async getUserObject() {
  //   let value = await AsyncStorage.getItem('user');
  //   if (JSON.parse(value) !== null) {
  //     console.log(JSON.parse(value));

  //     this.setState({
  //       user: JSON.parse(value)
  //     })
  //   }
  // }

  onValueChange(value) {
    // console.log(value);
    
    this.setState({
      selected: value
    });
    this.props.navigation.setParams({
      selected: value
    })
  }

  componentDidMount() {
    // get user data from the react native storage
    // this.getUserObject();

    // get list of vod
    this.getVodList();

    this.props.navigation.setParams({
      onValueChange: this.onValueChange.bind(this)
    })
    this.props.navigation.setParams({
      selected: this.state.selected
    })
  }


  getVodList() {
    Post('/vod/list', {}).then((res) => {
      if (!res.error) {
        if (typeof res.content.entries !== "undefined") {
          this.setState({
            list: res.content.entries, loading: false,
          })
        }
      }
    })
  }


  render() {
    console.log(this.state);
    
    return (
      <Container>
        <Content style={{ backgroundColor: '#242424' }}>
          {this.state.loading ? (
          <View
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Spinner color="white" />
          </View>
        ) : (
          <FlatList
            data={this.state.list}
            refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                  progressBackgroundColor="black"
                  enabled={true}
                  colors={['white']}
                />
              }
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <View style={styles.body} >
                <TouchableOpacity 
                  onPress={() => this.props.navigation.navigate('Voddetails', { item: item, user: this.props.user.user })}
                >
                  <View style={{ flexDirection: 'row' }} >
                    {
                      item.content.map((img, index) => (
                        img.assetTypes[0] == "Poster H" &&
                          <Thumbnail
                            key={index}
                            style={{
                              marginRight: 10
                            }}
                            square
                            large
                            source={{ uri: img.downloadUrl }}
                          />
                      ))
                    }
                    <View style={{ flexDirection: 'column' }} >
                      <Text style={styles.liveName} >{item.title}</Text>
                      <Text style={{ color: 'white', fontWeight: '200' }}>
                        {item.description.substr(0, 80) + ' ...'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </Content>
      </Container>
    );
  }
}
{/* {item.summary.substr(0, 80) + ' ...'} */ }
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: '#242424'
  },
  liveName: {
    color: "#FB8C00",
    paddingTop: 10,
    // paddingHorizontal: 5,
    paddingBottom: 5,
    fontWeight: '700'
  },
  summary: {
    color: "white"
  },
  body: {
    flex: 1,
    // border: '#414141',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderTopColor: '#414141',
    borderBottomColor: '#414141',
    // height: 50,
    marginBottom: 5, 
    backgroundColor: '#414141',
    padding: 10
  }
})

const Vods = withNavigation(Vod);
function mapStateToProps(state) {
  return {
    data: state.route,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: setUserId,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Vods);



// img.assetTypes.map((ass, index) => (
//   <View key={index} >
//     {
//       ass == "Poster H" || ass == "Poster V" &&
// img[0] == "Poster H" || img[0] == "Poster V" &&
//   <Thumbnail
//     style={{
//       marginRight: 10
//     }}
//     square
//     large
//     source={{ uri: img.downloadUrl }}
  // />
                        //     }
                        //   </View>
                        // ))