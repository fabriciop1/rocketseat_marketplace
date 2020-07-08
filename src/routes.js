import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import Main from './pages/main'
import Product from './pages/product'

const AppNavigator = createStackNavigator({
  Main,
  Product
}, {
  defaultNavigationOptions: {
    headerStyle: {backgroundColor: "#2F95D6"},
    headerTintColor: "#FFF"
  }
}) 

const App = createAppContainer(AppNavigator)

export default App