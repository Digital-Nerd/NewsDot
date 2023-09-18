import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <>
      <Router>
        <Navbar/>        
        {/* <News pageSize='9'/> */}
        <Routes>
          <Route path='/' element={ <News key='general' pageSize='9'/> }/>
          <Route path='/technology' element={ <News key='technology' pageSize='9' category='technology'/> }/>
          <Route path='/science' element={ <News key='science' pageSize='9' category='science'/> }/>
          <Route path='/entertainment' element={ <News key='entertainment' pageSize='9' category='entertainment'/> }/>
          <Route path='/sports' element={ <News key='sports' pageSize='9' category='sports'/> }/>
        </Routes>
      </Router>
      </>
      
    )
  }
}
