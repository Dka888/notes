import { SearchInput } from '../SearchInput/SearchInput';
import './Header.scss';

export function Header() {
    return (
        <header className='header'>
            <div className='header__menu'>
                <img src='/menu.svg' alt='menu' className='header__menu-icon'/>
            </div>
            <div className='header__title'>
                <h1 className='header__title-text'>NOTES</h1>
            </div>
            <div className='header__search'>
                <SearchInput />
            </div>
            <div className='header__options'>
                <div className='header__options-search'>
                    <img src="/search.svg" alt="search" />
                </div>
                <div className='header__options-option'>
                    <img src='/refresh.svg' alt='refresh' />
                </div>
                <div className='header__options-option'>
                    <img src="/logout.svg" alt="logout" />
                </div>
            </div>
        </header>
    )
}