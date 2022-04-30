import React,{useEffect, useState, useRef} from 'react'
// import {GoogleMap,useLoadScript,Marker} from '@react-google-maps/api';
import Map,{Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import getImage from '../../impLinks';
import { Link } from 'react-router-dom';
import axiosLinks from '../../axiosLinks';

export default function Maps({properties:coordinates,centerTo}) {
    const [isLoading,setIsLoading] = useState(0);
    const [cordinates,setCordinates] = useState([]);
    const [popUpInfo,setPopupInfo] = useState(null);
    const map = useRef(null);

    let [viewport,setViewPort] = useState({
        longitude: "",
        latitude: "",
        zoom: 14
    })  
    console.log('centerTo  = ',centerTo)
    function popupHandler(e){
        console.log(e);
    }

    useEffect(() => {
        
    },[])

    useEffect(() => {
        if(centerTo.lat){
            console.log('centering to')
            map.current.flyTo({center : [centerTo.lng,centerTo.lat],zoom : 19,essential: true})
        }
    })


    if(coordinates.length < 0) return '...loading'

    return (
        <>
            {
                coordinates?.length > 0 &&
                <Map
                    style={{width: '100%', height: '100%'}}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_KEY}
                    initialViewState={{
                        latitude:coordinates[0]?.latitude,
                        longitude:coordinates[0]?.longitude,
                        zoom:19,
                        pitch:69,
                        bearing:-60
                    }}
                    ref = {map}
                >
                {
                    coordinates?.length > 0 &&
                    coordinates?.map((coordinate,index) => {
                        return (
                            <Marker 
                                key = {index}
                                latitude = {coordinate?.latitude}
                                longitude = {coordinate?.longitude}
                                onClick = {(e) => {
                                    e.originalEvent.stopPropagation();
                                    setPopupInfo(coordinate);
                                }}
                            >
                            </Marker>
                        )
                    })
            }
                                 
            {
            popUpInfo &&
                <Popup
                    longitude={popUpInfo.longitude}
                    latitude={popUpInfo.latitude}
                    onClose={() => setPopupInfo(null)}
                    offset = {30}
                >
                    <img src={`${getImage}${popUpInfo?.main_image}`}  style = {{
                        width : "100%"
                    }}alt="" />
                    <span className='title'>
                        {popUpInfo?.title}
                    </span>
                    <span>
                        {popUpInfo?.district}
                    </span>
                    <Link to = {`/${popUpInfo.type}/${popUpInfo.id}`}>see detail</Link>
                </Popup>
            }
        </Map>
        }
        </>
    );
}
