// import { useCallback, useState } from "react";
// import { Board } from "./components/Board/Board"
// import { Header } from "./components/Header/Header"
// import { Navbar } from "./components/Navbar/Navbar"
// import './App.scss';
// import { Login } from './components/Authorization/Login/Login';
// import { useNoteContext } from "./context/Context";
// import { Rejestration } from "./components/Authorization/Rejestration/Rejestration";

// function App() {
//   const [expanded, setExpanded] = useState(false);
//   const [expandPermanent, setExpandPermanent] = useState(false);
//   const [isUser, setIsUser] = useState(true);

//   const toggleExpand = useCallback(() => {
//     setExpanded(!expanded);
//   }, [expanded]);

//   const {isLogin} = useNoteContext();

//   if (!isLogin && !isUser) {
//     return (
//       <>
//       <h2 className="title">Rejestarcja</h2>
//       <div className="registerModule">
//         <Rejestration />
//         <p className="registerModule__toLogin">Jeśli masz już konto
//           <span
//             onClick={() => setIsUser(true)}
//             className="registerModule__toLogin-click"
//           > przejdź do logowania</span>
//         </p>
//       </div>
//       </>
//     )
//   }


//   if (isLogin) {
//   return (
//     <>
//     <Header toggleExpand={toggleExpand} />
//       <div className="main">     
//         <Navbar
//           expanded={expanded}
//           expandPermanent={expandPermanent}
//           setExpanded={setExpandPermanent} 
//         />
//         <Board
//           expanded={expanded}
//           expandPermanent={expandPermanent}
//         />
//       </div>
//     </>

//   )
// }

//   return (
//     <>
//       <h2 className="title">Logowanie</h2>
//       <div className="loginModule">
//         <Login />
//         <p className="loginModule__toRegister">Jeśli nie masz jeszcze konta
//           <span
//             onClick={() => setIsUser(false)}
//             className="loginModule__toRegister-click"
//           > zarejestruj się</span>
//         </p>
//       </div>
//     </>
//   )
// }

// export default App

import {Routes, Route} from 'react-router-dom'
import { Home } from './components/Home/Home';
import { Login } from './components/Authorization/Login/Login';
import { Rejestration } from './components/Authorization/Rejestration/Rejestration';
import { NavbarOption } from './utils/Types';

const App = () => {


  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Rejestration/>}/>
      <Route path='/calendar' element={NavbarOption.notification} />
      <Route path='/archive' element={NavbarOption.archive} />
      <Route path='/bush' element={NavbarOption.forDelete} />
      <Route path='/*' element={<div>Page Not Found</div>}/>
    </Routes>
  )
}

export default App;