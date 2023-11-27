import { useState, useCallback } from "react";
import { Header } from "../Header/Header";
import { Board } from "../Board/Board";
import { Navbar } from "../Navbar/Navbar";
import { useNoteContext } from "../../context/Context";
import { Login } from "../Authorization/Login/Login";

export const Home = () => {
    const [expanded, setExpanded] = useState(false);
    const [expandPermanent, setExpandPermanent] = useState(false);

    const { isLogin } = useNoteContext();

    const toggleExpand = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);



    if (isLogin) { 
    return (
        <>
            <Header toggleExpand={toggleExpand} />
            <div style={{ display: 'flex', gap: '10px' }}>
                <Navbar
                    expanded={expanded}
                    expandPermanent={expandPermanent}
                    setExpanded={setExpandPermanent}
                />
                <Board
                    expanded={expanded}
                    expandPermanent={expandPermanent}
                />
            </div>
        </>
    )
    }

    if (!isLogin) {
        return <Login />
    }
}