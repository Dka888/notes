import { useCallback, useState } from "react";
import { Board } from "./components/Board/Board"
import { Header } from "./components/Header/Header"
import { Navbar } from "./components/Navbar/Navbar"
import './App.scss';
import { Login } from './components/Authorization/Login/Login';
import { useNoteContext } from "./context/Context";
import { Rejestration } from "./components/Authorization/Rejestration/Rejestration";

function App() {
  const [expanded, setExpanded] = useState(false);
  const [isUser, setIsUser] = useState(true);

  const toggleExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const {isLogin} = useNoteContext();

  if (!isLogin && isUser) {
    return (
      <>
        <h2 className="title">Logowanie</h2>
        <div className="loginModule">
          <Login />
          <p className="loginModule__toRegister">Jeśli nie masz jeszcze konta
            <span
              onClick={() => setIsUser(false)}
              className="loginModule__toRegister-click"
            > zarejestruj się</span>
          </p>
        </div>
      </>
    )
  }

  if (!isLogin && !isUser) {
    return (
      <>
      <h2 className="title">Rejestarcja</h2>
      <div className="registerModule">
        <Rejestration />
        <p className="registerModule__toLogin">Jeśli masz już konto
          <span
            onClick={() => setIsUser(true)}
            className="registerModule__toLogin-click"
          > przejdź do logowania</span>
        </p>
      </div>
      </>
    )
  }

  return (
    <>
    <Header toggleExpand={toggleExpand} />
      <div className="main">     
        <Navbar expanded={expanded} />
        <Board />
      </div>
    </>

  )
}

export default App
