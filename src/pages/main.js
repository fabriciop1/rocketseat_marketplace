import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import api from '../services/api'

export default class Main extends React.Component {
    static navigationOptions = {
          headerTitleStyle: { alignSelf: 'center' },
          title: "Marketplace"
    }

    state = {
      productInfo: {},
      docs: [],
      page: 1
    }

    componentDidMount() {
      this.loadProducts()
    }

    loadProducts = async (page=1) => {
      try {
        const response = await api.get(`/products?page=${page}`)
        const { docs, ...productInfo } = response.data
        this.setState({
          productInfo,
          docs: [...this.state.docs, ...docs], 
          page
        })
      } catch (error) {
        console.log(Object.keys(error))
      }
    }

    renderItem = ({ item }) => (
      <View style={styles.productContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <TouchableOpacity 
          style={styles.productButton} 
          onPress={() => {
            this.props.navigation.navigate("Product", {product: item})
          }}
        >
          <Text style={styles.productButtonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    )

    loadMore = () => {
      const { page, productInfo } = this.state
      if (page === productInfo.page) return
      const pageNumber = page + 1
      this.loadProducts(pageNumber)
    }

    render() {
      return (
        <View style={styles.container}>
          <FlatList 
            contentContainerStyle={styles.list}
            data={this.state.docs}
            keyExtractor={item => item._id}
            renderItem={this.renderItem}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.1}
          />
        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  list: {
    padding: 20
  },
  productContainer: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#2577AB",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  productButtonText: {
    fontSize: 16,
    color: "#2577AB",
    fontWeight: "bold"
  }
})