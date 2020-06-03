// @flow
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';


export type Props = {|
  /** callback function used on click */
  clicked?: () => mixed,
  /** initial follow state */
  added?: boolean,
|};

export type State = {
    added: boolean,
};


class AddFriendButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { added: this.props.added || false };
  }

  static defaultProps = {
    added: false,
  };

  render() {
    const { clicked } = this.props;

    return (
      <TouchableOpacity onClick={clicked}>
        <View
          colors={
            this.state.added ? ['#ccc', '#ccc'] : ['#008DFF', '#0079FF']
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {this.state.added ? 'Friend Request Sent' : 'Add Friend'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 5,
    backgroundColor: '#FF5252',
  },
  buttonText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
});

export default AddFriendButton;