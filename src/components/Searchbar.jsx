import React from 'react';

import PropTypes from 'prop-types';

class Searchbar extends React.Component {
  state = {
    value: '',
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value.toLocaleLowerCase());
  };

  render() {
    return (
      <form className="box" onSubmit={this.onSubmit}>
        <div className="container-1">
          <button className="icon" type="submit">
            <i className="fa fa-search"></i>
          </button>
          <input
            name="query"
            value={this.state.value}
            type="search"
            id="search"
            placeholder="Search..."
            onChange={this.onChange}
            required
          />
        </div>
      </form>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
