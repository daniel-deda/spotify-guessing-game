import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import MyInfo from './components/MyInfo/MyInfo';

function App() {

  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route index element={<Home/>} />
         <Route path="/about" element={<About/>} />
         <Route path="/my-info" element={<MyInfo/>} />
      </Routes>
    </BrowserRouter>
  );

  
}

export default App;
