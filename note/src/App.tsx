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
      <Route path='/edition' element={NavbarOption.edition} />
      <Route path='/archive' element={NavbarOption.archive} />
      <Route path='/bush' element={NavbarOption.forDelete} />
      <Route path='/*' element={<div>Page Not Found</div>}/>
    </Routes>
  )
}

export default App;