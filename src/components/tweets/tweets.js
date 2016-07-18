var React = require('react-native');
var {
  View,
  StyleSheet,
  Text
} = React;

var Button = require('../common/button');
var ref = new Firebase("https://reactapplogin.firebaseio.com");

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },
  onSignOut: function() {
    ref.unauth();
    this.props.navigator.immediatelyResetRouteStack([{name: 'signin'}]);
  },
  render: function() {
    var authData = ref.getAuth();

    var username = authData.uid

    return (
      <View style={styles.container}>
        <Text>Welcome back, {username}!</Text>
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
