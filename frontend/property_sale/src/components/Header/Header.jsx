import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import './header.css';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function Header() {
  return (
    <header className = "section-div">
       
        <div className="text">
            <h1>
                Find Property and Get Your Dream Space
            </h1>
            <div className="search-box">
                <form action="">
                   <input type="text" placeholder='Enter address, zip, title, type.....' />
                    <button>
                        <FontAwesomeIcon  icon = {solid('search')} />
                        search
                    </button>
                </form>
            </div>  
        </div>
        <div className="image">
           <div className="map">
                <img src={require('./mapBg.png')} alt="" />    
            </div>
        </div>
        
    </header>
  )
}
