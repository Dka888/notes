import { SearchInput } from './SearchInput/SearchInput';
import './Header.scss';
import { NavbarOption } from '../../utils/Types';
import { useNoteContext } from '../../context/Context';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';

interface HeaderProps {
    toggleExpand(): void;
}

export function Header({toggleExpand}: HeaderProps) {
    const [isSearch, setIsSearch] = useState(false);
    const {handleChangeNavbarOption} = useNoteContext();

    const handleLogout = useCallback(() => {
        localStorage.clear();
    },[]);

    const handleReset = () => {
        handleChangeNavbarOption(NavbarOption.clearNotes);
    }

    return (
        <header className='header'>
            <div className='header__menu'
            onClick={toggleExpand}>
                <img src='/menu.svg' alt='menu' className='header__menu-icon'/>
            </div>
            <div className='header__title'>
                <h1 className='header__title-text'>NOTES</h1>
            </div>
            <div className={`header__search ${isSearch ? '': 'header__search-hide'}`}>
                <SearchInput setIsSearch={setIsSearch} />
            </div>
            <div className='header__options'>
                <div className='header__options-search' onClick={() => setIsSearch(!isSearch)}>
                    <img src="/search.svg" alt="search" />
                </div>
                <Link to='/'
                    className='header__options-option'
                    onClick={handleReset}
                >
                    <img src='/refresh.svg' alt='refresh' />
                </Link>
                <Link to='/login'
                    className='header__options-option'
                    onClick={handleLogout}
                >
                    <img src="/logout.svg" alt="logout" />
                </Link>
            </div>
        </header>
    )
}