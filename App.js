import * as React from 'react';
import { Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'

class HomeScreen extends React.Component {
  render(){
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Main Page</Text>
        </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default createAppContainer(AppNavigator);
