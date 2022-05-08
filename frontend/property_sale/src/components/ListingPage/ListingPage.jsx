import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Nav, SearchBar } from '..'
// import axiosInstance from '../utils/axiosInstance'
import axiosLinks from '../../axiosLinks';
import { useState } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import './ListingPage.css';
import { FullScreenLoading } from '../shared';
import useAxios from '../../Hooks/useAxios';

export default function ListingPage() {
    const axiosInstance = useAxios();
    const {listingType} = useParams();
    const [isLoading,setIsLoading] = useState(0);
    const [houses,setHouses] = useState([]);
    const [lands,setLands] = useState([]);
    const [filter,setFilter] = useState("all");

    const typeChangeHandler = (customType) => {
        setFilter(customType);
    }

    const getProperties = async (type,filter) => {
        console.log('getting properties',type,filter)
        let res,temp;
        try{
            setIsLoading(1);
            if(filter === "house" || 
                filter.toLowerCase().split(" ").join("") === "houseforrent"||
                filter === "all"
                ){
                // getting houses
                 res = await axiosInstance.get(`${axiosLinks.searchHouseByType}${type}`);
                console.log(res)
                temp = res.data;
                temp.forEach(t => t.type = "house");
                setHouses(temp);
            }else{
                setHouses([]);
            }
            if(filter === "land" || 
                filter === "all"){
                    //getting lands
                    res = await axiosInstance.get(`${axiosLinks.searchLandByType}${type}`);
                    console.log(res)
                    temp = res.data;
                    temp.forEach(t => t.type = "land");
                    setLands(temp);
                }else{
                    setLands([]);
                }
            
            setIsLoading(0);
        }catch(err){
            console.log(err)
            setHouses([]);
            setLands([])
            setIsLoading(0);
        }
    }

    useEffect(() => {
        console.log('rendered')
        getProperties(listingType,filter)
    },[listingType,filter])


    return (
        <>
            <Nav />
            <div className="listingPageContainer wrapper">
                <div className="listingTitle">
                    {listingType}
                </div>
            <SearchBar typeChangeHandler={typeChangeHandler}/>
           {
               isLoading ?
               <FullScreenLoading />:
               <div className="results-container">
                    {
                        houses.length > 0 &&
                        houses.map((house,index) => {
                            if(house.property_type.toLowerCase().split(" ").join("") === "houseforrent"){
                                if(filter.toLowerCase().split(" ").join("") === "houseforrent" || filter === "all")
                                    return <PropertyCard 
                                        key = {index}
                                        property = {house}
                                    />
                            }else{
                                <PropertyCard 
                                    key = {index}
                                    property = {house}
                                />
                            }
                        })
                    }
                    {
                        lands.length > 0 &&
                        lands.map((house,index) => {
                            return <PropertyCard 
                                    key = {index}
                                    property = {house}
                                />
                        })
                    }
                    
              </div>
           }
            </div>  
        </>
    )
}
