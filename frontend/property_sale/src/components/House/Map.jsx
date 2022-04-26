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
        <Map
            initialViewState={{
                latitude:lat,
                longitude:lng,
                zoom: 15
            }}
            style={{width: '100%', height: '100%'}}
            mapStyle="mapbox://styles/ash-ish/cl2dr2khz000715pjqat23url"
            mapboxAccessToken="pk.eyJ1IjoiYXNoLWlzaCIsImEiOiJjbDIwczA3a2owZXI1M3BtdnhiNnoyc2c3In0.Rj0diRh6RpyK9eyv_Uqxsw"
        >
            <Marker 
                longitude={85.80609475906174}
                latitude = {26.51682302714633}
                anchor = "bottom"
            />
        </Map>
    );
}
