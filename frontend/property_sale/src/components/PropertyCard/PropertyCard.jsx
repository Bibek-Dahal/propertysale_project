import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react'
import getImage from '../../impLinks';
import './PropertyCard.css';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({property}) {

    const navigate = useNavigate();

    const onClickHandler = (e) => {
        console.log('clicked',property)
        navigate(`/${property.type}/${property.id}`)
    }

        
    return (
        <div className="card" onClick = {onClickHandler}>
            <div className="card-image">
                <img src={`${getImage}${property.main_image}`} alt="" />
            </div>
            <div className="info">
                <div className="location">
                    {property.district}
                </div>
                <div className="price">
                    {property.price_in_number}
                </div>
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
            </div>
        </div>
    )
}
