import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

class AutocompleteField extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query: '' };
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

    render() {
        const { query } = this.state;
        const data = this._filterData(query);

        return (
          <Autocomplete
            data={data}
            defaultValue={query}
            onChangeText={text => this.setState({ query: text })}
            autoCapitalize='none'
            renderItem={({ item, i }) => (
              <TouchableOpacity onPress={() => this.setState({ query: item })}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        );
    }
}

export default AutocompleteField;