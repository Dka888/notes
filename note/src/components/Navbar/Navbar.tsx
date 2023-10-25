import './Navbar.scss';

interface NavbarProps {
    expanded: boolean,
}

export function Navbar({expanded}: NavbarProps) {

    return (
        <nav className={`navbar ${expanded ? 'expanded' : ''}`}>
            <div className='navbar__option'>
                <img src='/lightbulb.svg' alt='notatki'/>
                <p className='navbar__option-item'>Notatki</p>
            </div>
            <div className='navbar__option'>
                <img src='/notifications.svg' alt='notifications'/>
                <p className='navbar__option-item'>Powiadomienia</p>
            </div>
            <div className='navbar__option'>
                <img src='/pen.svg' alt='edition'/>
                <p className='navbar__option-item'>Edycja</p>
            </div>
            <div className='navbar__option'>
                <img src='/archive.svg' alt='archive'/>
                <p className='navbar__option-item'>Archiwum</p>
            </div>
            <div className='navbar__option'>
                <img src='/delete.svg' alt='delete'/>
                <p className='navbar__option-item'>Kosz</p>
            </div>
        </nav>
    )
}