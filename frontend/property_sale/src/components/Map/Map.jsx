import React,{useEffect, useState, useRef} from 'react'
import Map from 'react-map-gl';
import './Map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import mapboxgl from 'mapbox-gl';
// import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
// import Geocoder from "react-map-gl-geocoder";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_KEY;

export default function Maps({onChangeHandler}) {
    const markers = []
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat,setLat] = useState(27.7008);
    const [lng,setLng] = useState(85.3002);
    const [zoom , setZoom] = useState(15);
    const [marker,setMarker] = useState([]);
    const [setting,setSetting] = useState(0);
    const [loading,setLoading] = useState(0);

    const getLocation = () => {
        return new Promise((resolve,reject) => {
            if(!navigator.geolocation) reject('no navigator found');
            navigator.geolocation.getCurrentPosition(position => {
                resolve({msg : 'navigator found',coords :position.coords})
            })
        })
    }


    const createMarker = ({lng,lat}) => {
        const marker1 = new mapboxgl.Marker()
            .setLngLat([lng, lat])
        if(markers.length !== 0){
            markers.pop().remove();
        }
        markers.push(marker1);
        markers[0].addTo(map.current);
    }


    useEffect(() => {
        console.log('inside map render');
        setLoading(1);
        if(map.current) return;
        map.current = new mapboxgl.Map({
            container : mapContainer.current,
            style : "mapbox://styles/mapbox/streets-v11",
            center : [lng,lat],
            zoom : zoom,
            pitch:69,
            bearing:-60
        })
        map.current.addControl(
            new MapboxGeocoder({
                accessToken:mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );
        map.current.on('click',(e) => {
            console.log('clicked',e)
            onChangeHandler(e.lngLat)
            createMarker(e.lngLat);
        })
        setLoading(0);

        // (
        //     async function(){
        //         try{
        //             const res = await getLocation();
        //             console.log(res);
        //             const {latitude,longitude} = res.coords;
        //             setLat(latitude);
        //             setLng(longitude);
        //             console.log('setting map',longitude,latitude)
        //             //settign map
        //             // console.log(mapContainer.current)
        //             map.current = new mapboxgl.Map({
        //                 container: mapContainer.current,
        //                 style: 'mapbox://styles/mapbox/streets-v11',
        //                 center: [longitude,latitude],
        //                 zoom: zoom,
        //                 pitch:69,
        //                 bearing:-60
        //             })
        //             map.current.addControl(
        //                 new MapboxGeocoder({
        //                     accessToken:accessToken,
        //                     mapboxgl: mapboxgl
        //                 })
        //                 );
        //                 setLoading(0)
        //             }catch(err){
        //             console.log(err);
        //             setLoading(0)
        //         }
        //     }
        //     )()
        return () => map?.current.remove();
      
    },[]);

    

    if(loading) return '...loading';

    return (
        <div className = "map-container-wrapper">
            <div className="map-container" ref = {mapContainer}>
            </div>
        </div>
    );
}
