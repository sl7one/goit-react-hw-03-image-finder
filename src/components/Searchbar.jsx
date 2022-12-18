import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  return (
    <form className="box" onSubmit={onSubmit}>
      <div className="container-1">
        <button className="icon" type="submit">
          <i className="fa fa-search"></i>
        </button>
        <input name="query" type="search" id="search" placeholder="Search..." />
      </div>
    </form>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
