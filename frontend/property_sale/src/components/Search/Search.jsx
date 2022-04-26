import React, { useEffect,useState } from 'react'
import { Nav } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import './Search.css';
import Map from './Map';
import PropertyCard from '../PropertyCard/PropertyCard';
import {properties} from './properties';

export default function Search() {
    
    const [coordinates,setCoordinates] = useState([]);

    function submitHandler(e){
        e.preventDefault();

    }


    useEffect(() => {
        function set(){
            properties.forEach(property => {
                setCoordinates(prev => {
                    return[
                        ...prev,
                        {
                            lat : property.latitude,
                            lng : property.longitude
                        }
                    ]
                })
            })
        }
        
        set();
    },[])


  return (
   <>
        <Nav />
        <div className="search ">
               <div className="search-container">
                    <form action="" onSubmit = {submitHandler}>
                        <input type="text" placeholder='Enter address, zip, title, type.....' />
                        <button>
                            <FontAwesomeIcon  icon = {solid('search')} />
                            search
                        </button>
                    </form>
                    <div className="map">
                        <Map coordinates = {coordinates}/>
                    </div>
               </div>
                
                <div className="result">
                    {
                        properties.map(property => {
                            return <PropertyCard key = {property.id} property = {property}/>
                        })
                    }
                    <div className = "result-footer">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque cum similique ratione ducimus dicta eum officia, esse ipsa dolor quo veniam laboriosam corporis facere deleniti culpa, nesciunt, modi soluta eveniet.
                    </div>
                </div>
        </div>
   </>
  )
}


