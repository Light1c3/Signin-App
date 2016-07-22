var React = require('react-native');
var Firebase = require('firebase');
var {
  View,
  Text,
  StyleSheet,
  TextInput
} = React;

var Parse = require('parse/react-native');
var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => this.setState({email: text})}
          />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          />

        <Text style={styles.errorLabel}>{this.state.errorMessage}</Text>
        <Button text={'Sign In'} onPress={this.onPress} />
        <Button text={'I need an account...'} onPress={this.onSignupPress} />
      </View>
    );
  },
  onSignupPress: function() {
    this.props.navigator.push({name: 'signup'});
  },
  onPress: function() {
    var ref = new Firebase("https://reactapplogin.firebaseio.com");
    var self = this;
    ref.authWithPassword({
      email    : this.state.email,
      password : this.state.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        self.setState({errorMessage: 'Please check your credentials and try again'});
      } else {
        console.log("Authenticated successfully with payload:", authData);
        return self.props.navigator.immediatelyResetRouteStack([{name: 'homepage'}]);
      }
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  label: {
    fontSize: 18
  },
  errorLabel: {
    fontSize: 12,
    color: 'red'
  }
});
