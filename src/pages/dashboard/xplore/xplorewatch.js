import React, { Component } from 'react';
import { View, Text, Button, Icon } from 'native-base';

class XploreWatch extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View>
          <Text style={{ color: 'white', fontSize: 20 }} >{navigation.state.params.name}</Text>
        </View>
      ),
      headerLeft: (
        <Button
          transparent
          onPress={() => navigation.goBack()}
          // style={{ backgroundColor: 'black' }}
        >
          <Icon name='ios-arrow-round-back' size={30} style={{ color: '#f48221' }} />
        </Button>
      ),
      headerStyle: {
        backgroundColor: 'black',
        // marginTop: 200,
        height: 40,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  };

  render() {
    return (
      <View>
        <Text>
          XploreWatch
        </Text>
      </View>
    );
  }
}

export default XploreWatch;