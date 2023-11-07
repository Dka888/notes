import './SearchInput.scss';
import { useNoteContext } from '../../../context/Context';

export function SearchInput() {
  const { search, setSearch } = useNoteContext();
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
          onClick={() => setSearch('')}
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