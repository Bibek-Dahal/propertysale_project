import React,{useEffect, useState, useRef} from 'react'
// import {GoogleMap,useLoadScript,Marker} from '@react-google-maps/api';
// import Map,{Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { Marker } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';

const accessToken = 'pk.eyJ1IjoiYXNoLWlzaCIsImEiOiJjbDIwczA3a2owZXI1M3BtdnhiNnoyc2c3In0.Rj0diRh6RpyK9eyv_Uqxsw';

mapboxgl.accessToken = accessToken


export default function Maps({onChangeHandler}) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat,setLat] = useState(27.7008);
    const [lng,setLng] = useState(85.3002);
    const [zoom , setZoom] = useState(15);
    const [marker,setMarker] = useState([]);
    const [setting,setSetting] = useState(0);
    // const [data,setData] = useState({
    //     lat:"",
    //     lng:""
    // })
    const [loading,setLoading] = useState(0);

    const getLocation = () => {
        return new Promise((resolve,reject) => {
            if(!navigator.geolocation) reject('no navigator found');
            navigator.geolocation.getCurrentPosition(position => {
                resolve({msg : 'navigator found',coords :position.coords})
            })
        })
    }

    const addMarker = (coords) => {
        // map.current.addMarker({

        // })
        const prevMarker = marker.pop();
        if(prevMarker) prevMarker.remove();

        const m = new mapboxgl.Marker({
            color: "red",
            draggable: true
        }).setLngLat([coords.lng, coords.lat])
          .addTo(map.current)
        marker.push(m);
        onChangeHandler(marker[0]._lngLat)
    }
    
    useEffect(() => {
        console.log('rendered')
        if(!map.current) return;
        map.current.on('click',(e) => {
            addMarker(e.lngLat);
        })
    })

    useEffect(() => {
        setLoading(1);
        (
            async function(){
                try{
                    const res = await getLocation();
                    console.log(res);
                    const {latitude,longitude} = res.coords;
                    setLat(latitude);
                    setLng(longitude);
                    // console.log('setting map',longitude,latitude)
                    //settign map
                    setLoading(0)
                    // console.log(mapContainer.current)
                    map.current = new mapboxgl.Map({
                        container: mapContainer.current,
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: [longitude,latitude],
                        zoom: zoom,
                        pitch:69,
                        bearing:-60
                    })
                    map.current.addControl(
                        new MapboxGeocoder({
                            accessToken:accessToken,
                            mapboxgl: mapboxgl
                        })
                    );
                }catch(err){
                    console.log(err);
                }
            }
            )()
            return () => map.current.remove();
    },[]);

    if(loading) return '...loading';

    return (
        <div className = "map-container-wrapper">
            {/* <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div> */}
            {/* {
                setting && 
                <div className="settingLoad">
                    <FontAwesomeIcon className = "fa-spin" icon = {solid('spinner')} />
                </div>
            } */}
            <div className="map-container" ref = {mapContainer}>
            </div>
        </div>
    );
}
