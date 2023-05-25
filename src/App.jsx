import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css';
import axios from 'axios';
import Product from './pages/Product';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import LoadingPage from './pages/LoadingPage';
import Detail from './pages/Detail';


function App() {


  return (
    <Navbar>
      <Routes>
        <Route path='/' element={<Product/>}></Route>
        <Route path='/detail/:id' element={<Detail/>}></Route>
      </Routes>
   </Navbar>

  )
}

export default App
