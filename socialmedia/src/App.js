// import './App.css';
import Home from './components/home/Home';
import { Signup } from './components/signup/Signup';
import { Login } from './components/login/Login';
import { Profile } from './components/profile/Profile';
import { Messenger } from './components/messenger/Messenger';
import Feed from './smallcomponents/feed/Feed';
import Allusers from './smallcomponents/allusers/Allusers';
import Profilerightbar from './smallcomponents/profilerightbar/Profilerightbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
     <Route path='/' element={ <Signup/>}/>
     <Route path='/home' element={ <Home/>}/>
     <Route path='/login' element={ <Login/>}/>
     <Route path='/messenger' element={ <Messenger/>}/>
     <Route path='/profile/:Username' element={ <Profile/>}/>
     <Route path='/profilerightbar/:Username' element={ <Profilerightbar/>}/>
     <Route path='/feed' element={ <Feed/>}/>
     <Route path='/allusers' element={ <Allusers/>}/>
      
    
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
