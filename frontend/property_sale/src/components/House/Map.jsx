import React,{useEffect, useState} from 'react'
// import {GoogleMap,useLoadScript,Marker} from '@react-google-maps/api';
import Map,{Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'


export default function Maps({lat,lng}) {

    let [viewport,setViewPort] = useState({
        longitude: lng,
        latitude: lat,
        zoom: 14
    })

    console.log('inside map',lat,lng)

    return (
       <>
        {
            (lat && lng) &&
            <Map
                initialViewState={{
                    latitude:lat,
                    longitude:lng,
                    zoom: 15,
                    pitch:69,
                    bearing:-60
                }}
                style={{width: '100%', height: '100%'}}
                mapStyle="mapbox://styles/ash-ish/cl2dr2khz000715pjqat23url"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_KEY}
                
            >
                <Marker 
                    longitude={lng}
                    latitude = {lat}
                    anchor = "bottom"
                />
        </Map>
        }
       </>
    );
}
