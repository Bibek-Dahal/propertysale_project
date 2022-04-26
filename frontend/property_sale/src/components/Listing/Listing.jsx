import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState} from 'react'
import PropertyCard from '../PropertyCard/PropertyCard';
import './Listing.css';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import { useRef } from 'react';

export default function Listing({type,properties,isLoading}) {
    // const [n,setN] = useState(0)
    const container = useRef(null);
    let n = 1;
    function goLeft(){

    }

    function goRight(){
        console.log(n)
        console.log('going right',container.current.scrollWidth / properties.length)
        const scrollWidth = container.current.scrollWidth / properties.length;
        if(n * scrollWidth < scrollWidth){
            n++;
        }
    }


    if(isLoading) "loading....";
    
    return (
        <div
            className={`listing section-div ${type}`}
        >
            {
                console.log('properties = ',properties)
            }
            <div className="wrapper">
                <h2>{type}</h2>
                <div className="items" ref = {container}>
                    {
                        properties.map(property => {
                            if(property.listing_type === type){
                                return <PropertyCard key = {property.id} property={property}/>
                            }
                        })
                    }
                   
                </div>
               <div className='btns'>
                    <div className="btn next" onClick = {goRight}>
                        <FontAwesomeIcon icon = {solid('chevron-right')} />
                    </div>
                    <div className="btn prev" onClick = {goLeft}>
                        <FontAwesomeIcon icon = {solid('chevron-left')} />
                    </div>
               </div>
            </div>
        </div>
    )
}
