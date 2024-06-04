import { useNoteContext } from '../../context/Context';
import { NavbarOption } from '../../utils/Types';
import './Navbar.scss';

interface NavbarProps {
    expanded: boolean,
    setExpanded: (expanded: boolean) => void;
    expandPermanent: boolean;
}

export function Navbar({expanded, setExpanded, expandPermanent}: NavbarProps) {

    const { handleChangeNavbarOption } = useNoteContext();


    return (
        <nav className={`navbar ${(expanded || expandPermanent) ? 'expanded' : ''}`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <div className='navbar__option'
                onClick={() => handleChangeNavbarOption(NavbarOption.clearNotes)} >
                <img src='/lightbulb.svg' alt='notatki'/>
                <p className='navbar__option-item'>Notatki</p>
            </div>
            <div
                className='navbar__option'
                onClick={() => handleChangeNavbarOption(NavbarOption.notification)}
            >
                <img src='/notifications.svg' alt='notifications'/>
                <p className='navbar__option-item'>Powiadomienia</p>
            </div>
            <div 
                className='navbar__option'
                onClick={() => handleChangeNavbarOption(NavbarOption.edition)}
            >
                <img src='/pen.svg' alt='edition'/>
                <p className='navbar__option-item'>Edycja</p>
            </div>
            <div
                className='navbar__option'
                onClick={() => handleChangeNavbarOption(NavbarOption.archive)}
            >
                <img src='/archive.svg' alt='archive'/>
                <p className='navbar__option-item'>Archiwum</p>
            </div>
            <div
                className='navbar__option'
                onClick={() => handleChangeNavbarOption(NavbarOption.forDelete)}
            >
                <img src='/delete.svg' alt='delete'/>
                <p className='navbar__option-item'>Kosz</p>
            </div>
        </nav>
    )
}