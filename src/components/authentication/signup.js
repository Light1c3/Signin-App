var React = require('react-native');
var Firebase = require('firebase');

var {
  Text,
  View,
  StyleSheet,
  TextInput,
  ToastAndroid
} = React;

var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: ''
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
        value={this.state.username}
        onChangeText={(text) => this.setState({username: text})}
        style={styles.input} />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(text) => this.setState({email: text})}
          style={styles.input} />


        <Text style={styles.label}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          style={styles.input} />

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.passwordConfirmation}
          onChangeText={(text) => this.setState({passwordConfirmation: text})}
          style={styles.input} />

        <Text style={styles.errorLabel}>{this.state.errorMessage}</Text>
        <Button text={'Signup'} onPress={this.onSignUpPress} />
        <Button text={'I have an account...'} onPress={this.onSigninPress} />
      </View>
    );
  },
  onSignUpPress: function() {
    if (this.state.password !== this.state.passwordConfirmation ) {
      return this.setState({errorMessage: 'Your passwords do not match'});
    }
    var self = this;
    let ref = new Firebase("https://reactapplogin.firebaseio.com");
    ref.createUser({
      email    : this.state.email,
      password : this.state.password
    }, function(error, userData) {
      if (error) {
        return this.setState({errorMessage: 'Error creating user'});
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        ToastAndroid.show('Account Created', ToastAndroid.SHORT)
        return self.props.navigator.pop();

      }
    });
  },
  onSigninPress: function() {
    this.props.navigator.pop();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  label: {
    fontSize: 18
  },
  errorLabel: {
    color: 'red'
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
  }
});
