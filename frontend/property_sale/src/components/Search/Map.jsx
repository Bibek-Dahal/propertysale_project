import React,{useEffect, useState} from 'react'
// import {GoogleMap,useLoadScript,Marker} from '@react-google-maps/api';
import Map,{Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'


export default function Maps({coordinates}) {
    const [isLoading,setIsLoading] = useState(0);
    const [cordinates,setCordinates] = useState([]);

    let [viewport,setViewPort] = useState({
        longitude: "",
        latitude: "",
        zoom: 14
    })

    useEffect(() => {
        // setViewPort(prev => {
        //     return{
        //         ...prev,
        //         longitude : coordinates[0]?.lng,
        //         latutude : coordinates[0]?.lat
        //     }
        // })
        // console.log('inside useEffect')
        // setIsLoading(1);
        // if(coordinates.length > 0){
        //     console.log('full')
        //     setIsLoading(0)
        //     setCordinates(coordinates);
        // }
    },[])

    if(coordinates.length < 0) return '...loading'

    return (
        <>
            {
                coordinates.length > 0 &&
                <Map
                    style={{width: '100%', height: '100%'}}
                    mapStyle="mapbox://styles/ash-ish/cl2dr2khz000715pjqat23url"
                    mapboxAccessToken="pk.eyJ1IjoiYXNoLWlzaCIsImEiOiJjbDIwczA3a2owZXI1M3BtdnhiNnoyc2c3In0.Rj0diRh6RpyK9eyv_Uqxsw"
                    initialViewState={{
                        latitude:coordinates[2]?.lat,
                        longitude:coordinates[2]?.lng,
                        zoom:14
                    }}
                >
                {
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
            }
        </Map>
        }
        </>
    );
}
