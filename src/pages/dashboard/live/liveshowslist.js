import React, { Component } from 'react'
import CountDown from 'react-native-countdown-component';
import { StyleSheet, View, Text,
  TouchableOpacity
 } from 'react-native';
// import Video, { Container } from 'react-native-af-video-player';
import Video from 'react-native-video';
import { Get } from '../../../components/reuse/get';
import { getlive, getliveposter, getlivevideo } from "../../../store/actions/data";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from "native-base";


class Liveshowslist extends Component {
  static navigationOptions = {
    header: null
  }
  
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
    count: ''
  };

  // componentDidMount(){
    // Get("/vod/get_by_id/?id=5b9ff05602abf80597276861").then(res => {
    //   if (!res.error) {
    //     this.props.getlive(res.content.entries[0]);
    //     res.content.entries[0].content.forEach(element => {
    //       element.assetTypes[0] == "Mezzanine Video" &&
    //         this.props.getlivevideo(element.downloadUrl);
    //     });
    //     res.content.entries[0].content.forEach(element => {
    //       element.assetTypes[0] == "Poster H" &&
    //         this.props.getliveposter(element.downloadUrl);
    //     }); 
    //   } 
    // })
    // Get("/")
  // }

  componentDidMount = () => {
    Get("/mobile_config/get_countdown").then(res => {
      if (!res.error) {
        let t1 = new Date(res.content);
        console.log("cur", t1);
        let t2 = new Date();
        let dif = t1 - t2.getTime();
        console.log("cur", dif);

        let Seconds_from_T1_to_T2 = dif / 1000;
        console.log("SEC", Seconds_from_T1_to_T2);
        let Seconds_Between_Dates = Math.round(Seconds_from_T1_to_T2);
        this.setState({
          count: Seconds_Between_Dates
        })
      }
    })
    
  }
  

  video: Video;

  onLoad = (data) => {
    this.setState({ duration: data.duration });
  };

  onProgress = (data) => {
    if(this.props.navigation.state.routeName !== "LiveShowsList") {
      this.setState({ paused: true })
    }
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    this.setState({ paused: true });
    this.video.seek(0);
  };

  onAudioBecomingNoisy = () => {
    this.setState({ paused: true })
  };

  onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    this.setState({ paused: !event.hasAudioFocus })
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  renderRateControl(rate) {
    const isSelected = (this.state.rate === rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode === resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume === volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    // const flexCompleted = this.getCurrentTimePercentage() * 100;
    // const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    console.log(this.state);
    console.log(this.props.navigation.state);
    
    const data = this.props.data;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => this.setState({ paused: !this.state.paused })}
        >
          <Video
            ref={(ref: Video) => { this.video = ref }}
            source={{ uri: "https://uvodscp-lh.akamaihd.net/i/rjrretvdirect_1@506691/master.m3u8" }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>
        </View>
        {
          this.state.count !== "" &&
          <CountDown
            until={1538265600}
            onFinish={() => alert('finished')}
            onPress={() => alert('hello')}
            size={20}
            digitBgColor="#f48221"
            timeTxtColor="white"
          />
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.data
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getlive: getlive,
    getliveposter: getliveposter,
    getlivevideo: getlivevideo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Liveshowslist);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});


{/* <View style={styles.rateControl}>
              {this.renderRateControl(0.25)}
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(1.5)}
              {this.renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View> */}


          {/* <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
              <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
            </View>
          </View> */}