import { useState } from "react";
import { Board } from "./components/Board/Board"
import { Header } from "./components/Header/Header"
import { Navbar } from "./components/Navbar/Navbar"
import './App.scss';

function App() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
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
