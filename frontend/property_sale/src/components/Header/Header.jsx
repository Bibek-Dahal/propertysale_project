import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react'
import './header.css';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    const query = useRef(null);

    function submitHandler(e){
        e.preventDefault();
        console.log('submitted',query.current.value)
        navigate(`/search/${query.current.value.split(' ').join('-')}`)
    }

  return (
    <div className="header">
        <header className = "section-div wrapper">
        <div className="text ">
            <h1>
                Find Property and Get Your Dream Space
            </h1>
            <div className="search-box">
                <form action="" onSubmit={submitHandler}>
                   <input ref = {query} type="text" placeholder='Enter address, zip, title, type.....' />
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
    </div>
  )
}
