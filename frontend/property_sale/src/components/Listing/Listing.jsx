import React from 'react'
import PropertyCard from '../PropertyCard/PropertyCard';
import './Listing.css';

export default function Listing({type,properties}) {
  return (
    <div
        className={`listing section-div ${type}`}
    >
        <div className="wrapper">
            <h2>{type}</h2>
            <div className="items">
                {
                    properties.map(property => {
                        return <PropertyCard property={property}/>
                    })
                }
            </div>
        </div>
    </div>
  )
}
