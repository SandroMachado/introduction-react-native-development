import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      convertedAmount: null,
      isLoading: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ amount: text })}
          placeholder="Insert the amount"
        />

        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ originCurrency: text})}
          placeholder="Insert the origin currency"
        />

        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ destinationCurrency: text})}
          placeholder="Insert the destination currency"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text>Convert</Text>
        </TouchableOpacity>

        {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}

        <Text>
          {this.state.convertedAmount ? this.state.convertedAmount : "Amount converted"}
        </Text>
      </View>
    );
  }

  onPress = () => {
    this.setState({
      isLoading: true
    });

    fetch(`https://api.uphold.com/v0/ticker/${this.state.originCurrency}${this.state.destinationCurrency}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          convertedAmount: responseJson.ask * this.state.amount
        });

        return responseJson.ask;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      })
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40, 
    width: '80%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    margin: 10,
    height: 40, 
    width: '80%', 
    borderColor: 'gray', 
    borderWidth: 1
  }
});
