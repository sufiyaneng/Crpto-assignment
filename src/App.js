import Home from './components/Home';
import View from './components/View'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/view' element= {<View/>}/>
    </Routes>
    </BrowserRouter>
  
</>
    );
}

export default App;
