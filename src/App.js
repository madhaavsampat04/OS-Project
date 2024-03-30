import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import FirstCome from './FirstCome';
import PreamptivePriority from './PreamptivePriority';
import ReaderWriter from './ReaderWriter';
import LeastRecently from './LeastRecently';




function App() {
  return (
<div className="App">
<BrowserRouter>
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="fcfs" element={<FirstCome/>}/>
    <Route path="lru" element={<LeastRecently/>}/>
    <Route path="reader" element={<ReaderWriter/>}/>
    <Route path="preamptive" element={<PreamptivePriority/>}/>

</Routes>
</BrowserRouter>
</div> 
  ); 
}

export default App;

