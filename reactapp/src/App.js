import './App.css';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Posting from './components/Posting';
import MovieDetail from './components/movies';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
    const navigate = useNavigate();

  return (
    <>
      <button onClick={()=>{ navigate('/posting') }}>포스팅하러가기</button>
      <button onClick={()=>{ navigate('/movies/0') }}>영화정보</button>

      <Routes>
        <Route path="/" element={ <div>메인페이지임</div> } />
        <Route path="/movies" element={ <div>상세페이지임</div> } />
        <Route path="/movies/:id" element={ <MovieDetail /> } />
        <Route path="/posting" element={ <Posting /> } />
      </Routes>

      
      
    </>
  );
}

export default App;
