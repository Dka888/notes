import './FormNote.scss';

export function FormNote() {
    return (
        <form className="formNote">

            <input
                type="text"
                name="formNote"
                className="formNote__input"
                placeholder='Utwórz notatkę...' />

        </form>
    )
}