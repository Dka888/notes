import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { getNotes } from "../API/api";
import { NoteType } from "../utils/Types";


interface NoteContext {
    notes: NoteType[],
    loadingData: () => void,
    isLogin: boolean,
    editNote: NoteType | null,
    editionNote: (note: NoteType | null) => void,
}

export const NoteContext = createContext<NoteContext>({
    notes: [],
    loadingData: () => { },
    isLogin: false,
    editNote: null,
    editionNote: () => { },
});

export const NoteContextProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [editNote, setEditNote] = useState<NoteType | null>(null);

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
    }, [])

    return <NoteContext.Provider value={{
        notes,
        loadingData,
        isLogin,
        editNote,
        editionNote,
    }}>{children}</NoteContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNoteContext = () => useContext(NoteContext);