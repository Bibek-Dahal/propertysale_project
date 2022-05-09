import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState,useEffect} from 'react'
import PropertyCard from '../PropertyCard/PropertyCard';
import './Listing.css';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import { useRef } from 'react';

export default function Listing({type,properties,isLoading}) {
    const carousel = useRef(null);
    const container = useRef(null);
    const prev = useRef(null);
    const next = useRef(null);

    const translateRow = (event) => {
        // const currentRow = container.current;
        // const scrollAmount = currentRow.scrollWidth / 4;
    
        // if (event.target.dataset.direction === "left") {
        //     console.log("goleft");
        //     currentRow.scrollTo({
        //         top: 0,
        //         left: currentRow.scrollLeft - scrollAmount,
        //         behavior: "smooth",
        //     });
        //     return;
        // }
        // console.log("go right");
        // currentRow.scrollTo({
        //     top: 0,
        //     left: currentRow.scrollLeft + scrollAmount,
        //     behavior: "smooth",
        // });
    };

    // useEffect(() => {
    //   setInterval(() => {
    //     next.current.click()
    //   },2000)
    
    //   return () => {
    //     second
    //   }
    // }, [])
    
  

    if(isLoading) "loading....";
    
    return (
        <div
            className={`listing section-div ${type}`}
        >
            <div className="wrapper" ref = {carousel}>
                <h2 className = "bold"  >{type}</h2>
                <div className="items" ref = {container}>
                    {
                        properties.map(property => {
                            if(property.listing_type.toLowerCase() === type.toLowerCase()){
                                return <PropertyCard key = {property.id} property={property}/>
                            }
                        })
                    }
                  
                </div>
               <div className='btns'>
                   <div ref = {prev} className="btn prev"data-direction = "left"  onClick = {translateRow}>
                        <FontAwesomeIcon icon = {solid('chevron-left')} />
                    </div>
                    <div ref = {next} className="btn next" data-direction = "right" onClick = {translateRow}>
                        <FontAwesomeIcon icon = {solid('chevron-right')} />
                    </div>
               </div>
            </div>
        </div>
    )
}
