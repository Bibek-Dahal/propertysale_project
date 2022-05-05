import React, { useEffect,useState } from 'react'
import { Nav } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import './Search.css';
import Map from './Map';
import PropertyCard from '../PropertyCard/PropertyCard';
import {properties} from './properties';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import axiosLinks from '../../axiosLinks';

export default function Search({type}) {
    const [coordinates,setCoordinates] = useState([]);
    const [properties,setProperties] = useState([]);
    const navigate = useNavigate();
    const [search,setSearch] = useState('');
    let {query} = useParams();
    const [submitted,setSubmitted] = useState(0);
    const [centerTo,setCenter] = useState({});

    useEffect(() => {
        console.log('rendede');
        setSearch(type)
        setProperties(prev => []);
        (
            async function(){
                try{
                    let ps = [];
                    let res = await axiosInstance.get(`${axiosLinks.searchHouses}${ search !== "" ? search : query}`);
                    console.log(res);
                    const houses = res.data;
                    houses.forEach(h => h.type = "house");
                    ps = [...houses];
                    if(query != 'house-for-rent' && query != 'house-for-sale'){
                        res =  await axiosInstance.get(`${axiosLinks.searchLands}${query}`);
                        const lands = res.data;
                        lands.forEach(l => l.type = "land");
                        ps = [...ps,...lands];
                    }
                    let cods = [];
                    ps.forEach(p => {
                        cods.push({
                            lat : p.latitude,
                            lng : p.longitude
                        })
                    })
                    console.log(cods)
                    setCoordinates(cods);
                    setProperties(ps);
                }catch(err){
                    console.log(err);
                }
            }
        )()
    },[query,search,type])

    function submitHandler(e){
        e.preventDefault();
        console.log('submitted');
        navigate(`/search/${search.split(" ").join("-")}`)
    }

    function onClickHandlerForSearch(coord){
        setCenter(coord);
    }

  return (
   <>
        <Nav />
        <div className="search">
               <div className="search-container ">
                    <form  className = "wrapper" action="" onSubmit = {submitHandler}>
                        <input type="text" placeholder='Enter address, zip, title, type.....' onChange = {(e) => {setSearch(e.target.value.split(" ").join("-"))}}/>
                        <button>
                            <FontAwesomeIcon  icon = {solid('search')} />
                            search
                        </button>
                    </form>
                    <div className="map">
                        <Map  properties =  {properties} centerTo = {centerTo ? centerTo : {lat:properties[0].latitude,lng:properties[0].longitude} }/>
                    </div>
               </div>
               {
                   properties.length > 0 && 
                   <div className="result">
                       <h1>Search result for : {query}</h1>
                        {
                            properties.map(property => {
                                return <PropertyCard key = {property.id} property = {property} onClickHandlerForSearch = {onClickHandlerForSearch}/>
                            })
                        }
                        {/* <div className = "result-footer">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque cum similique ratione ducimus dicta eum officia, esse ipsa dolor quo veniam laboriosam corporis facere deleniti culpa, nesciunt, modi soluta eveniet.
                        </div> */}
                    </div>
               }
               {
                   properties.length === 0 &&
                   <div className="result">
                   <h1>Search result for : {query}</h1>
                   no properties found
                </div>
               }
        </div>
   </>
  )
}


