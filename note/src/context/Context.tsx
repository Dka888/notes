import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getCookie, getNotes } from "../API/api";
import { NavbarOption, NoteType } from "../utils/Types";
import Cookies from 'js-cookie';


interface NoteContext {
    notes: NoteType[],
    loadingData: () => void,
    isLogin: boolean,
    editNote: NoteType | null,
    editionNote: (note: NoteType | null) => void,
    shownNotes: NoteType[],
    search: string,
    setSearch: (search: string) => void,
    handleChangeNavbarOption: (NavbarOption: NavbarOption) => void,
    navbar: NavbarOption;
    isLoading: boolean;
    cookies: Record<string, string>;
    setCookie: (name: string, value: string, options?: Cookies.CookieAttributes) => void;
    removeCookie: (name: string) => void;
}

export const NoteContext = createContext<NoteContext>({
    notes: [],
    loadingData: () => { },
    isLogin: false,
    editNote: null,
    editionNote: () => { },
    shownNotes: [],
    search: '',
    setSearch: () => { },
    handleChangeNavbarOption: () => { },
    navbar: NavbarOption.clearNotes,
    isLoading: false,
    cookies: {},
    setCookie: () => {},
    removeCookie: () => {}
});

export const NoteContextProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [editNote, setEditNote] = useState<NoteType | null>(null);
    const [search, setSearch] = useState('');
    const [navbar, setNavbar] = useState(NavbarOption.clearNotes);
    const [isLoading, setIsLoading] = useState(false);
    const [cookies, setCookies] = useState<Record<string, string>>({});

    const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes) => {
        Cookies.set(name, value, options);
        setCookies(prevCookies => ({ ...prevCookies, [name]: value }));
      };

      const removeCookie = (name: string) => {
        Cookies.remove(name);
        setCookies(prevCookies => {
          const newCookies = { ...prevCookies };
          delete newCookies[name];
          return newCookies;
        });
      };

    const editionNote = useCallback((note: NoteType | null) => {
        setEditNote(note)
    }, []);

    const loadingData = useCallback(async () => {
        if (isLogin) {
            setIsLoading(true);
            const data = await getNotes();
            data.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
            setNotes(data);
            setIsLoading(false);
            return data; 
        }
    }, [isLogin])

    useEffect(() => {
        loadingData();
    }, [loadingData]);


    useEffect(() => {
        const checkLoginUser = () => {
            const isToken = getCookie('userToken')
            setIsLogin(!!isToken);
        }
        checkLoginUser();
    }, [cookies]);

    const handleChangeNavbarOption = useCallback((navbarOption: NavbarOption) => {
        setNavbar(navbarOption)
    }, []);


    const shownNotes = useMemo(()=> {
        let FilteredNotes = notes;
        if (notes.length) {
            switch (navbar) {
                case NavbarOption.clearNotes:
                    FilteredNotes = notes.filter(note => !note.forDelete).filter(note => !note.completed);
                    break;
                case NavbarOption.notification:
                    FilteredNotes = notes
                        .filter(note => note.notification !== null)
                        .sort((a, b) => {
                            if (a.notification && b.notification) {
                                const x = Date.parse(a.notification.toString().slice(0, 10));
                                const y = Date.parse(b.notification.toString().slice(0, 10));
                                return x - y;
                            }
                            return -1;
                        });
                    break;
                case NavbarOption.archive:
                    FilteredNotes = notes.filter(note => note.completed);
                    break;
                case NavbarOption.forDelete:
                    FilteredNotes = notes.filter(note => note.forDelete);
                    break;
                default: FilteredNotes = notes.filter(note => !note.forDelete).filter(note => !note.completed);
            }
            if (search) {
                const lowerSearch = search.toLowerCase();
                FilteredNotes = FilteredNotes.filter(note => {
                    const {title, content} = note;
                    return title.toLowerCase().includes(lowerSearch) || content.toLowerCase().includes(lowerSearch)
                } )
            }
        }
        return FilteredNotes;
    }, [notes, navbar, search])

    return <NoteContext.Provider value={{
        notes,
        loadingData,
        isLogin,
        editNote,
        editionNote,
        shownNotes,
        search,
        setSearch,
        handleChangeNavbarOption,
        navbar,
        isLoading,
        cookies,
        setCookie, 
        removeCookie
    }}>{children}</NoteContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNoteContext = () => useContext(NoteContext);