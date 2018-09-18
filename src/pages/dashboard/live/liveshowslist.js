import React, { Component } from 'react'
import CountDown from 'react-native-countdown-component';
import { StyleSheet, View } from 'react-native';
import Video, { Container } from 'react-native-af-video-player';
import { Get } from '../../../components/reuse/get';
import { getlive, getliveposter, getlivevideo } from "../../../store/actions/data";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from "native-base";


class Liveshowslist extends Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount(){
    Get("/vod/get_by_id/?id=5b9ff05602abf80597276861").then(res => {
      if (!res.error) {
        this.props.getlive(res.content.entries[0]);
        res.content.entries[0].content.forEach(element => {
          element.assetTypes[0] == "Mezzanine Video" &&
            this.props.getlivevideo(element.downloadUrl);
        });
        res.content.entries[0].content.forEach(element => {
          element.assetTypes[0] == "Poster H" &&
            this.props.getliveposter(element.downloadUrl);
        }); 
      } 
    })
  }

  play() {
    this.video.play()
    this.video.seekTo(25)
  }

  pause() {
    this.video.pause()
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
    const data = this.props.data;
    return (
      <View style={styles.container}>
      {
        data.liveVideo !== ""  && data.livePoster !== "" ?
        <Video
          // autoPlay
          ref={(ref) => { this.video = ref }}
          title={data.live.title}
          url={
            // data.liveVideo

            "https://uvodscp-lh.akamaihd.net/i/rjrretvdirect_1@506691/master.m3u8"
          }
          logo={
            data.livePoster
          }
          placeholder={
            data.livePoster
          }
          theme={theme}
          onFullScreen={status => this.onFullScreen(status)}
          // fullScreenOnly
          rotateToFullScreen
        />
        :
        <View
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Spinner color="white" />
        </View>
      }
          
        <CountDown
          until={100000}
          onFinish={() => alert('finished')}
          onPress={() => alert('hello')}
          size={20}
          digitBgColor="#f48221"
          timeTxtColor="white"
        />
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
    backgroundColor: 'black'
  },
});




















































// import React, { Component } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
// // import firebase from 'react-native-firebase';
// import { withNavigation } from 'react-navigation';
// import { Thumbnail, Content, Spinner, Icon } from 'native-base';
// import { Get } from '../../../components/reuse/get'
// // import { Image } from 'native-base';
// // import gone from '../../../assets/aqua.jpg';


// class LiveSHowsList extends Component {
//   static navigationOptions = ({ navigation }) => {
//     return {
//       headerTitle: (
//         <View style={{ paddingLeft: 20 }} >
//           <Text style={{ color: '#372B25', fontSize: 20 }} >My Live Shows</Text>
//         </View>
//       ),
//       headerStyle: {
//         backgroundColor: '#f48221',
//         height: 40,
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       }
//     }
//   };

//   constructor(props) {
//     super(props);
    
//     this.state = {
//       list: [],
//       loading: true,
//       more: '',
//       user: []
//     }
//   }

//   async getdata() {
//     let user = await AsyncStorage.getItem('user');
//     if (user !== null) {
//       this.setState({ user: JSON.parse(user) })
//     }
//   }

//   // componentDidMount() {
//   //   this.getdata();
//   //   Get('/api/getliveshows').then((res) => {
//   //     this.setState({
//   //       list: res, loading: false,
//   //     })
//   //   })
//   // }
  
  
//   render() {
//     return (
//       <Content style={{ backgroundColor: "black", padding: 10 }}>
//         {this.state.loading ? (
//           <View
//             contentContainerStyle={{
              
//               alignItems: "center",
//               justifyContent: "center"
//             }}
//           >
//             {/* <Spinner color="white" /> */}
//             <Icon name="ios-alert" style={{ flex: 1, textAlign: "center", fontSize: 50, color: "white" }} />
//             <Text style={{ textAlign: "center", color: "white" }} >An Update will be available soon</Text>
//           </View>
//         ) : (
//         <View style={{ flex: 1, justifyContent: "flex-start" }}>
//           <FlatList
//             data={this.state.list}
//             keyExtractor={(item, index) => item + index}
//             renderItem={({ item }) => (
//               <View style={styles.body} >
//                 <TouchableOpacity onPress={() => this.props.navigation.navigate('LiveShow', {item:item, user: this.state.user } )} >
//                   <View style={{ flexDirection: 'row' }} >
//                     {/* <Thumbnail large source={gone} /> */}
//                     <Thumbnail large source={{ uri: item.img }} />
//                     <View style={{ flexDirection: 'column' }} >
//                       {/* <Text style={styles.liveName} >The Swap</Text> */}
//                       <Text style={styles.liveName} >{item.title}</Text>
//                       <Text style={{ color: '#9E9E9E', paddingLeft: 10, paddingRight: 20 }}>
//                         {/* yghbe i f jkfnijkjm jnfijkn ffhghbd... */}
//                         {item.summary.substr(0, 80) + ' ...'}
//                       </Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//               )}
//             />
//           </View>
//         )}
//       </Content>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 10,
//     backgroundColor: 'black'
//   },
//   liveName: { 
//     color: "#FB8C00", 
//     paddingTop: 10, 
//     paddingHorizontal: 5, 
//     paddingBottom: 5, 
//     fontWeight: '700' 
//   },
//   summary: {
//     color: "white"
//   },
//   body: {
//     flex: 1,
//     padding: 10
//   }
// })

// export default withNavigation(LiveSHowsList);









// {/* <Content style={{ backgroundColor: "black", padding: 10 }}>
//   {this.state.loading ? (
//     <View
//       contentContainerStyle={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center"
//       }}
//     >
//       <Spinner color="white" />
//     </View>
//   ) : (
//       <View style={{ flex: 1, justifyContent: "flex-start" }}>
//         <FlatList
//           data={this.state.list}
//           keyExtractor={(item, index) => item + index}
//           renderItem={({ item }) => (
//             <View style={{ flex: 1 }} >
//               <TouchableOpacity onPress={() => this.props.navigation.navigate('LiveShow', { item: item, user: this.state.user })} >
//                 <View style={{ flexDirection: 'row' }} >
//                   <Thumbnail large source={{ uri: item.img }} />
//                   <Thumbnail large source={gone} />
//                   <Text style={styles.liveName} >{item.title}</Text>
//                   <Text style={styles.liveName} >The Swap</Text>
//                 </View>
//               </TouchableOpacity>
//               <View style={{ flex: 1, paddingTop: 10 }}>
//                 {
//                   item.summary.length > 150 ?
//                     this.state.more !== item.id ?
//                       <View style={{ flexDirection: "row" }}>
//                         <Text style={styles.summary}>
//                           {item.summary.substring(0, 1580)}
//                         </Text>
//                         <TouchableOpacity onPress={() => this.setState({ more: item.id })} >
//                           <Text style={{ color: 'orange' }} > ...see more</Text>
//                         </TouchableOpacity>
//                       </View>
//                       :
//                       <Text style={styles.summary}>{item.summary}</Text>
//                     :
//                     <Text style={styles.summary}>{item.summary}</Text>
//                 }
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     )}
// </Content> */}