import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Video, { Container } from 'react-native-af-video-player';
import { setCurrentCommentId, passCurrentComentReplyObjectData } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class LiveShow extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    // Setup the header and tabBarVisible status
    // const header = state.params && (state.params.fullscreen ? undefined : null)
    const tabBarVisible = state.params ? state.params.fullscreen : true
    // const header = state.params && (state.params.text ? undefined : null)
    // const tabBarVisible = state.params ? state.params.text : false
    return {
      // For stack navigators, you can hide the header bar like so
      header: null,
      // For the tab navigators, you can hide the tab bar like so
      tabBarVisible: false,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      video: {},
      height: 0,
      videoLoading: true,
      refreshing: false
    }
  }
  
  // make avideo fullscreen
  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: status
    })
  }

  render() {
    const theme = {
      title: '#FFF',
      more: '#446984',
      center: '#7B8F99',
      fullscreen: '#446984',
      volume: '#A5957B',
      scrubberThumb: '#234458',
      scrubberBar: '#DBD5C7',
      seconds: '#DBD5C7',
      duration: '#DBD5C7',
      progress: '#446984',
      loading: '#DBD5C7'
    }

    console.log("XXXXXXX", this.props.navigation.state);
    
    
    return (
      <View style={styles.container}>
        <Container>
          <Video
            autoPlay
            ref={(ref) => { this.video = ref }}
            title={this.props.navigation.state.params.title}
            url={this.props.navigation.state.params.url}
            logo={this.props.navigation.state.params.img}
            placeholder={this.props.navigation.state.params.img}
            theme={theme}
            // onMorePress={() => this.onMorePress()}
            onFullScreen={status => this.onFullScreen(status)}
            fullScreenOnly
            rotateToFullScreen
          />
        </Container>
      </View>
    )
  }
}


function mapStateToProps(state) {
  return {
    route: state.route,
    community: state.community,
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentCommentId: setCurrentCommentId,
    passCurrentComentReplyObjectData: passCurrentComentReplyObjectData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveShow);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});
