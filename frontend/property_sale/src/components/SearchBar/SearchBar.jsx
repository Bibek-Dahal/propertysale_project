import React from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar({typeChangeHandler}) {

    const navigate = useNavigate();

    const query = useRef(null);

    function searchHandler(e){
        e.preventDefault();
        console.log(query.current.value);
        // navigate(`/search/${query.}`)
    }

    function onChangeHandler(e){
        console.log(e.target.value)
        typeChangeHandler(e.target.value)
    }

  return (
    <div className="search-bar-container">
        <form >
            <select name="type" id="" ref = {query} onChange = {onChangeHandler}>
                <option value="all">all--------------------------</option>
                <option value="house">house for sale</option>
                <option value="land">land for sale</option>
                <option value="house for rent">house for rent</option>
            </select>
            {/* <input type="text" name = "manualQuery" placeholder='type a keyword' /> */}
            {/* <input type="submit"  value = "search"/> */}
        </form>
    </div>
  )
}
