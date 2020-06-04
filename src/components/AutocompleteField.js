import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

class AutocompleteField extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
          query: '',
          hideResults: false,
          autocompleteUpdateableKey: Math.random(),
        };
        console.log(this.props);
        
    }


    _filterData = query => {
        if (query === '') {
            return [];
        }
                
        const data = this.props.data;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return data.filter(value => value.name.search(regex) >= 0);
    }

    renderItem = ({ item }) => {
      return (
        <TouchableOpacity  onPress={() => {
          this.setState({ query: item.name }); 
          this.props.onPressCallback(item);
        }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );
    }

    render() {
      let { query } = this.state;
      const { label, defaultValue } = this.props;  
      const data = this._filterData(this.state.query);
      console.log(this.state.query);
      
      return (
        <ScrollView style={{
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          marginBottom: 15,
        }}>

          <Text style={{ marginBottom: 12, fontSize: 14, color: '#C5C5C5' }}>
            {label}
          </Text>
          <Autocomplete
            data={data}
            key={this.state.autocompleteUpdateableKey}
            defaultValue={ query === '' ? defaultValue : query }
            style={styles.autocomplete}
            onChangeText={text => this.setState({ query: text })}
            autoCapitalize='none'
            onBlur={() => this.setState({ hideResults: true })}
            onFocus={() => this.setState({ hideResults: false })}
            hideResults={this.state.hideResults ? this.state.hideResults : undefined}
            renderItem={this.renderItem.bind(this)}
          />
        </ScrollView>
      );
  }
}


const styles = StyleSheet.create({
  autocomplete: {
    fontSize: 16,
    fontWeight: '500',
    color: '#364047',
    paddingBottom: 10,
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },  
});

export default AutocompleteField;