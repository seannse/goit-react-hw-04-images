import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState } from 'react';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

function Searchbar({ getQuery, disabled }) {
  const [search, setSearch] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!search.trim()) {
      toast.error('Enter a valid search query');
      setSearch('');
      return;
    }
    getQuery(search);
    setSearch('');
  }

  function handleChange({ target }) {
    setSearch(target.value);
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <ImSearch className={css.SearchForm_button_label} />
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={search}
          onChange={handleChange}
          disabled={disabled}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  getQuery: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Searchbar;
