import React, {useEffect} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./redux-store/store";
import Preloader from "./Components/Preloader/Preloader";
import {setMyAuthData} from "./redux-store/auth-reducer";



function App() {

    const isAppInitialized = useSelector<RootReducerType, boolean>(state => state.appPage.isInitialized)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setMyAuthData())
    }, [dispatch])

    return (
      <>
          {!isAppInitialized ? <Preloader/> :
          <div className="App">
              <Header/>
              <Main/>
              <Footer/>

          </div>}
      </>
  );
}

export default App;
