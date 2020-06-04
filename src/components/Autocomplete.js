import React from 'react';

class Autocomplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query: '' };
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
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        );
    }
}

export default Autocomplete;