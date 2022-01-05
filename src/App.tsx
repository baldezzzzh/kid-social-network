import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";



function App() {
    console.log('app')
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
