import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "./Components/Profile/Profile";


function App() {
    return (
      <>
          <div className="App">
              <Header/>
              <Main/>
              <Footer/>

          </div>
      </>



  );
}

export default App;
