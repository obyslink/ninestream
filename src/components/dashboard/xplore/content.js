import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, RefreshControl, TouchableWithoutFeedback, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { Icon, Spinner } from 'native-base';
import { withNavigation } from 'react-navigation';
import { Surface, Text } from 'react-native-paper';
import { Grid, Row, Col } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId } from '../../../store/actions/user';
import { getxplorelist, getxplorelistupdate, refresh, getxploreloading } from '../../../store/actions/data';
import { Post } from '../../reuse/post';
const { width }  = Dimensions.get('window');

class Content extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      more: ""
    }
  } 

  _onRefresh = () => {
    this.props.refresh();
    let obj = {"categories":"free"}
    Post('/vod/list', obj).then((res) => {
      if (!res.error) {
        this.props.getxplorelist(res.content.entries);
      } else {
        this.props.refresh();
      }
    })
  }


  componentDidMount(){
    let obj = {"categories":"free"}

    Post("vod/list", obj).then((res) => {
      console.log("XPLORE", res);
      if (!res.error) {
        this.props.getxplorelist(res.content.entries);
      } else {
        this.props.getxploreloading();
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.renderEpisodes}>
          {this.props.xploreLoading ? (
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
            <Grid>
              <Row>
              <FlatList
                data={this.props.data.xploreList}
                refreshControl={
                  <RefreshControl
                    refreshing={this.props.data.refreshing}
                    onRefresh={this._onRefresh}
                    progressBackgroundColor="black"
                    enabled={true}
                    colors={['white']}
                  />
                }
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <Col>
                    <Surface style={styles.surface}>
                      {
                        item.content.map((img, index) => (
                          img.assetTypes[0] == "Poster H" &&
                            <Thumbnail
                              key={index}
                              style={{ width: (width / 3 - 8), height: 110 }}
                              square
                              large
                              source={{ uri: img.downloadUrl }}
                            />
                        ))
                      }
                      <Text>{item.title} | {item.runtime}</Text>
                    </Surface>
                  </Col>
                )}
              />
              </Row>
            </Grid>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  surface: {
    marginVertical: 10,
    height: 130,
    width: (width / 3 - 2),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
  },
  container: {
    marginHorizontal: 10,
    // backgroundColor: "white"
  },
  renderEpisodes: {
    marginTop: 10
  },
})

const Contents = withNavigation(Content);
function mapStateToProps(state) {
  return {
    data: state.data,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: setUserId,
    getxplorelist: getxplorelist,
    getxplorelistupdate: getxplorelistupdate,
    refresh: refresh,
    getxploreloading: getxploreloading
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Contents);
