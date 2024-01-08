import React from 'react'
import "./navbar.css"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <nav>
        <h1><span>Dict</span>.ai</h1>
        <ul>
          <li><Link style={{color: "#e9e9e9", fontSize:11}} to="/">Home</Link></li>
          <li><Link style={{color: "#e9e9e9", fontSize:11}} to="/memorise">Memorise</Link></li>
          <li><Link style={{color: "#e9e9e9", fontSize:11}} to="/story">Generate Story</Link></li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar