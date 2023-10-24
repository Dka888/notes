import './SearchInput.scss';

export function SearchInput() {
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
        <div className='search-close'>
            <img src="/close.svg" alt="close" />
        </div>
        <input
          name="search"
          type="text"
          className="search-input"
          placeholder="Szukaj"
        />
      </div>
    </form>
       
    )
}