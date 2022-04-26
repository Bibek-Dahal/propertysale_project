import React,{useEffect, useState} from 'react'
// import {GoogleMap,useLoadScript,Marker} from '@react-google-maps/api';
import Map,{Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'


export default function Maps({onChangeHandler}) {

    let [viewport,setViewPort] = useState({
        longitude : 85.300140,
        latitude : 27.700769,
        zoom: 14
    })

    useEffect(() => {
        // function setPosition(position){
        //     console.log('position = ',position)
        //     setViewPort(prev => {
        //         return{
        //             ...prev,
        //             longitude : position?.coords.longitude,
        //             latitude : position?.coords.latitude
        //         }
        //     })
        // }
        // function getUserLocation(){
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(setPosition);
        //       } 
        // }
        // getUserLocation();
    },[])


    return (
        <>
                <Map
                    style={{width: '100%', height: '100%'}}
                    mapStyle="mapbox://styles/ash-ish/cl2dr2khz000715pjqat23url"
                    mapboxAccessToken="pk.eyJ1IjoiYXNoLWlzaCIsImEiOiJjbDIwczA3a2owZXI1M3BtdnhiNnoyc2c3In0.Rj0diRh6RpyK9eyv_Uqxsw"
                    onClick = {(e) => console.log('clicked')}
                    {...viewport}
                    onViewportChange = {viewport => setViewPort({viewport})}
                >
                    {/* {
                        // coordinates.length > 0 &&
                        coordinates.map((coordinate,index) => {
                            return (
                                <Marker 
                                    key = {index}
                                    latitude = {coordinate?.lat}
                                    longitude = {coordinate?.lng}
                                />
                            )
                        })
                    } */}
            </Map>
        </>
    );
}
