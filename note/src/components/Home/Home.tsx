import { useState, useCallback } from "react";
import { Header } from "../Header/Header";
import { Board } from "../Board/Board";
import { Navbar } from "../Navbar/Navbar";
// import { useNoteContext } from "../../context/Context";
import { Login } from "../Authorization/Login/Login";
import { getCookie } from "../../API/api";


export const Home = () => {
    const [expanded, setExpanded] = useState(false);
    const [expandPermanent, setExpandPermanent] = useState(false);
    // const [showLogin, setShowLogin] = useState(true)

    // const { isLogin } = useNoteContext();

    const toggleExpand = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    const isToken = !(getCookie('userToken'));
       console.log(isToken, getCookie('userToken'))

    if (isToken) {
        return <Login />
    }


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
