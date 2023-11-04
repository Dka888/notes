import { SearchInput } from './SearchInput/SearchInput';
import './Header.scss';
import { NavbarOption } from '../../utils/Types';
import { useNoteContext } from '../../context/Context';

interface HeaderProps {
    toggleExpand(): void;
}

export function Header({toggleExpand}: HeaderProps) {

    const {handleChangeNavbarOption} = useNoteContext();

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    const handleReset = () => {
        handleChangeNavbarOption(NavbarOption.clearNotes);
        window.location.href = '/';
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
            <div className='header__search'>
                <SearchInput />
            </div>
            <div className='header__options'>
                <div className='header__options-search'>
                    <img src="/search.svg" alt="search" />
                </div>
                <div
                    className='header__options-option'
                    onClick={handleReset}
                >
                    <img src='/refresh.svg' alt='refresh' />
                </div>
                <div
                    className='header__options-option'
                    onClick={handleLogout}
                >
                    <img src="/logout.svg" alt="logout" />
                </div>
            </div>
        </header>
    )
}