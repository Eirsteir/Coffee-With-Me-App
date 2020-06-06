// @flow
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';


export type Props = {|
  /** callback function used on click */
  clicked?: () => mixed,
  /** initial follow state */
  invited?: boolean,
|};

export type State = {
  invited: boolean,
};


class InviteButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { invited: this.props.invited || false };
  }

  static defaultProps = {
    invited: false,
  };

  render() {
    const { clicked } = this.props;

    return (
      <TouchableOpacity onClick={clicked}>
        <View
          colors={
            this.state.invited ? ['#ccc', '#ccc'] : ['#008DFF', '#0079FF']
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {this.state.invited ? 'Invited' : 'Invite'}
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

export default InviteButton;