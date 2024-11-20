import './SearchInput.scss';
import { useNoteContext } from '../../../context/Context';
import { useCallback } from 'react';

interface SearchInputProps {
  setIsSearch: (isSearch: boolean) => void,
}

export function SearchInput({setIsSearch}: SearchInputProps) {
  const { search, setSearch } = useNoteContext();

  const handleCloseSearch = useCallback(() => {
    setIsSearch(false);
    setSearch('')
  }, [setIsSearch, setSearch]);

  return (
    <form
      className='search-form'
    >
      <div className="search">
        <div
          className="search-image"
        >
          <img src="/search.svg" alt="search" />
        </div>
        <div className='search-close'
          onClick={handleCloseSearch}
        >
          <img src="/close.svg" alt="close" />
        </div>
        <input
          name="search"
          type="text"
          className="search-input"
          placeholder="Szukaj"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
    </form>

  )
}