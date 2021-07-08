import React from "react";
import "./styles.css";
import Header from './components/Header'

export default function App() {
  return (
    <div className="App">
      <div className="head">Levi<span style={{color: '#18d419'}}>Site</span></div>
      <Header />
    </div>
  );
}
