import * as React from 'react';
import { Searchbar } from 'react-native-paper';

interface SearchBarProps {
  handleSubmit: (search: string) => void;
  placeholder: string;
  handleClear: () => void;
}

export class SearchBar extends React.Component<SearchBarProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    search: '',
  };

  handleSearchBar = (search: string) => {
    if (!search) {
      // No search (Or search cleared) clear the food list
      this.props.handleClear();
    }
    this.setState({ search });
  };

  handleSubmit = () => {
    //only use callback (and force re-render of parent component) when text is submitted
    this.props.handleSubmit(this.state.search);
  };

  render() {
    const { placeholder } = this.props;

    return (
      <Searchbar
        placeholder={placeholder}
        onChangeText={this.handleSearchBar}
        onSubmitEditing={this.handleSubmit}
        value={this.state.search}
      />
    );
  }
}
