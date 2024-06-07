import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import { NoteOption, NoteType } from '../../../utils/Types';
import './ModalNote.scss';
import { useEffect, useState, useCallback } from 'react';
import { editPartNote, deleteNote } from '../../../API/api';
import { useNoteContext } from '../../../context/Context';
import { toast, ToastContainer } from 'react-toastify';
import { Loading } from '../../Loading/Loading';
import classNames from 'classnames';

interface ModalNoteProps {
    selectedNote: NoteType | null,
    closeNotePopup: () => void,
    option: NoteOption | null,
}

export const ModalNote = ({ selectedNote, closeNotePopup, option }: ModalNoteProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [contentArray, setContentArray] = useState<string[]>([]);
    const [textarea, setTexarea] = useState(false);
    const [titleShow, setTitleShow] = useState(false);

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content);
        }
    }, [selectedNote]);

    const {loadingData, isLoading} = useNoteContext();


    const saveNoteChanges = useCallback(async () => {
        const checksContent = contentArray.join('\n');

        if(selectedNote !== null) {
        const newNote = {...selectedNote};
            if (title !== selectedNote.title || content !== selectedNote.content) {
                newNote.title = title || selectedNote.title;
                newNote.content = content || selectedNote.content;
                try {
                    const response = await editPartNote(newNote, selectedNote?.id);
                    if (response?.status === 200) {
                        loadingData(); 
                        toast.success('Notatka została zmieniona');
                        setTimeout(() => {
                            setTitle('');
                            setContent('');
                            closeNotePopup();
                           
                        }, 1000);
                    }

                } catch (e) {
                        toast.error('Coś poszło nie tak...')
                }
            } else if (checksContent !== selectedNote.content) {
                newNote.title = title || selectedNote.title;
                newNote.content = checksContent || selectedNote.content;
                try {
                    const response = await editPartNote(newNote, selectedNote?.id);
                    if (response?.status === 200) {
                        loadingData(); 
                        toast.success('Notatka została zmieniona');
                        setTimeout(() => {
                            setTitle('');
                            setContent('');
                            closeNotePopup();
                           
                        }, 1000);
                    }

                } catch (e) {
                        toast.error('Coś poszło nie tak...')
                }
            } else {
                closeNotePopup();
            }
        }
    }, [closeNotePopup, content, contentArray, loadingData, selectedNote, title]);

    const removeNote = async() => {
        if(selectedNote){
            try{
                const response = await deleteNote(selectedNote.id);
            if (response?.status === 204) {
                loadingData();
                toast.success('Notatka została usunięta');
                setTimeout(() => {
                    setTitle('');
                    setContent('');
                    closeNotePopup();
                   
                }, 1000);    
            }
            } catch(e) {
                toast.error('Notatka nie została usunięta. Spróbuj później')
            }
        }
    }


    useEffect(() => setContentArray(content.split('\n')),[content]);

    const handleChangeContent = useCallback((index: number) => {
        setContentArray(contentArray.map((item, i) => {
            if (i === index) {
                if (item.includes('✓')) {
                   return item.slice(0, item.length - 2);
                }
                return `${item} ✓`;
            }
            return item
        }));

    }, [contentArray]);


    const handleTextareaSwitch = useCallback(() => {
        setTexarea(!textarea);
    }, [textarea]);

    const handleTitleSwitch = useCallback(() => {
        setTitleShow(!titleShow)
    },[titleShow])


    return (
        <Popup
            open={selectedNote !== null && option === null}
            onClose={closeNotePopup}
            contentStyle={{maxWidth: '400px'}}
        >
            <div className="notePopup">
                <div className='notePopup__item' onDoubleClick={handleTitleSwitch}>
                    <h2>Tytuł</h2>
                    {titleShow 
                    ?<input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    :<div>{title}</div>}
                </div>
                <div className='notePopup__item' onDoubleClick={handleTextareaSwitch}>
                    <h2>Treść</h2>
                    { textarea ?<textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                    /> 
                     : <>{contentArray.map((item, index) => {

                        const isChecked = item.includes('✓');
                        return (
                            <li 
                                key={item} 
                                className={classNames('popup__list', {'completed':selectedNote?.completed})}
                                onDoubleClick={handleTextareaSwitch}
                            >
                            <p style={{margin: '0'}}>{item}</p>
                            <input 
                                className='popup__checkbox' 
                                type='checkbox'
                                defaultChecked={isChecked ? true : false}
                                onClick={() => handleChangeContent(index)}    
                            />
                        </li>
                        )
                    })}</>
                }
                </div>
                {isLoading ? <div style={{ margin: '0 auto' }}><Loading color={'green'} /></div>
                    : <div className='notePopup__buttons'>
                    <button onClick={saveNoteChanges}>Zapisz</button>
                    <button onClick={removeNote}>Usuń notatkę</button>
                    {textarea 
                        ? <button onClick={handleTextareaSwitch}>Zamknij</button>
                        : <button onClick={closeNotePopup}>Zamknij</button>}
                    </div>}
            </div>
            <ToastContainer />
        </Popup>
    );
};
