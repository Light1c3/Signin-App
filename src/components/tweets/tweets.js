var React = require('react-native');
var {
  View,
  StyleSheet,
  Text
} = React;


module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },
  render: function() {
    if (!this.state.user) {
      return <Text>Loading...</Text>;
    }

    var username = this.state.user.get('username');

    return (
      <View style={styles.container}>
        <Text>Welcome back, {username}!</Text>
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
