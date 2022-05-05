import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react'
import getImage from '../../impLinks';
import './PropertyCard.css';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({property,onClickHandlerForSearch}) {

    const navigate = useNavigate();

    const onClickHandler = (e) => {
        console.log('clicked',property)
            if(location.pathname.split('/')[1] !== 'search'){
                navigate(`/${property.type}/${property.id}`)
            }else{
                onClickHandlerForSearch({lat:property.latitude,lng:property.longitude})
            }
        }

    return (
        <div 
            className="card" 
            onClick = {onClickHandler}>
            <div className="card-image">
                <img src={`${getImage}${property.main_image}`} alt="" />
            </div>
            <div className="info">
                <div className="title">
                    {property.title}
                </div>
                <div className="location">
                    <FontAwesomeIcon icon = {solid('location-pin')}  />
                    {property.district}
                </div>
                <div className="price">
                    {property.price_in_number}
                </div>
                {
                    property.type === "house" &&
                    <div className="details-small">
                        <div className="beds">
                            <FontAwesomeIcon  icon={solid('bed')} />
                            {property.beds}
                        </div>
                        <div className="baths">
                            <FontAwesomeIcon icon = {solid('bath')} />
                            {property.bath}
                        </div>
                        <div className="kitchen">
                            <FontAwesomeIcon icon = {solid('kitchen-set')} />
                            {property.kitchen}
                        </div>
                    </div>
                }
                {
                    property.type === "land" &&
                    <div className="details-small">
                        <span className="area">{property.area}</span>
                        <div className="numbers">
                            <span className="ropani">{property.ropani}</span>-
                            <span className="aana">{property.aana}</span>-
                            <span className="paisa">{property.paisa}</span>-
                            <span className="daam">{property.daam}</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
