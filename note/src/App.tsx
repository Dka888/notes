import { useState } from "react";
import { Board } from "./components/Board/Board"
import { Header } from "./components/Header/Header"
import { Navbar } from "./components/Navbar/Navbar"
import './App.scss';
import { Login } from './components/Authorization/Login/Login';
import { checkLoginUser } from "./utils/utils";

function App() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (!checkLoginUser) {
    return (
      <Login />
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
