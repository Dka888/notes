import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getNotes } from "../API/api";
import { NoteType } from "../utils/Types";


interface NoteContext {
    notes: NoteType[],
    loadingData: () => void,
    isLogin: boolean,
    editNote: NoteType | null,
    editionNote: (note: NoteType | null) => void,
    handleClearNotes: () => void,
    shownNotes: NoteType[],
    handleChangeNotification: () => void,
}

export const NoteContext = createContext<NoteContext>({
    notes: [],
    loadingData: () => { },
    isLogin: false,
    editNote: null,
    editionNote: () => { },
    handleClearNotes: () => {},
    handleChangeNotification: () => {},
    shownNotes: [],
});

export const NoteContextProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [editNote, setEditNote] = useState<NoteType | null>(null);
    const [clearNotes, setClearNotes] = useState(true);
    const [isNotification, setIsNotification] = useState(false);

    const editionNote = useCallback((note: NoteType | null) => {
        setEditNote(note)
    }, []);

    const loadingData = useCallback(async () => {
        const data = await getNotes();
        setNotes(data);

        return data;
    }, [])

    useEffect(() => {
        loadingData();
    }, [loadingData]);


    useEffect(() => {
        const checkLoginUser = () => {
            const { length } = localStorage
            setIsLogin(!!length)
        }
        checkLoginUser();
    }, []);

    const handleClearNotes = () => {
        setClearNotes(true);
        setIsNotification(false);
    }

    const handleChangeNotification = () => {
        setClearNotes(false);
        setIsNotification(true);
    }


    const shownNotes = useMemo(()=> {
        let FilteredNotes = notes;
        if(clearNotes) {
            FilteredNotes = notes.filter(note => !note.forDelete)
        }

        if(isNotification) {
            FilteredNotes = notes.filter(note => note.notification);
        }

        return FilteredNotes;
    }, [notes, clearNotes, isNotification])

    return <NoteContext.Provider value={{
        notes,
        loadingData,
        isLogin,
        editNote,
        editionNote,
        handleClearNotes,
        shownNotes,
        handleChangeNotification
    }}>{children}</NoteContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNoteContext = () => useContext(NoteContext);