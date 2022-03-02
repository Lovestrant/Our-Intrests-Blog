import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Components/Signin';
import Home from './Components/Home';
//import Signup from './Components/Signup';
import Reset from './Components/Reset';
import Reg from './Components/Reg';
// import UseState from './Hooks/UseState';
// import UseReducer from './Hooks/UseReducer';
// import UseEffect from './Hooks/UseEffect';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Signin />}></Route>
          <Route path="/Reg" element = {<Reg />}></Route>
          <Route path="/Reset" element = {<Reset />}></Route>
          <Route path="/Home" element={<Home />}></Route>
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
