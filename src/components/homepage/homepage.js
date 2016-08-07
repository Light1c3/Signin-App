var React = require('react-native');
var {
  View,
  StyleSheet,
  ToastAndroid,
  Text
} = React;

var Button = require('../common/button');
var mainRef = new Firebase("https://reactapplogin.firebaseio.com");

module.exports = React.createClass({
  getInitialState: function() {
    var authData = mainRef.getAuth();
    var ref = new Firebase("https://reactapplogin.firebaseio.com/users/" + authData.uid)
    var user = ''
    ref.once("value", function(data) {
      user = data.username;
      console.log(data);
      ToastAndroid.show('Data: ' + user, ToastAndroid.SHORT)
    });
    return {
      username: user
    };
  },
  onSignOut: function() {
    mainRef.unauth();
    this.props.navigator.immediatelyResetRouteStack([{name: 'signin'}]);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text>Welcome back, {this.state.username}!</Text>
        <Button text={'Signout'} onPress={this.onSignOut} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
