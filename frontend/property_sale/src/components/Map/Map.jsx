import React,{useEffect, useState} from 'react'
import {GoogleMap,useLoadScript,Marker} from '@react-google-maps/api';

export default function Maps({onChangeHandler}) {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey : "AIzaSyC0MrUO8r7XZK22qia61z_HXOCMn0McI3M"
    })
    const [location,setLocation] = useState()

    function clickHandler(e){
        console.log(e)
        const tempLocation = {
            lat : e.latLng.lat(),
            lng : e.latLng.lng()
        }
        setLocation(prev => {
            return tempLocation
        })
        onChangeHandler(tempLocation)
    }

    const successCallback = (position) => {
        const {latitude:lat,longitude:lng} = position.coords;
        setLocation(prev => {
            return{
                lat:lat,
                lng:lng
            }
        })
    }

    const failureCallback = () => {
        console.log('error')
    }

    useEffect(() => {
        if(navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(successCallback,failureCallback);
        }
    },[])


    if(!isLoaded) return "...Loading"
    return(
        <>
            {/* <h1>Map</h1> */}
            <GoogleMap 
                zoom = {10}
                center = {{lat:	27.700769,lng:85.300140}}
                mapContainerClassName = "map-container"
                onClick={clickHandler}
                
            >
                {
                    location &&
                    <Marker 
                        position = {location}
                    />

                }

            </GoogleMap>
        </>
    ) 

}
